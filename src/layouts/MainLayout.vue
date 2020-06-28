<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpened = !isOpened" />
      <Sidebar :value="isOpened" />

      <main class="app-content" :class="{ full: !isOpened }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue add-record-btn"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import Sidebar from "../components/app/Sidebar";
import messages from './../utils/messages';

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      isOpened: true,
      loading: true,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>
