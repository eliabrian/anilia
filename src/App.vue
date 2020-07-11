<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">Anilia</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/" active>Home</b-nav-item>
          <b-nav-item to="/discover" active>Discover</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main role="main">
      <router-view />
    </main>
    <hr />
    <footer class="footer mt-auto py-3 text-center">
      <div class="container">
        Developed by
        <a href="https://github.com/eliabrian">Elia Brian Baskoro</a> &copy; 2020. Built using
        <a href="https://jikan.moe/">Jikan API</a>
      </div>
    </footer>
  </div>
</template>

<style></style>
