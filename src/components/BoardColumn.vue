<template>
  <svg :x="col * cellSize"
    y="0">
    <g @click="drop(col)"
     class="column">
      <board-checker
        v-for="checker in checkers"
        :key="key(checker)"
        :checker="checker"
        :cellSize="cellSize"
        :rowCount="rowCount"
        :checkerRadius="checkerRadius"
        :status="status"
        @land="land"
        />
      <rect
        :class="status"
        :key="col"
        :col="col"
        :width="cellSize"
        :height="boardHeight"
        :fill="color"
        :fill-opacity="opacity"
        :mask="mask"
        />
    </g>
  </svg>
</template>

<script>
import { OVER } from '@/constants';
import BoardChecker from './BoardChecker';

export default {
  components: {
    BoardChecker,
  },

  props: [
    'checkers',
    'col',
    'color',
    'cellSize',
    'boardHeight',
    'checkerRadius',
    'rowCount',
    'mask',
    'status',
  ],

  computed: {
    // Find the current max occupied row and add 1
    nextOpenRow() {
      return Math.max(...this.checkers.map(c => c.row).concat(-1)) + 1;
    },

    opacity() {
      return this.status === OVER ? 0.2 : 1.0;
    },
  },

  methods: {
    key({ row, col }) {
      return `${row}${col}`;
    },

    land() {
      this.$emit('land');
    },

    drop(col) {
      const row = this.nextOpenRow;

      if (row < this.rowCount) {
        this.$emit('drop', { row, col });
      } else {
        // console.log('cannot drop', { row, col });
      }
    },
  },
};
</script>
<style>
.column {
  cursor: pointer;
}

.column rect.play:hover {
  fill-opacity: 0.75;
}
</style>
