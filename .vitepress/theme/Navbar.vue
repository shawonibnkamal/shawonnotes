<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/"><img src="./img/logo.png" /></a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              IGCSE
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="/igcse/past-papers/">Past Papers</a></li>
              <li><a href="/igcse/revision-notes/">Revision Notes</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              IAL
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="/ial/past-papers/">Past Papers</a></li>
              <li><a href="/ial/revision-notes/">Revision Notes</a></li>
            </ul>
          </li>

          <li>
            <a
              href="https://github.com/shawonibnkamal/shawonnotes"
              target="_blank"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
