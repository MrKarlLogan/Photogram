<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import config from "@/config";

const cards = ref([]);

onMounted(async () => {
  const response = await axios.get(config.baseUrl);
  cards.value = response.data;
  console.log(cards.value);
});
</script>

<template>
  <ul class="container">
    <li></li>
  </ul>
</template>

<style scoped lang="scss"></style>
