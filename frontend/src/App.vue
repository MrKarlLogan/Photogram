<script setup lang="ts">
import axios from "axios";
import CardSection from "./components/CardSection.vue";
import CreateCardSection from "./components/CreateCardSection.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import config from "./config";
import { onMounted, ref } from "vue";

export type TCard = {
  _id: string;
  author: string;
  description: string;
  location: string;
  createdDate: string;
  photoUrl: string;
};

const cards = ref<TCard[]>([]);

const getCards = async () => {
  try {
    const response = await axios.get<TCard[]>(config.baseUrl);
    cards.value = response.data;
    return response.data;
  } catch (error) {
    console.log(`Ошибка загрузки карточек: ${error}`);
  }
};

onMounted(() => {
  getCards();
});

const handleCardsUpdate = (newCards: TCard[]) => {
  cards.value = newCards;
};
</script>

<template>
  <Header />
  <main class="main">
    <CardSection
      :cards="cards"
      @card-updated="handleCardsUpdate"
      class="main__section-one"
    />
    <CreateCardSection :on-refresh="getCards" class="main__section-two" />
  </main>
  <Footer />
</template>

<style scoped>
.main {
  flex: 1;
  display: grid;
  grid-template-columns: 5fr 1fr;
  min-block-size: 0%;

  .main__section-one {
    grid-column: 1;
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 1rem;
    }
  }

  .main__section-two {
    grid-column: 2;
  }
}
</style>
