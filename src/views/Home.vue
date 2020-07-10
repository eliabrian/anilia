<template>
  <div class="home my-4 container">
    <h1 class="text-center">Anilia</h1>

    <b-form inline class="justify-content-center mb-3" @submit.prevent="onSubmit">
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
      <b-button
        variant="outline-secondary"
        class="my-2 my-sm-0"
        type="submit"
        :disabled="search.length < 3"
      >
        <b-icon icon="search" aria-hidden="true"></b-icon>Search
      </b-button>
    </b-form>
    <b-form-group label="Type" class="text-center">
      <b-form-radio-group v-model="type" :options="options" name="radio-inline"></b-form-radio-group>
    </b-form-group>

    <div class="my-4" v-if="searchResult">
      <h3>Results for "{{ searchWord }}"</h3>
      <hr />
      <ul class="list-unstyled">
        <b-media tag="li" v-for="result in searchResult" :key="result.id" class="py-3">
          <template v-slot:aside>
            <b-img :src="result.image_url" width="64" alt="placeholder"></b-img>
          </template>
          <b-link :to="'/' + type + '/' + result.mal_id" class="text-decoration-none text-dark">
            <h5 class="mt-0 mb-1">{{ result.title }}</h5>
            <p class="mb-0" v-if="!result.synopsis.length">There is no synopsis.</p>
            <p class="mb-0" v-else>{{ result.synopsis }}</p>
          </b-link>
        </b-media>
      </ul>
      <div class="text-center" v-if="limit < 50">
        <b-button variant="outline-primary" @click="showMore" :disabled="loading">
          <b-spinner small v-if="loading" class="mr-1"></b-spinner>More
        </b-button>
      </div>
    </div>

    <div class="text-center">
      <Loading v-if="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Loading
  },
  data() {
    return {
      loading: false,
      search: "",
      searchWord: "",
      searchResult: "",
      page: 1,
      limit: 10,
      type: "anime",
      options: [
        { text: "Anime", value: "anime" },
        { text: "Manga", value: "manga" }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.resetResult();
      this.fetchResults();
    },

    resetResult() {
      this.searchResult = "";
      this.limit = 10;
    },

    fetchResults() {
      this.searchWord = this.search;
      axios
        .get("https://api.jikan.moe/v3/search/" + this.type, {
          params: {
            q: this.search,
            page: this.page,
            limit: this.limit
          }
        })
        .then(response => {
          this.searchResult = response.data.results;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    showMore() {
      this.loading = true;
      this.limit = this.limit + 10;
      this.fetchResults();
    }
  }
};
</script>
