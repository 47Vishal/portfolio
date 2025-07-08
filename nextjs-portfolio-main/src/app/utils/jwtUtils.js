// utils/jwtUtils.js

export const isTokenExpired = (token) => {
  try {
    if (!token || typeof token !== "string") return true;

    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    if (!payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Treat as expired on error
  }
};
