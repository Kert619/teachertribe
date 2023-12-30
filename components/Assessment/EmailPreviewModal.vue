<template>
  <Teleport to="body">
    <ModalDialog @closed="closeModal">
      <div class="flex flex-col gap-3">
        <h3>Email Preview</h3>
        <hr />
        <p>
          Subject: <span class="font-bold">{{ subject }}</span>
        </p>
        <p>Reply to: <span class="font-bold">admin@coders.tribe.net</span></p>

        <div class="border p-5 space-y-3">
          <p>Good day, <span class="text-red-500">[candidatename]</span>!</p>

          <p>
            You have been invited to take the
            <strong>{{ assessmentTitle }}</strong
            >.
          </p>

          <p>
            To begin the test, please copy the following URL, open it in a
            browser, and enter the given test pin on the page.
          </p>

          <p>
            <span>URL: </span>
            <a
              class="underline text-blue-600"
              href="https://teachertribe.fly.dev/test"
              target="_blank"
              >https://teachertribe.fly.dev/test</a
            >
            <br />
            <span>Test PIN: </span>
            <span class="text-blue-600">&lt;System Generated PIN&gt;</span>
          </p>

          <p>
            The above Test PIN will be valid only after the
            <span class="text-red-500"
              >[start date and time setup in the schedule]</span
            >
            until the
            <span class="text-red-500"
              >[end date and time setup in the schedule]</span
            >.
          </p>

          <p>
            All instructions regarding test coverage, duration, and format will
            be available at the start of the test.
          </p>

          <p>
            <span>Happy Coding!</span>
            <br />
            <span>- Teacher Tribe</span>
          </p>
        </div>
        <p class="text-red-500">
          Make sure to review your data before clicking INVITE.
        </p>
        <button class="btn btn-primary" @click="handleInvited">Invite</button>
      </div>
    </ModalDialog>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  subject: string;
  assessmentTitle: string;
}>();

const emits = defineEmits<{
  closed: [];
  invited: [];
}>();

const closeModal = () => {
  emits("closed");
};

let modal: any;

onMounted(() => {
  modal = document.querySelector("#modal");
  modal.showModal();
});

const handleInvited = () => {
  emits("invited");
  modal.close();
};
</script>
