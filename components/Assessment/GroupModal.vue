<template>
  <Teleport to="body">
    <ModalDialog @closed="closeModal">
      <div class="flex flex-col gap-3">
        <h3>Groups</h3>
        <hr />

        <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Group Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(group, idx) in groups" :key="group.id">
                <th>{{ idx + 1 }}</th>
                <td>{{ group.group_name }}</td>
                <td>
                  <div class="flex flex-nowrap gap-3">
                    <button
                      class="btn btn-sm"
                      @click="handleSelect(group.id, group.group_name)"
                    >
                      Select
                    </button>
                    <button class="btn btn-sm" @click="handleDelete(group.id)">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ groups.length + 1 }}</th>
                <td colspan="2">
                  <VeeForm
                    :validation-schema="schema"
                    @submit="submitForm"
                    class="flex gap-3"
                  >
                    <VTextInput
                      name="group_name"
                      size="input-sm"
                      placeholder="Enter group name"
                    />
                    <button class="btn btn-sm btn-primary" :disabled="loading">
                      <span
                        v-if="loading"
                        class="loading loading-spinner"
                      ></span>
                      Add Group
                    </button>
                  </VeeForm>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModalDialog>
  </Teleport>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { Group } from "@/types/group";

defineProps<{
  groups: Group[];
}>();

const emits = defineEmits<{
  closed: [];
  selected: [groupId: number, groupName: string];
  deleted: [id: number];
}>();

const closeModal = () => {
  emits("closed");
};

let modal: any;

onMounted(() => {
  modal = document.querySelector("#modal");
  modal.showModal();
});

const groupStore = useGroupStore();
const loading = ref(false);

const handleSelect = (groupId: number, groupName: string) => {
  emits("selected", groupId, groupName);
  modal.close();
};

const handleDelete = async (id: number) => {
  await groupStore.deleteGroup(id);
  emits("deleted", id);
};

const schema = yup.object({
  group_name: yup
    .string()
    .required()
    .test("check-duplicate-group", "Group already exist", (value) => {
      return !groupStore.groups.find((x) => x.group_name === value);
    })
    .label("Group name"),
});

const submitForm = async (values: any, { resetForm }: any) => {
  loading.value = true;
  const { data } = await groupStore.createGroup(values.group_name as string);
  loading.value = false;
  if (data.value) {
    resetForm();
  }
};
</script>
