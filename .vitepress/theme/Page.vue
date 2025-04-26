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
            <div>
              <div v-if="pageLinks.prevPage" class="prev-page">
                <a :href="pageLinks.prevPage.link" class="prev-page-link">
                  Previous: {{ pageLinks.prevPage.text }}
                </a>
              </div>
            </div>
            <div v-if="pageLinks.nextPage" class="next-page">
              <a :href="pageLinks.nextPage.link" class="next-page-link">
                Next: {{ pageLinks.nextPage.text }}
              </a>
            </div>
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

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.prev-page-link,
.next-page-link {
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  background-color: #f9f9f9;
  font-size: 14px;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.prev-page-link:hover,
.next-page-link:hover {
  background-color: #eaeaea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.prev-page-link:focus,
.next-page-link:focus {
  outline: 2px solid #ccc;
}

.navigation-buttons .prev-page {
  text-align: left;
}

.navigation-buttons .next-page {
  text-align: right;
}
</style>
