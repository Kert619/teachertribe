import type {
  CreateParticipantPayload,
  Participant,
} from "@/types/participant";
export const useParticipantStore = defineStore("participant", () => {
  const participants = ref<Participant[]>([]);

  const getParticipants = async () => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<Participant[]>("/participants", {
      getCachedData: (key) =>
        nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
    });

    if (result.data.value) participants.value = result.data.value;

    return result;
  };

  const createParticipant = async (payload: CreateParticipantPayload) => {
    const result = await useAPI("/participants", {
      method: "post",
      body: payload,
    });

    return result;
  };

  return { participants, getParticipants, createParticipant };
});
