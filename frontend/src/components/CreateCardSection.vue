<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref(null);
const previewUrl = ref("");

const handleFilePreview = (event: Event) => {
  if (!fileInput.value) return;
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) previewUrl.value = URL.createObjectURL(file);
};
</script>

<template>
  <div class="container">
    <form class="form" @submit.prevent="console.log('Отправлено')">
      <h2>Создать фотокарточку</h2>
      <label for="author">Введите имя автора:</label>
      <input id="author" class="form__author" type="text" required />
      <label for="description">Введите описание:</label>
      <textarea
        id="description"
        class="form__description"
        rows="20"
        required
      ></textarea>
      <label for="location">Укажите локацию:</label>
      <input id="location" class="form__location" type="text" required />
      <label for="file">Загрузите фотографию:</label>
      <input
        ref="fileInput"
        id="file"
        class="form__file"
        type="file"
        @change="handleFilePreview"
        required
      />
      <img
        v-if="previewUrl"
        class="form__preview"
        :src="previewUrl"
        alt="Превью"
      />
      <button class="form__button" type="submit">Создать</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
  color: white;
  font-family: "Press Start 2P", system-ui;

  .form {
    inline-size: 100%;
    block-size: 100%;
    background-color: black;
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    font-family: "Press Start 2P", system-ui;

    &__author {
      font-family: "Press Start 2P", system-ui;
      inline-size: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    &__description {
      font-family: "Press Start 2P", system-ui;
      inline-size: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
      resize: none;
    }

    &__location {
      font-family: "Press Start 2P", system-ui;
      inline-size: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    &__file {
      inline-size: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
      font: {
        family: "Press Start 2P", system-ui;
        size: 0.5rem;
      }

      &::file-selector-button {
        font-family: "Press Start 2P", system-ui;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        color: white;
        background-color: black;
        font-weight: bold;
        cursor: pointer;
        margin-right: 15px;
        transition: 0.3s;
      }

      &::file-selector-button:hover {
        background-color: white;
        color: black;
      }
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

    &__preview {
      inline-size: inherit;
      border-radius: 0.5rem;
    }
  }
}
</style>
