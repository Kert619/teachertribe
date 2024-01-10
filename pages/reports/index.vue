<template>
  <PageContent title="Reports">
    <div class="space-x-3">
      <div class="flex items-center gap-3 max-w-lg">
        <span>Filter by:</span>
        <div class="grow">
          <VTextInput
            name="search"
            size="input-sm"
            placeholder="Search assessment, email"
            v-model="search"
          />
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <ErrorStatus v-if="error" />

    <template
      v-else-if="
        assessmentExamineeStore.assessmentExaminees &&
        assessmentExamineeStore.assessmentExaminees.data.length > 0
      "
    >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Schedule</th>
              <th>Time Taken</th>
              <th>Marks</th>
              <th>Test Mode</th>
              <th>PIN</th>
              <th>No. of retries</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="examinee in assessmentExamineeStore.assessmentExaminees
                .data"
              :key="examinee.id"
            >
              <td class="whitespace-nowrap">
                {{ examinee.assessment.assessment_title }}
              </td>
              <td>
                {{
                  examinee.examinee.first_name +
                  " " +
                  examinee.examinee.last_name
                }}
              </td>
              <td>{{ examinee.examinee.email }}</td>
              <td>
                <div class="flex flex-col gap-3">
                  <span class="whitespace-nowrap">
                    <span class="font-bold">From: </span>
                    <span>
                      {{
                        new Date(examinee.schedule_from).toLocaleString(
                          "en-PH",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )
                      }}
                    </span>
                  </span>

                  <span class="whitespace-nowrap">
                    <span class="font-bold">To: </span>
                    <span>
                      {{
                        new Date(examinee.schedule_to).toLocaleString("en-PH", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      }}
                    </span>
                  </span>
                </div>
              </td>
              <td>
                {{
                  timeTaken(
                    examinee.started_on,
                    examinee.finished_on,
                    examinee.status
                  )
                }}
              </td>
              <td>
                {{ examinee.status === "Completed" ? examinee.marks : "n/a" }}
              </td>
              <td>{{ examinee.test_mode }}</td>
              <td>{{ examinee.pin }}</td>
              <td>{{ examinee.retry_count }}</td>
              <td>{{ examinee.status }}</td>
              <td>
                <div class="flex gap-3">
                  <button
                    @click="navigateTo(`/reports/${examinee.id}`)"
                    class="btn btn-sm flex-nowrap"
                    :disabled="examinee.status !== 'Completed'"
                  >
                    <IconCardText />
                    <span class="whitespace-nowrap">Detailed Report</span>
                  </button>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="removeAssessmentExaminee(examinee.id)"
                  >
                    <IconArchive />
                    Archive
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center gap-3 mt-5">
        <Pagination
          :page-meta="assessmentExamineeStore.assessmentExaminees.meta"
          @page-changed="handlePageChanged"
        />
        <Loading v-if="pageLoading" />
      </div>
    </template>

    <h4 v-else>No reports found...</h4>

    <FullscreenLoading v-if="deleteLoading" />
  </PageContent>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
useHead({
  title: "Teacher Tribe - Reports",
});

const assessmentExamineeStore = useAssessmentExamineeStore();

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;
const searchQuery = route.query.search as string;

const pageLoading = ref(false);
const deleteLoading = ref(false);

const search = ref("");

if (searchQuery) search.value = searchQuery;

const { error } = await assessmentExamineeStore.getAssessmentExaminees(
  search.value,
  page
);

const debounceSearch = useDebounce(
  assessmentExamineeStore.getAssessmentExaminees
);

watch(search, async () => {
  await debounceSearch(search.value);
  await navigateTo({ query: { search: search.value } });
});

const handlePageChanged = async (page: number) => {
  pageLoading.value = true;
  await assessmentExamineeStore.getAssessmentExaminees(search.value, page);
  pageLoading.value = false;
  await navigateTo({ query: { page, search: search.value } });
};

const timeTaken = (startedOn: string, finishedOn: string, status: string) => {
  if (status !== "Completed") return "n/a";

  const from = new Date(startedOn).getTime();
  const to = new Date(finishedOn).getTime();

  const timeDiff = (to - from) / 1000;

  let hours = Math.floor(timeDiff / 3600).toString();
  let minutes = Math.floor((timeDiff % 3600) / 60).toString();
  let seconds = Math.floor(timeDiff % 60).toString();

  if (Number(hours) < 10) hours = "0" + hours;
  if (Number(minutes) < 10) minutes = "0" + minutes;
  if (Number(seconds) < 10) seconds = "0" + seconds;

  return `${hours}:${minutes}:${seconds}`;
};

const removeAssessmentExaminee = async (id: number) => {
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
      await assessmentExamineeStore.removeAssessmentExaminee(id);
      await navigateTo("/reports");
      deleteLoading.value = false;
      await Swal.fire({
        title: "Success!",
        text: "Examinee has been archived",
        icon: "success",
      });
    }
  });
};
</script>
