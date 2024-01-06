<template>
  <p class="text-white text-center">Time Remaining: {{ formattedTime }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalMinutes: number;
  startedOn: string;
}>();

let totalSeconds = props.totalMinutes * 60;
const startedOn = new Date(props.startedOn).getTime();
const now = new Date().getTime();

const timeDiff = Math.floor((now - startedOn) / 1000);

totalSeconds = totalSeconds - timeDiff;
if (totalSeconds <= 0) totalSeconds = 0;

const formattedTime = ref("");

const countdownInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  let hours = Math.floor(totalSeconds / 3600).toString();
  let minutes = Math.floor((totalSeconds % 3600) / 60).toString();
  let seconds = (totalSeconds % 60).toString();

  if (Number(hours) < 10) hours = "0" + hours;
  if (Number(minutes) < 10) minutes = "0" + minutes;
  if (Number(seconds) < 10) seconds = "0" + seconds;

  formattedTime.value = `${hours}:${minutes}:${seconds}`;

  if (totalSeconds <= 0) {
    clearInterval(countdownInterval);
  } else {
    totalSeconds--;
  }
}
</script>
