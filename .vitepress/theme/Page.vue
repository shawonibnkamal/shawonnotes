<script setup>
import { onMounted, onUpdated, computed } from 'vue';
import { useData } from 'vitepress';
import Navbar from './Navbar.vue';
import BreadCrumb from './BreadCrumb.vue';

const { page, theme } = useData();

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

// Normalize the current path to handle index.md
const normalizePath = (path) => {
  if (path.endsWith('/index')) {
    return path.replace(/\/index$/, '/');
  }
  return path;
};

const nextPage = computed(() => {
  const sidebar = theme.value.sidebar || [];
  const currentPath = normalizePath(
    `/${page.value.relativePath.replace(/\.md$/, '')}`,
  ); // Normalize the current path

  // Flatten the sidebar into a single array of pages
  const flatPages = [];
  const flattenSidebar = (items) => {
    for (const item of items) {
      if (item.link) {
        flatPages.push(item); // Add the page to the flat list
      }
      if (item.items) {
        flattenSidebar(item.items); // Recursively flatten nested items
      }
    }
  };
  flattenSidebar(sidebar);

  // Find the current page index
  const currentIndex = flatPages.findIndex((page) => page.link === currentPath);

  // Return the next page if it exists
  if (currentIndex !== -1 && currentIndex + 1 < flatPages.length) {
    return flatPages[currentIndex + 1];
  }

  return null; // No next page found
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
        </div>
      </div>
    </section>

    <div v-if="nextPage" class="next-page">
      <a :href="nextPage.link" class="next-page-link">
        Next: {{ nextPage.text }}
      </a>
    </div>

    <footer>
      <div class="footer-inside">
        <div class="row">
          <div class="col-sm-8 footer-links">
            <a href="/about">About</a>
            <a
              href="https://github.com/shawonibnkamal/shawonnotes"
              target="_blank"
              >Contribute to this website</a
            >
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

.next-page {
  margin-top: 20px;
  text-align: right;
}

.next-page-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007acc;
  text-decoration: none;
}

.next-page-link:hover {
  text-decoration: underline;
}
</style>
