import type { ExamType } from "@/types/ExamType";

export const useExamTypeStore = defineStore("examTypeStore", () => {
  const examTypes = ref<ExamType[]>([]);

  const getExamTypes = async () => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<ExamType[]>("/exam-types", {
      getCachedData: (key) =>
        nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
      transform: (data: any) => {
        return data.data as ExamType[];
      },
    });

    if (result.data.value) examTypes.value = result.data.value;

    return result;
  };

  return { examTypes, getExamTypes };
});
