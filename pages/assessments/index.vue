<template>
  <PageContent title="Dashboard">
    <div class="flex justify-between items-center">
      <NuxtLink to="/assessments/create" class="underline"
        >Add New Assessment</NuxtLink
      >
      <div class="space-x-3">
        <span>Sort by:</span>
        <select class="select select-bordered select-sm">
          <option selected>Assessment Name</option>
          <option>Pending</option>
          <option>On-Going</option>
          <option>Done</option>
        </select>
      </div>
    </div>

    <hr class="mt-3" />
    <ErrorStatus v-if="error" />
    <template
      v-else-if="
        assessmentStore.assessments &&
        assessmentStore.assessments.data.length > 0
      "
    >
      <AssessmentList
        :assessments="assessmentStore.assessments"
        @item-deleted="handleItemDeleted"
      />

      <div class="flex items-center gap-3">
        <Pagination
          :page-meta="assessmentStore.assessments.meta"
          @page-changed="handlePageChanged"
        />
        <Loading v-if="pageLoading" />
      </div>
    </template>

    <h4 class="mt-3" v-else>No assessment found...</h4>
    <FullscreenLoading v-if="deleteLoading" />
  </PageContent>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";

useHead({
  title: "Teacher Tribe - Assessments",
});

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const assessmentStore = useAssessmentStore();
const { error } = await assessmentStore.getAssessments(page);

const pageLoading = ref(false);
const deleteLoading = ref(false);

const handlePageChanged = async (page: number) => {
  pageLoading.value = true;
  await assessmentStore.getAssessments(page);
  pageLoading.value = false;
  await navigateTo({ query: { page } });
};

const handleItemDeleted = async (id: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, archive it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      deleteLoading.value = true;
      await assessmentStore.removeAssessment(id);
      await navigateTo("/assessments");
      deleteLoading.value = false;
      await Swal.fire({
        title: "Success!",
        text: "Assessment has been archived",
        icon: "success",
      });
    }
  });
};
</script>
