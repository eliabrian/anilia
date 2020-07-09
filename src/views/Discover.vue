<template>
  <div class="discover my-4">
    <h4>
      <b-icon icon="play-fill" variant="primary"></b-icon>
      Playing This Season
    </h4>
    <hr />

    <div class="row">
      <div class="col-md-3" v-for="anime in season" :key="anime.id">
        <b-link to="/" class="text-decoration-none text-dark">
          <b-card class="mb-3" :img-src="anime.image_url">
            <b-card-title class="text-truncate">
              {{ anime.title }}
            </b-card-title>
          </b-card>
        </b-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Discover",

  created() {
    this.getSeason();
  },

  data() {
    return {
      date: new Date(),
      season: [],
      loading: false,
    };
  },

  computed: {
    currentYear: function() {
      return this.date.getFullYear();
    },

    currentSeason: function() {
      let month = this.date.getMonth();
      if (month >= 3 && month <= 5) return "spring";
      if (month >= 6 && month <= 8) return "summer";
      if (month >= 9 && month <= 11) return "fall";
      return "winter";
    },
  },

  methods: {
    getSeason() {
      this.loading = true;
      axios
        .get(
          "https://api.jikan.moe/v3/season/" +
            this.currentYear +
            "/" +
            this.currentSeason
        )
        .then((response) => {
          this.season = response.data.anime.slice(0, 12);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
