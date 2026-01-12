// export const oidcConfig = {
//   authority: "https://localhost:5001",
//   client_id: "webapp-client",
//   client_secret: "webapp-secret",
//   redirect_uri: "http://localhost:5173/",
//   post_logout_redirect_uri: "http://localhost:5173/",
//   response_type: "code",
//   scope: "openid profile roles soratabi.api",
//   automaticSilentRenew: true,
//   loadUserInfo: true,
// };

export const oidcConfig = {
  authority:
    "https://soratabi-identity-jordy-ayheagfxahhpauaa.westus3-01.azurewebsites.net",
  client_id: "webapp-client",
  // Remove client_secret - SPAs are public clients and shouldn't use secrets
  redirect_uri: "https://soratabi.vercel.app", // Your deployed frontend URL
  post_logout_redirect_uri: "https://soratabi.vercel.app",
  response_type: "code",
  scope: "openid profile roles soratabi.api",
  automaticSilentRenew: true,
  loadUserInfo: true,
};
