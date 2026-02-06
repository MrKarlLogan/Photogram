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
  grid-template-columns: 3fr 1fr;

  .main__section-one {
    grid-column: 1;
  }

  .main__section-two {
    grid-column: 2;
  }
}
</style>
