<script setup>
import { onMounted, onUpdated } from 'vue';
import { useData } from 'vitepress';
import Navbar from './Navbar.vue';
import BreadCrumb from './BreadCrumb.vue';

const { page, frontmatter } = useData();

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
</style>
