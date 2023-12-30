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

  const createGroup = async (groupName: string) => {
    const result = await useAPI<Group>("/groups", {
      method: "post",
      body: { group_name: groupName },
      transform: (data: any) => {
        return data.data as Group;
      },
    });

    if (result.data.value) groups.value.push(result.data.value);

    return result;
  };

  const deleteGroup = async (id: number) => {
    const result = await useAPI(`/groups/${id}`, {
      method: "delete",
    });

    if (!result.error.value)
      groups.value = groups.value.filter((x) => x.id !== id);

    return result;
  };

  return { groups, getGroups, createGroup, deleteGroup };
});
