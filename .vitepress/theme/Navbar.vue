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

          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Computer Science
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="/computer-science/coding-interview/"
                  >Coding Interview
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="https://github.com/shawonibnkamal/shawonnotes"
              target="_blank"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.834 2.805 1.304 3.49.997.107-.776.42-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.312.465-2.382 1.235-3.22-.135-.303-.54-1.527.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.65.24 2.873.12 3.176.765.838 1.23 1.908 1.23 3.22 0 4.608-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.902-.015 3.296 0 .315.21.69.825.573C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
