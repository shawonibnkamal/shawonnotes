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

function findNextRecursive(
  items,
  currentPath,
  parentItems = null,
  parentIndex = -1,
) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // If the current page is found, return the next item
    if (normalizePath(item.link) === currentPath) {
      console.log('Current Page Found:', item.link);

      // If the current item has nested items, dive into the first file
      if (item.items) {
        const firstFile = findFirstFile(item.items);
        if (firstFile) return firstFile;
      }

      // Otherwise, return the next item in the current list
      if (i + 1 < items.length) {
        return items[i + 1];
      }

      // If no next item is found, go up to the parent list
      if (parentItems && parentIndex >= 0) {
        return findNextRecursive(parentItems, null, null, parentIndex + 1);
      }

      return null; // No next page found
    }

    // Recursively search in nested items
    if (item.items) {
      const next = findNextRecursive(item.items, currentPath, items, i);
      if (next) return next;
    }
  }

  return null; // No next page found
}

// Recursive function to find the first file in a directory
function findFirstFile(items) {
  for (const item of items) {
    if (item.link) {
      return item; // Return the first file found
    }
    if (item.items) {
      const firstFile = findFirstFile(item.items);
      if (firstFile) return firstFile;
    }
  }
  return null;
}

// Compute the next page based on the sidebar
const nextPage = computed(() => {
  const sidebar = theme.value.sidebar || [];
  const currentPath = normalizePath(
    `/${page.value.relativePath.replace(/\.md$/, '')}`,
  ); // Normalize current path
  console.log('Current Path:', currentPath);
  console.log('Sidebar:', JSON.stringify(sidebar, null, 2)); // Debug the sidebar structure

  for (const group of sidebar) {
    const next = findNextRecursive(group.items || [], currentPath);
    if (next) return next;
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

    <!-- Next Page Button -->
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
