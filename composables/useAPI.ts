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

  return useFetch(request, {
    baseURL: "http://127.0.0.1:8000/api",
    method: "get",
    key: request,
    watch: false,
    ...options,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.reset();
      }
    },
  });
}
