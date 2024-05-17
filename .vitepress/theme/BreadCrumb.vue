<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="(part, index) in pages" :key="index">
        <template v-if="index < pages.length - 1">
          <a :href="toPath(index)">{{ getDisplayFileName(part) || 'Home' }}</a>
        </template>
        <template v-else>
          {{ getDisplayFileName(part) || 'Home' }}
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import getDisplayFileName from '../getDisplayFileName';

const route = useRoute();
const pages = computed(() => {
  let pages =
    typeof route.path === 'string' ? route.path.split('/').slice(1) : [];
  while (pages.length > 0 && pages[pages.length - 1] === '') {
    pages.pop();
  }
  return pages;
});

const toPath = (index) => '/' + pages.value.slice(0, index + 1).join('/') + '/';
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
}
</style>
