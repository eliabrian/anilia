<template>
  <div class="home my-4">
    <h1 class="text-center">Anilia</h1>

    <b-form inline class="justify-content-center" @submit.prevent="onSubmit">
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
      <b-button
        variant="outline-success"
        class="my-2 my-sm-0"
        type="submit"
        :disabled="search.length < 3"
      >Search</b-button>
    </b-form>

    <div class="text-center">
      <Loading v-if="loading"></Loading>
    </div>

    <div class="my-4">
      <ul class="list-unstyled">
        <b-media tag="li" v-for="result in searchResult" :key="result.id" class="py-3">
          <template v-slot:aside>
            <b-img :src="result.image_url" width="64" alt="placeholder"></b-img>
          </template>
          <h5 class="mt-0 mb-1">{{result.title}}</h5>
          <p class="mb-0">{{ result.synopsis }}</p>
        </b-media>
      </ul>
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
      searchResult: []
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      axios
        .get(
          "https://api.jikan.moe/v3/search/anime?q=" + this.search + "page=1"
        )
        .then(response => {
          this.searchResult = response.data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
