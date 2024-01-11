import type { User, LoginCredentials, UpdateUserPayload } from "@/types/user";
import type { AssessmentExaminee } from "@/types/assessmentExaminee";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie("__token__", { maxAge: 60 * 60 * 24 * 7 });
  const pin = useCookie("__pin__", { maxAge: 60 * 60 * 24 * 7 });
  const user = ref<User | null>(null);
  const assessmentExaminee = ref<AssessmentExaminee | null>(null);

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

  const verifyPin = async (_pin: string) => {
    const result = await useAPI<AssessmentExaminee>("/verify-pin", {
      method: "post",
      body: { pin: _pin },
      transform: (data: any) => {
        return data.data as AssessmentExaminee;
      },
    });

    if (result.data.value) {
      assessmentExaminee.value = result.data.value;
      pin.value = _pin;
    } else {
      pin.value = null;
    }

    return result;
  };

  const fetchPin = async (_pin: string) => {
    const result = await useAPI<AssessmentExaminee>("/fetch-pin", {
      query: { pin: _pin },
      transform: (data: any) => {
        return data.data as AssessmentExaminee;
      },
    });

    if (result.data.value) {
      assessmentExaminee.value = result.data.value;
      pin.value = _pin;
    } else {
      pin.value = null;
    }

    return result;
  };

  const updateUser = async (id: number, payload: UpdateUserPayload) => {
    const result = await useAPI<User>(`/update-user/${id}`, {
      method: "put",
      body: payload,
      transform: (data: any) => {
        return data.data as User;
      },
    });

    if (result.data.value) user.value = result.data.value;

    return result;
  };

  return {
    token,
    user,
    fetchUser,
    login,
    reset,
    logout,
    verifyPin,
    fetchPin,
    pin,
    assessmentExaminee,
    updateUser,
  };
});
