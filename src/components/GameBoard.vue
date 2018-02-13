<template>
    <svg :viewBox="`0 0 ${boardWidth} ${boardHeight}`"
    xmlns="http://www.w3.org/2000/svg"
    class="game-board" stroke="none">
    <defs>
      <pattern :id="patternId" patternUnits="userSpaceOnUse" :width="cellSize" :height="cellSize">
        <circle :cx="cellSize / 2" :cy="cellSize / 2" :r="checkerRadius" fill="black" />
      </pattern>
      <mask :id="maskId">
        <rect :width="cellSize" :height="boardHeight" fill="white" />
        <rect :width="cellSize" :height="boardHeight" :fill="pattern" />
      </mask>
    </defs>
    <board-column
      v-for="col in cols"
      :key="col"
      :checkers="colCheckers(col)"
      :col="col"
      :color="'cadetblue'"
      :cell-size="cellSize"
      :checker-radius="checkerRadius"
      :board-height="boardHeight"
      :row-count="rowCount"
      :mask="mask"
      :status="status"
      @drop="drop"
      @land="land"
      />
  </svg>
</template>

<script>
import { cssUrl, range } from '@/utils';
import BoardColumn from './BoardColumn';

export default {
  components: {
    BoardColumn,
  },

  props: ['checkers', 'rowCount', 'colCount', 'status'],

  data() {
    return {
      patternId: 'cell-pattern',
      maskId: 'cell-mask',
      cellSize: 100,
    };
  },

  computed: {
    pattern() {
      return cssUrl(this.patternId);
    },
    mask() {
      return cssUrl(this.maskId);
    },

    rows() {
      return range(this.rowCount);
    },
    cols() {
      return range(this.colCount);
    },

    boardWidth() {
      return this.colCount * this.cellSize;
    },
    boardHeight() {
      return this.rowCount * this.cellSize;
    },
    checkerRadius() {
      return this.cellSize * 0.45;
    },
  },

  methods: {
    colCheckers(col) {
      return Object.values(this.checkers)
        .filter(c => c.col === col)
        .sort((a, b) => a.row - b.row);
    },
    drop(data) {
      this.$emit('drop', data);
    },
    land() {
      this.$emit('land');
    },
  },
};
</script>

<style>
.game-board {
  border: 5px cadetblue solid;
  margin: 0 auto;
}
.game-board {
  width: 80%;
  max-width: 420px;
}
</style>
