import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(request: string, options: UseFetchOptions<T> = {}) {
  const authStore = useAuthStore();
  const token = authStore.token;

  const headers: {
    Accept: string;
    Authorization?: string;
  } = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchOptions: UseFetchOptions<T> = {
    baseURL: "https://teachertribe-api.fly.dev/api",
    method: "get",
    watch: false,
    timeout: 1800000,
    ...options,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.reset();
      }
    },
  };

  if (fetchOptions.method?.toString().toLowerCase() === "get") {
    fetchOptions.key = request;
  }

  return useFetch(request, fetchOptions);
}
