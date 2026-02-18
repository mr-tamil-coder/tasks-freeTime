const tokenService = {
  getAccessToken: () => sessionStorage.getItem("authToken"),
  getRefreshToken: () => sessionStorage.getItem("refreshToken"),

  setTokens: (data) => {
    if (data.accessToken) sessionStorage.setItem("authToken", data.accessToken);
    if (data.refreshToken) sessionStorage.setItem("refreshToken", data.refreshToken);
  },

  clearTokens: () => sessionStorage.clear(),
};

export { tokenService };
