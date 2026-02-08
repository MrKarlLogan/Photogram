<script setup lang="ts">
import CardSection from "./components/CardSection.vue";
import CreateCardSection from "./components/CreateCardSection.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main class="main">
    <CardSection class="main__section-one" />
    <CreateCardSection class="main__section-two" />
  </main>
  <Footer />
</template>

<style scoped>
.main {
  flex: 1;
  display: grid;
  grid-template-columns: 5fr 1fr;

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
