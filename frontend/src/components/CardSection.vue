<script setup lang="ts">
import axios from "axios";
import type { TCard } from "../App.vue";
import config from "@/config";

const props = defineProps<{
  cards: TCard[];
}>();

const emit = defineEmits<{
  (e: "card-updated", cards: TCard[]): void;
}>();

const deleteCard = async (id: string) => {
  const prevState = [...props.cards];
  const newState = props.cards.filter((card) => card._id !== id);

  emit("card-updated", newState);

  try {
    await axios.delete(config.baseUrl + "/" + id);
  } catch (error) {
    console.log(`Ошибка при удалении карточки: ${error}`);
    emit("card-updated", prevState);
  }
};
</script>

<template>
  <ul class="container">
    <li class="card" v-for="card in props.cards" :key="card._id">
      <h2 class="card__title">{{ card.location }}</h2>
      <img
        class="card__img"
        :src="config.baseUrl + card.photoUrl"
        :alt="card.description"
      />
      <p class="card__description">{{ card.description }}</p>
      <p class="card__author">{{ card.author }}</p>
      <div class="card__bottom-section">
        <button @click="deleteCard(card._id)" class="card__button">
          Удалить
        </button>
        <p class="card__date">
          Создано: {{ new Date(card.createdDate).toLocaleDateString() }}
        </p>
      </div>
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
    inline-size: 100%;
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

    &__bottom-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__button {
      font-family: "Press Start 2P", system-ui;
      margin-top: auto;
      inline-size: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
      background-color: black;
      color: white;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        background-color: white;
        color: black;
      }
    }
  }
}
</style>
