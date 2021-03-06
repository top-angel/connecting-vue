<template>
  <div>
    <p>
      {{ instructions }}
    </p>
    <game-board
      :checkers="checkers"
      :row-count="rowCount"
      :col-count="colCount"
      :status="status"
      @drop="drop"
      @land="land"
      />
    <score-board
      :moves="moves"
      :winner="winner"
      :player-color="playerColor"
      :status="status"
      @reset="reset"
      />
  </div>
</template>

<script>
import Vue from 'vue';

import { min, max, key } from '@/utils';
import { RED, BLACK, EMPTY, PLAY, OVER } from '@/constants';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

export default {
  components: {
    GameBoard, ScoreBoard
  },

  data() {
    return {
      checkers: {},
      isLocked: false,
      playerColor: RED,
      rowCount: 6,
      colCount: 7,
      status: PLAY,
      instructions: 'Click columns to add checkers',
      winner: undefined,
    };
  },

  computed: {
    moves() {
      return Object.values(this.checkers);
    },

    gameOver() {
      return this.status === OVER;
    },

    isDraw() {
      return Object.keys(this.checkers).length === this.rowCount * this.colCount;
    },
  },

  methods: {
    key,

    reset() {
      this.winner = undefined;
      this.isLocked = false;
      this.status = PLAY;
      this.checkers = {};
    },

    toggleColor() {
      if (this.playerColor === RED) {
        this.playerColor = BLACK;
      } else {
        this.playerColor = RED;
      }
    },

    setChecker({ row, col }, attrs = {}) {
      const checker = this.getChecker({ row, col });
      return Vue.set(this.checkers, key(row, col), { ...checker, ...attrs });
    },

    getChecker({ row, col }) {
      return this.checkers[key(row, col)] || { row, col, color: 'empty' };
    },

    drop({ col, row }) {
      if (this.isLocked) return;

      this.isLocked = true;
      const color = this.playerColor;

      this.setChecker({ row, col }, { color });

      if (!this.isDraw) this.checkForWinFrom({ row, col });
    },

    land() {
      if (this.isDraw) return this.displayDraw();

      if (this.winner) {
        this.displayWin(this.winner);
      } else {
        this.isLocked = false;
        this.toggleColor();
      }
    },

    getWinner(...segment) {
      if (segment.length !== 4) return false;
      const checkers = segment.map(([row, col]) => this.getChecker({ row, col }));
      const [{ color }] = checkers;
      if (color === EMPTY) return false;
      return checkers.every(c => c.color === color) && { color, checkers };
    },

    checkHorizontalSegments({ focalRow, minCol, maxCol }) {
      let winner;
      for (let row = focalRow, col = minCol; col <= maxCol; col++) {
        winner = this.getWinner(
          [row, col], [row, col + 1], [row, col + 2], [row, col + 3]);
        if (winner) return winner;
      }
    },

    checkVerticalSegments({ focalRow, focalCol, minRow }) {
      let winner;
      for (let col = focalCol, row = minRow; row <= focalRow; row++) {
        winner = this.getWinner(
         [row, col], [row + 1, col], [row + 2, col], [row + 3, col]);
        if (winner) return winner;
      }
    },

    checkForwardSlashSegments({ focalRow, focalCol, minRow, minCol, maxRow, maxCol }) {
      const startForwardSlash = (row, col) => {
        while (row > minRow && col > minCol) { row--; col--; }
        return [row, col];
      };
      let winner;
      for (let [row, col] = startForwardSlash(focalRow, focalCol);
        row <= maxRow && col <= maxCol; row++, col++) {
        winner = this.getWinner(
          [row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]);
        if (winner) return winner;
      }
    },

    checkBackwardSlashSegments({ focalRow, focalCol, minRow, minCol, maxRow, maxCol }) {
      const startBackwardSlash = (row, col) => {
        while (row < maxRow && col > minCol) { row++; col--; }
        return [row, col];
      };
      let winner;
      for (let [row, col] = startBackwardSlash(focalRow, focalCol);
        row >= minRow && col <= maxCol; row--, col++) {
        winner = this.getWinner(
          [row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]);
        if (winner) return winner;
      }
    },

    checkForWinFrom(lastChecker) {
      if (!lastChecker) return;
      const { row: focalRow, col: focalCol } = lastChecker;
      const minCol = min(focalCol);
      const maxCol = max(focalCol, this.colCount - 1);
      const minRow = min(focalRow);
      const maxRow = max(focalRow, this.rowCount - 1);
      const coords = { focalRow, focalCol, minRow, minCol, maxRow, maxCol };

      this.winner = this.checkHorizontalSegments(coords) ||
        this.checkVerticalSegments(coords) ||
        this.checkForwardSlashSegments(coords) ||
        this.checkBackwardSlashSegments(coords);
    },

    displayDraw() {
      this.status = OVER;
    },

    displayWin(winner) {
      this.winner = winner;
      this.status = OVER;
      this.winner.checkers.forEach((checker) => {
        this.setChecker(checker, { isWinner: true });
      });
    },
  },
};
</script>
