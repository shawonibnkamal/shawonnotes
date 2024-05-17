<script setup>
import Navbar from './Navbar.vue';
</script>

<template>
  <div id="home">
    <Navbar />

    <section class="home-nav">
      <div class="container">
        <div class="row">
          <div class="col-xs-6">
            <div class="home-nav-table">
              <div class="home-nav-th">IGCSE</div>
              <a href="./revision-notes/igcse/"
                ><div class="home-nav-td">Revision Notes</div></a
              >
              <a href="./past-papers/igcse/"
                ><div class="home-nav-td">Past Papers</div></a
              >
              <a href="./specification/igcse"
                ><div class="home-nav-td home-nav-td-last">
                  Specification
                </div></a
              >
            </div>
          </div>
          <div class="col-xs-6">
            <div class="home-nav-table">
              <div class="home-nav-th">IAL</div>
              <a href="./revision-notes/ial/"
                ><div class="home-nav-td">Revision Notes</div></a
              >
              <a href="./past-papers/ial/"
                ><div class="home-nav-td">Past Papers</div></a
              >
              <a href="./specification/ial"
                ><div class="home-nav-td home-nav-td-last">
                  Specification
                </div></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="rocket">
      <img src="./img/rocket.png" class="img-responsive" />
    </section>

    <div class="homepage-footer text-center">Shawon Notes &copy; 2024</div>
  </div>
</template>

<style>
#home {
  height: 100vh;
  background-image: url(img/sitepages-bg.jpg);
  background-repeat: repeat;
}
</style>
