<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import config from "@/config";

type TCard = {
  _id: string;
  author: string;
  description: string;
  location: string;
  createdDate: string;
  photoUrl: string;
};

const cards = ref<TCard[]>([]);

onMounted(async () => {
  const response = await axios.get<TCard[]>(config.baseUrl);
  cards.value = response.data;
  console.log(cards.value);
});
</script>

<template>
  <ul class="container">
    <li class="card" v-for="card in cards" :key="card._id">
      <h2 class="card__title">{{ card.location }}</h2>
      <img
        class="card__img"
        :src="config.baseUrl + card.photoUrl"
        :alt="card.description"
      />
      <p class="card__description">{{ card.description }}</p>
      <p class="card__author">{{ card.author }}</p>
      <p class="card__date">
        Создано: {{ new Date(card.createdDate).toLocaleDateString() }}
      </p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.container {
  inline-size: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;

  .card {
    inline-size: 30%;
    max-block-size: 500px;
    background-color: white;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transform: scale(1.02);
    }

    &__img {
      inline-size: 100%;
      max-block-size: 300px;
      object-fit: cover;
      border-radius: 0.3rem;
    }

    &__title {
      text-align: end;
    }
  }
}
</style>
