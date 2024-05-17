<script setup>
import { useData } from 'vitepress';
import NotFound from './NotFound.vue';
import Home from './Home.vue';
import Page from './Page.vue';

const { page, frontmatter } = useData();
</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <Home v-if="frontmatter.layout === 'home'" />
  <Page v-else />
  <!-- <Page /> renders <Content /> -->
</template>

<script>
export default {
  mounted() {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  },
};
</script>
