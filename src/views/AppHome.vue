<template>
  <div class="app-home">
    <div class="row">
      <div class="col" style="background-color:#001B2E;">
        <a href="#" @click.prevent="openModal('ai')">
          <h2>Play vs AI</h2>
          <p>Click to lose or draw...</p>
        </a>
      </div>
      <div class="col" style="background-color:#294C60;">
        <a href="#" @click.prevent="openModal('random')">
          <h2>Play Against Random Moves</h2>
          <p>Click to have fun...</p>
        </a>
      </div>
      <div class="col" style="background-color:#4D586A;">
        <a href="#" @click.prevent="openModal('passAndPlay')">
          <h2>Pass and Play</h2>
          <p>Click to prove yourself to a friend...</p>
        </a>
      </div>
    </div>
  </div>
  <!-- send gamemode type -->
  <AppModal :show="showModal" :gameMode="gameMode" @close="showModal = false">
    <h2>{{ modalContent.title }}</h2>
  </AppModal>
</template>

<script>
import AppModal from '../components/AppModal.vue';

export default {
  name: 'AppHome',
  components: {
    AppModal
  },
  data() {
    return {
      showModal: false,
      gameMode: null,
      modalContent: {}
    };
  },
  methods: {
    openModal(type) {
      this.gameMode = type;
      const modalOptions = {
        ai: {
          title: "Play vs AI",
        },
        random: {
          title: "Play Against Random",
        },
        passAndPlay: {
          title: "Pass and Play",
        },
      };

      // set content and show
      this.modalContent = modalOptions[type];
      this.showModal = true;
    },
  },
};
</script>


<style scoped>
  .app-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .row {
    flex: 1;
    display: flex;
  }

  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .col a {
    text-decoration: none;
    color: #b3b3b3;
    font-size: 20px;
    transition: font-size 0.3s ease;
  }

  .col a:hover {
    font-size: 1.5em;
  }
</style>
