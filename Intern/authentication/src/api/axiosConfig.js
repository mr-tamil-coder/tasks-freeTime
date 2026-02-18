import axios from "axios";
import { tokenService } from "../services/token.service";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    console.log("Token",JSON.parse(atob(token.split('.')[1])));
    
    const payload = JSON.parse(atob(token.split('.')[1]));

    
    return Date.now() >= payload.exp * 1000 - 5000;
  } catch {
    return true;
  }
};

let refreshing = null;

const refreshAccessToken = async () => {
  if (refreshing) return refreshing;

  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  console.log("🔄 Refreshing token...");

  refreshing = axios.post(
    "https://dummyjson.com/auth/refresh",
    { refreshToken, expiresInMins: 1 },
    { headers: { "Content-Type": "application/json" } }
  ).then(({ data }) => {
    tokenService.setTokens(data);
    console.log("✅ Token refreshed successfully");
    refreshing = null;
    return data.accessToken;
  }).catch((err) => {
    console.error("❌ Token refresh failed:", err);
    refreshing = null;
    tokenService.clearTokens();
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    throw err;
  });

  return refreshing;
};

// Check token expiry BEFORE every request
api.interceptors.request.use(async (config) => {
  let token = tokenService.getAccessToken();
  
  if (token && isTokenExpired(token)) {
    console.log("⚠️ Token expired - refreshing before request...");
    try {
      token = await refreshAccessToken();
    } catch {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 - refresh token and retry (fallback)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("⚠️ Got 401 - attempting token refresh...");

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
