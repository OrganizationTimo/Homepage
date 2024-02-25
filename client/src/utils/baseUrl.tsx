export const apiBaseUrl =
  import.meta.env.VITE_ENV == "development"
    ? "http://localhost:3000"
    : "https://api.timowenz.com";
