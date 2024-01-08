import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";
// import { configure } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VeeForm", Form);
  nuxtApp.vueApp.component("VeeField", Field);
  nuxtApp.vueApp.component("VeeFieldArray", FieldArray);
  nuxtApp.vueApp.component("VeeErrorMessage", ErrorMessage);

  // configure({
  //   validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  //   validateOnChange: false, // controls if `change` events should trigger validation with `handleChange` handler
  //   validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  //   validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  // });
});
