<template>
  <div class="anime my-4 container-fluid">
    <div class="row">
      <div class="col-md-5">
        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <b-media>
              <template v-slot:aside>
                <b-img :src="details.image_url" width="64" alt="placeholder" rounded></b-img>
              </template>
              <h4>{{ details.title }}</h4>
              <h6>{{ details.title_english}} - {{details.title_japanese}}</h6>
            </b-media>
            <hr />
            <dl class="row">
              <dt class="col-md-4">Aired:</dt>
              <dd class="col-md-8">
                <b-badge pill variant="secondary" class="mr-2">Jul 6, 2019 to Dec 28, 2019</b-badge>
              </dd>

              <dt class="col-md-4">Rating:</dt>
              <dd class="col-md-8">
                <b-badge pill variant="danger" class="mr-2">{{ details.rating }}</b-badge>
              </dd>

              <dt class="col-md-4">Producer(s):</dt>
              <dd class="col-md-8">
                <b-badge
                  pill
                  variant="warning"
                  class="mr-2"
                  v-for="producer in details.producers"
                  :key="producer.mal_id"
                >{{producer.name}}</b-badge>
              </dd>

              <dt class="col-md-4">Licensor(s):</dt>
              <dd class="col-md-8">
                <b-badge
                  pill
                  variant="info"
                  class="mr-2"
                  v-for="licensor in details.licensors"
                  :key="licensor.mal_id"
                >{{ licensor.name }}</b-badge>
              </dd>

              <dt class="col-md-4">Studio(s):</dt>
              <dd class="col-md-8">
                <b-badge
                  pill
                  variant="success"
                  class="mr-2"
                  v-for="studio in details.studios"
                  :key="studio.mal_id"
                >{{ studio.name }}</b-badge>
              </dd>

              <dt class="col-md-4">Genre(s):</dt>
              <dd class="col-md-8">
                <b-badge
                  pill
                  variant="primary"
                  class="mr-2"
                  v-for="genre in details.genres"
                  :key="genre.mal_id"
                >{{genre.name}}</b-badge>
              </dd>

              <dt class="col-md-4">Episodes:</dt>
              <dd class="col-md-8">
                <b-badge pill variant="dark" class="mr-2">{{ details.episodes }}</b-badge>
              </dd>

              <dt class="col-md-4">Score:</dt>
              <dd class="col-md-8">
                {{ details.score }} / 10
                <b-progress
                  :value="details.score"
                  max="10"
                  precision="2"
                  show-value
                  class="mt-2"
                  variant="primary"
                ></b-progress>
              </dd>
            </dl>
          </div>
        </b-card>

        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h3>Synopsis</h3>
            <hr />
            <p class="text-muted">{{ details.synopsis }}</p>
          </div>
        </b-card>
      </div>

      <div class="col-md-7">
        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h3>Characters</h3>
            <hr />
            <div class="row">
              <div class="col-lg-3 my-3" v-for="character in characters" :key="character.mal_id">
                <b-link
                  :to="'/character/' + character.mal_id"
                  class="text-decoration-none text-dark"
                >
                  <b-card :img-src="character.image_url" img-alt="Card image" img-top>
                    <b-card-text class="text-center">{{ character.name }}</b-card-text>
                  </b-card>
                </b-link>
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  name: "Anime",
  props: ["id"],

  components: {
    Loading
  },

  created() {
    this.getDetails();
    this.getCharacters();
  },

  data() {
    return {
      details: [],
      characters: [],
      loading: false
    };
  },

  methods: {
    getDetails() {
      this.loading = true;
      axios
        .get("https://api.jikan.moe/v3/anime/" + this.id)
        .then(response => {
          this.details = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getCharacters() {
      this.loading = true;
      axios
        .get("https://api.jikan.moe/v3/anime/" + this.id + "/characters_staff")
        .then(response => {
          this.characters = response.data.characters;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>