<template>
  <div class="container-fluid character my-4">
    <div class="row">
      <div class="col-md-5">
        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <b-media>
              <template v-slot:aside>
                <b-img :src="character.image_url" width="64"></b-img>
              </template>

              <h5>{{ character.name }}</h5>
              <h6>{{ character.name_kanji }}</h6>
            </b-media>
            <hr />
            <p style="white-space: pre-line;" class="text-muted">{{character.about}}</p>
          </div>
        </b-card>

        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h5>Animeography</h5>
            <hr />
            <b-list-group>
              <b-list-group-item
                v-for="animeography in character.animeography"
                :key="animeography.mal_id"
              >
                <b-avatar :to="'/anime/' + animeography.mal_id" :src="animeography.image_url"></b-avatar>
                <span class="ml-2">{{ animeography.name }}</span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-card>

        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h5>Mangaography</h5>
            <hr />
            <b-list-group>
              <b-list-group-item
                v-for="mangaography in character.mangaography"
                :key="mangaography.mal_id"
              >
                <b-avatar href="#bar" :src="mangaography.image_url"></b-avatar>
                <span class="ml-2">{{ mangaography.name }}</span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-card>
      </div>
      <div class="col-md-7">
        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h5>Pictures</h5>
            <hr />
            <div class="row">
              <div class="col-lg-3 my-3" v-for="picture in pictures" :key="picture.id">
                <b-img thumbnail fluid :src="picture.large" alt="Image 1"></b-img>
              </div>
            </div>
          </div>
        </b-card>
        <b-card class="mb-3 shadow-sm">
          <div v-if="loading" class="text-center">
            <Loading></Loading>
          </div>
          <div v-else>
            <h5>Voice Actors</h5>
            <hr />
            <div class="row">
              <div
                class="col-lg-3 my-3"
                v-for="actor in character.voice_actors"
                :key="actor.mal_id"
              >
                <b-link :to="'/person/' + actor.mal_id" class="text-decoration-none text-dark">
                  <b-card :img-src="actor.image_url" img-alt="Card image" img-top>
                    <b-card-text class="text-center mb-1">{{ actor.name }}</b-card-text>
                    <b-card-text class="text-center text-muted">{{ actor.language }}</b-card-text>
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
  components: { Loading },
  name: "Character",
  props: ["id"],
  created() {
    this.getCharacter();
    this.getCharacterPictures();
  },

  data() {
    return {
      character: "",
      pictures: "",
      loading: false
    };
  },

  methods: {
    getCharacter() {
      this.loading = true;
      axios
        .get("http://api.jikan.moe/v3/character/" + this.id)
        .then(response => {
          this.character = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getCharacterPictures() {
      this.loading = true;
      axios
        .get("http://api.jikan.moe/v3/character/" + this.id + "/pictures")
        .then(response => {
          this.pictures = response.data.pictures;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>