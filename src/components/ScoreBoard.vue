<template>
  <div class="score-board">
    <div class="player-1 cell">
      <p :style="{ color: redHex }">RED</p>
      <p v-if="playerIsRed">(You)</p>
    </div>
    <div class="status cell">
      <p v-if="gameOver">
        {{ overMessage }}
        <a href="#" @click="reset">Play again</a>
      </p>
      <p v-else>
        {{ whoseTurn }}
      </p>
    </div>
    <div class="player-2 cell">
      <p :style="{ color: blackHex }">BLACK</p>
      <p v-if="playerIsBlack">(You)</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { HEXES, BLACK, RED, OVER } from '@/constants';

const titleize = text => text[0].toUpperCase() + text.slice(1);

export default {
  props: ['winner', 'moves', 'playerColor', 'status'],

  computed: {
    redHex() {
      return HEXES.red;
    },

    blackHex() {
      return HEXES.black;
    },

    winnerName() {
      return this.winner && titleize(this.winner.color);
    },

    playerIsRed() {
      return this.playerColor === RED;
    },

    playerIsBlack() {
      return this.playerColor === BLACK;
    },

    gameOver() {
      return this.status === OVER;
    },

    overMessage() {
      if (this.winner) {
        return `${titleize(this.winner.color)} wins!`;
      }
      return 'It\'s a draw!';
    },

    whoseTurn() {
      return `${titleize(this.playerColor)} goes ${this.moves.length === 0 ? 'first' : 'next'}`;
    },
  },

  methods: {
    reset() {
      this.$emit('reset');
    },
  },
};
</script>

<style scoped>
.score-board {
  width: 430px;
  display: grid;
  grid-template-columns: [player1] 25% [status] 50% [player2] 25%;
  margin: 0 auto;
  padding: 1em 0;
  font-weight: bold;
}
.score-board .status {
  font-weight: normal;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100px);
  opacity: 0;
}
</style>
