# 🔐 Token Refresh Implementation Guide

## ❌ The Problem You Had

**Why wasn't the token expiring?**

Even though you set `expiresInMins: 1`, DummyJSON API **does NOT validate token expiry** on most endpoints. The server only checks if the token format is valid, not if it's expired.

```javascript
// This creates a token that expires in 1 minute
expiresInMins: 1

// BUT... DummyJSON doesn't reject expired tokens! 
// So your interceptor never triggered because there was no 401 error
```

## ✅ The Solution: Client-Side Expiry Check

Since the server won't reject expired tokens, we check expiry **before making requests**.

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  1. User makes API request                                  │
│     ↓                                                        │
│  2. Request Interceptor checks token expiry (CLIENT-SIDE)   │
│     ↓                                                        │
│  3. If expired → Call /auth/refresh to get new token        │
│     ↓                                                        │
│  4. Update sessionStorage with new token                    │
│     ↓                                                        │
│  5. Continue with original request using new token          │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Implementation Details

### 1. Token Expiry Check Function

```javascript
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const bufferTime = 5000; // 5 seconds buffer
    return now >= (expiryTime - bufferTime);
  } catch {
    return true;
  }
};
```

**Why 5-second buffer?** To refresh the token slightly before it expires, preventing race conditions.

### 2. Refresh Token Function

```javascript
let isRefreshing = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  // Prevent multiple simultaneous refresh calls
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (!refreshToken) {
    isRefreshing = false;
    throw new Error("No refresh token");
  }

  refreshPromise = axios.post("https://dummyjson.com/auth/refresh", {
    refreshToken,
    expiresInMins: 1,
  }).then(({ data }) => {
    sessionStorage.setItem("authToken", data.accessToken);
    if (data.refreshToken) {
      sessionStorage.setItem("refreshToken", data.refreshToken);
    }
    console.log("✅ Token refreshed proactively");
    isRefreshing = false;
    refreshPromise = null;
    return data.accessToken;
  }).catch((error) => {
    isRefreshing = false;
    refreshPromise = null;
    sessionStorage.clear();
    window.location.href = '/login';
    throw error;
  });

  return refreshPromise;
};
```

**Key features:**
- Prevents multiple simultaneous refresh calls
- Uses plain `axios` (not `axiosInstance`) to avoid recursive interceptor calls
- Clears session and redirects to login on failure

### 3. Request Interceptor

```javascript
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem("authToken");
    
    // Check if token is expired BEFORE making request
    if (token && isTokenExpired(token)) {
      console.log("⚠️ Token expired - refreshing before request...");
      try {
        token = await refreshAccessToken();
      } catch (error) {
        return Promise.reject(error);
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 4. Response Interceptor (Backup)

The response interceptor remains as a **fallback** for 401 errors:

```javascript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // ... refresh logic
    }

    return Promise.reject(error);
  }
);
```

## 🧪 Testing the Implementation

### Step 1: Login
```
Username: emilys
Password: emilyspass
```

### Step 2: Watch the Timer
The TokenTest component shows a real-time countdown of token expiry.

### Step 3: Wait for Expiry
When the timer hits 0, the token is expired.

### Step 4: Make an API Call
- Click "Test API Call" button
- Or search for products
- Or navigate to any protected route

### Step 5: Check Console
You should see:
```
⚠️ Token expired - refreshing before request...
✅ Token refreshed proactively
```

### Step 6: Check Network Tab
You'll see:
1. `/auth/refresh` - 200 OK (getting new token)
2. `/auth/me` or `/products` - 200 OK (using new token)

## 🎯 Key Differences from Your Original Code

| Original | New Implementation |
|----------|-------------------|
| Only checked expiry on 401 errors | Checks expiry BEFORE every request |
| Relied on server to reject expired tokens | Client-side expiry validation |
| DummyJSON doesn't reject expired tokens | Works regardless of server behavior |
| Token never "expired" in practice | Token refresh triggers reliably |

## 📝 Best Practices Implemented

1. **Proactive Refresh**: Check expiry before requests, not after failures
2. **Race Condition Prevention**: Single refresh promise for concurrent requests
3. **Buffer Time**: Refresh 5 seconds before actual expiry
4. **Fallback**: Response interceptor handles unexpected 401s
5. **Clean Logout**: Clear all tokens and redirect on refresh failure
6. **Avoid Recursion**: Use plain `axios` for refresh calls

## 🚀 Production Considerations

For a real production app, consider:

1. **Store refresh token in httpOnly cookie** (more secure than sessionStorage)
2. **Implement token rotation** (new refresh token with each refresh)
3. **Add retry logic** with exponential backoff
4. **Handle refresh token expiry** gracefully
5. **Use a token refresh queue** for multiple simultaneous requests
6. **Add logging/monitoring** for token refresh failures

## 🔗 Related Files

- `src/api/axiosConfig.js` - Main interceptor logic
- `src/components/TokenTest.jsx` - Visual testing component
- `src/services/authService.js` - Token storage utilities
- `src/context/AuthContext.jsx` - Authentication context

## 💡 Why This Approach?

Since DummyJSON is a mock API that doesn't enforce token expiry, we simulate real-world behavior by:
- Decoding JWT to read expiry time
- Checking expiry client-side
- Refreshing proactively

In a real API, the server would reject expired tokens with 401, and the response interceptor would handle it. But for learning purposes, this client-side approach demonstrates the complete flow.
