<script setup>
import { onMounted, onUpdated, computed, watch, ref } from 'vue';
import { useData, useRoute } from 'vitepress';
import Navbar from './Navbar.vue';
import BreadCrumb from './BreadCrumb.vue';
import Giscus from '@giscus/vue';

const { page, theme } = useData();
const route = useRoute();

// Force Giscus re-render when route changes
const giscusKey = ref(0);

watch(
  () => route.path,
  () => {
    // Increment key to force re-render
    giscusKey.value++;
  },
  { immediate: true },
);

function renderMathJax() {
  try {
    if (window.MathJax) {
      window.MathJax.typesetPromise().catch((err) =>
        console.error('MathJax rendering failed:', err),
      );
    }
  } catch (e) {
    console.error('Error while renderMathJax - ' + e);
  }
}

onMounted(() => {
  renderMathJax();
});

onUpdated(() => {
  renderMathJax();
});

const normalizePath = (path) => {
  if (path.endsWith('/index')) {
    return path.replace(/\/index$/, '/');
  }
  return path;
};

const editLink = computed(() => {
  const githubBaseUrl =
    'https://github.com/shawonibnkamal/shawonnotes/blob/main/';
  const relativePath = page.value.relativePath;

  // Handle index files (link to the folder)
  if (relativePath.endsWith('index.md')) {
    const folderPath = relativePath.replace(/index\.md$/, ''); // Remove 'index.md'
    return githubBaseUrl + folderPath;
  }

  // Handle past papers (JSON files)
  if (relativePath.includes('past-papers')) {
    const jsonPath = relativePath.replace(/\.md$/, '.json'); // Convert .md to .json
    return githubBaseUrl + jsonPath;
  }

  // Default case: Assume the file exists in GitHub
  return githubBaseUrl + relativePath;
});

const pageLinks = computed(() => {
  const sidebar = theme.value.sidebar || [];
  const currentPath = normalizePath(
    `/${page.value.relativePath.replace(/\.md$/, '')}`,
  );

  const flatPages = [];
  const flattenSidebar = (items) => {
    for (const item of items) {
      if (item.link) {
        flatPages.push(item);
      }
      if (item.items) {
        flattenSidebar(item.items);
      }
    }
  };
  flattenSidebar(sidebar);

  const currentIndex = flatPages.findIndex((page) => page.link === currentPath);
  const nextPage =
    currentIndex !== -1 && currentIndex + 1 < flatPages.length
      ? flatPages[currentIndex + 1]
      : null;
  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;

  return { nextPage, prevPage };
});
</script>

<template>
  <div id="page">
    <Navbar />

    <div class="container">
      <h1 class="heading">{{ page.title }}</h1>
    </div>

    <section class="main">
      <div class="main-inside">
        <div class="container">
          <BreadCrumb />
          <div class="vp-doc">
            <Content />
          </div>

          <div class="navigation-buttons">
            <div v-if="pageLinks.prevPage" class="prev-page">
              <a :href="pageLinks.prevPage.link" class="nav-button prev-button">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
                <span class="nav-text">{{ pageLinks.prevPage.text }}</span>
              </a>
            </div>
            <div v-if="pageLinks.nextPage" class="next-page">
              <a :href="pageLinks.nextPage.link" class="nav-button next-button">
                <span class="nav-text">{{ pageLinks.nextPage.text }}</span>
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </a>
            </div>
          </div>

          <div class="comments-section">
            <Giscus
              :key="giscusKey"
              id="comments"
              repo="shawonibnkamal/shawonnotes"
              repoId="R_kgDOLp4iJg"
              category="General"
              categoryId="DIC_kwDOLp4iJs4CedlL"
              mapping="pathname"
              strict="1"
              reactionsEnabled="0"
              emitMetadata="0"
              inputPosition="bottom"
              theme="light"
              lang="en"
            />
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-inside">
        <div class="row">
          <div class="col-sm-8 footer-links">
            <a href="/about">About</a>
            <a
              v-if="editLink"
              :href="editLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edit this page on GitHub
            </a>
          </div>

          <div class="col-sm-4 credit">Shawon Notes &copy; 2024</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  background-image: url(img/sitepages-bg.jpg);
  background-repeat: repeat-x;
}

.comments-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eaeaea;
}

.comments-section h3 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}
</style>
