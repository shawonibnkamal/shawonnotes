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
              >Revision Notes <span class="caret"></span
            ></a>
            <ul class="dropdown-menu">
              <li><a href="/igcse/revision-notes/">IGCSE</a></li>
              <li>
                <a href="/ial/revision-notes/">IAL</a>
              </li>
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
              >Past Papers <span class="caret"></span
            ></a>
            <ul class="dropdown-menu">
              <li><a href="/igcse/past-papers/">IGCSE</a></li>
              <li><a href="/ial/past-papers/">IAL</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
