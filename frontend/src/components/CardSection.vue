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
  justify-content: flex-start;
  align-content: flex-start;
  gap: 1rem;
  list-style: none;
  padding: 1rem;

  .card {
    background-color: black;
    color: white;
    font-family: "Press Start 2P", system-ui;
    max-inline-size: 500px;
    max-block-size: 550px;
    block-size: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.01);
    }

    &__title {
      font-size: 0.7rem;
      text-align: end;
    }

    &__img {
      inline-size: calc(100% + 2rem);
      transform: translateX(-1rem);
      block-size: 50%;
      object-fit: cover;
    }

    &__description {
      flex: 1;
      text-align: start;
      font-size: 1rem;
    }

    &__author,
    &__date {
      font-size: 0.7rem;
      text-align: end;
    }
  }
}
</style>
