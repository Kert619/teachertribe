import type { User, LoginCredentials } from "../types/user";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie("__token__", { maxAge: 60 * 60 * 24 * 7 });
  const user = ref<User | null>(null);

  const fetchUser = async () => {
    const { data } = await useAPI<User>("/user", {
      transform: (data: any) => {
        return {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
        };
      },
    });

    if (data.value) user.value = data.value;
  };

  const login = async (credentials: LoginCredentials) => {
    const login = await useAPI<{ token: string }>("/login", {
      method: "post",
      body: credentials,
      transform: (data: any) => {
        return { token: data.data.token as string };
      },
    });

    if (login.data.value) {
      token.value = login.data.value.token;
      await fetchUser();
    }

    return login;
  };

  const logout = async () => {
    await useAPI("/logout", {
      method: "post",
    });

    reset();
  };

  const reset = () => {
    token.value = null;
    if (process.client) window.location.reload();
  };

  return { token, user, fetchUser, login, reset, logout };
});
