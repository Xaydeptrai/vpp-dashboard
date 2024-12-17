import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để gắn token vào header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi từ response
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.code;

    if (status === "ERR_NETWORK") {
      console.error(
        "Unauthorized. Clearing localStorage and redirecting to login."
      );
      // Xóa localStorage
      localStorage.clear();

      // Chuyển hướng về trang login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } else if (status === 400) {
      console.error("Bad Request:", error.response.data);
    }

    return Promise.reject(error);
  }
);
