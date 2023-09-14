<script setup lang="ts">
import ImageList from "./components/ImageList.vue"
import {ModalsContainer} from "vue-final-modal"
</script>

<template>
  <main>
    <router-link to="/main"/>
    <ImageList/>
  </main>
  <ModalsContainer/>
</template>

