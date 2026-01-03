export const oidcConfig = {
  authority: "https://localhost:5001",
  client_id: "webapp-client",
  client_secret: "webapp-secret",
  redirect_uri: "http://localhost:5173/",
  post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "openid profile roles soratabi.api",
  automaticSilentRenew: true,
  loadUserInfo: true,
};
