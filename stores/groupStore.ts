import type { Group } from "@/types/group";

export const useGroupStore = defineStore("group", () => {
  const groups = ref<Group[]>([]);

  const getGroups = async () => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<Group[]>("/groups", {
      getCachedData: (key) =>
        nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
      transform: (data: any) => {
        return data.data as Group[];
      },
    });

    if (result.data.value) groups.value = result.data.value;

    return result;
  };

  return { groups, getGroups };
});
