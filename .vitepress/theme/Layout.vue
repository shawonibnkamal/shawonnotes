<script setup>
import { useData } from 'vitepress';
import Home from './Home.vue';
import Page from './Page.vue';

const { page, frontmatter } = useData();
</script>

<template>
  <Home v-if="frontmatter.layout === 'home'" />
  <Page v-else />
  <!-- <Page /> renders <Content /> -->
</template>
