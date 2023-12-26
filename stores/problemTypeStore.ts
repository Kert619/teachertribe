import type { ProblemType } from "@/types/problemType";

export const useProblemTypeStore = defineStore("problemType", () => {
  const getProblemTypesByExamTypeId = async (id: number) => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<ProblemType[]>(
      `/problem-types/${id}/get-all-by-exam-type-id`,
      {
        getCachedData: (key) =>
          nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
        transform: (data: any) => {
          return data.data as ProblemType[];
        },
      }
    );

    return result;
  };

  return { getProblemTypesByExamTypeId };
});
