<script setup>
import { useData } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import Navbar from './Navbar.vue';
import BreadCrumb from './BreadCrumb.vue';

const { page, frontmatter } = useData();
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
          <Content />
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-inside">
        <div class="row">
          <div class="col-sm-8 footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
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
