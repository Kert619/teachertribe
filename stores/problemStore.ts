import type { Problem, CreateProblemPayload } from "@/types/problem";

export const useProblemStore = defineStore("problems", () => {
  const problems = ref<Problem[]>([]);

  const getProblems = async () => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<Problem[]>("/problems", {
      getCachedData: (key) =>
        nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
      transform: (data: any) => {
        return data.data as Problem[];
      },
    });

    if (result.data.value) problems.value = result.data.value;

    return result;
  };

  const getProblemsByProblemTypeId = async (id: string) => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<Problem[]>(
      `/problems/${id}/get-all-by-problem-type-id`,
      {
        getCachedData: (key) =>
          nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
        transform: (data: any) => {
          return data.data as Problem[];
        },
      }
    );

    return result;
  };

  const createProblem = async (payload: CreateProblemPayload) => {
    const result = await useAPI<Problem>("/problems", {
      method: "post",
      body: payload,
      transform: (data: any) => {
        return data.data as Problem;
      },
    });

    if (result.data.value) problems.value.push(result.data.value);

    return result;
  };

  const removeProblem = async (id: number) => {
    const result = await useAPI(`/problems/${id}`, {
      method: "delete",
    });

    if (!result.error.value) {
      const index = problems.value.findIndex((x) => x.id === id);
      problems.value.splice(index, 1);
    }

    return result;
  };

  return {
    problems,
    getProblems,
    getProblemsByProblemTypeId,
    createProblem,
    removeProblem,
  };
});
