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
                    <button class="btn btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ groups.length + 1 }}</th>
                <td>
                  <VTextInput
                    name="group_name"
                    size="input-sm"
                    placeholder="Enter group name"
                  />
                </td>
                <td>
                  <button class="btn btn-sm btn-block btn-primary">
                    Add Group
                  </button>
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
import type { Group } from "@/types/group";

defineProps<{
  groups: Group[];
}>();

const emits = defineEmits<{
  closed: [];
  selected: [groupId: number, groupName: string];
}>();

const closeModal = () => {
  emits("closed");
};

let modal: any;

onMounted(() => {
  modal = document.querySelector("#modal");
  modal.showModal();
});

const handleSelect = (groupId: number, groupName: string) => {
  emits("selected", groupId, groupName);
  modal.close();
};
</script>
