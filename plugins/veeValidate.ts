import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VeeForm", Form);
  nuxtApp.vueApp.component("VeeField", Field);
  nuxtApp.vueApp.component("VeeFieldArray", FieldArray);
  nuxtApp.vueApp.component("VeeErrorMessage", ErrorMessage);
});
