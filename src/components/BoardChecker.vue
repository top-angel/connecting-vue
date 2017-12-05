<template>
  <transition
    @enter="enter"
    :css="false">
    <circle
      :cx="centerX"
      :cy="centerY"
      :r="checkerRadius"
      :fill="adjustedColor"
      :fill-opacity="opacity"
      />
  </transition>
</template>

<script>
import { TweenMax, Bounce } from 'gsap';

import { OVER } from '@/utils';

export default {
  props: ['checker', 'cellSize', 'rowCount', 'checkerRadius', 'status'],

  data() {
    return {
      colorHexes: {
        red: '#FC7E69',
        black: '#254689',
        green: 'green',
      },
      minDuration: 0.2,
      coefficient: 0.4,
    };
  },

  computed: {
    row() {
      return this.checker.row;
    },
    col() {
      return this.checker.col;
    },
    color() {
      return this.checker.color;
    },
    isWinner() {
      return this.checker.isWinner;
    },

    adjustedColor() {
      return this.colorHexes[this.color];
    },

    opacity() {
      return this.status === OVER && !this.isWinner ? 0.25 : 1.0;
    },

    centerX() {
      return this.cellSize / 2;
    },

    centerY() {
      return this.cellSize / 2 + this.cellSize * (this.rowCount - 1 - this.row);
    },

    fromY() {
      return -1 * (this.centerY + this.cellSize);
    },

    destY() {
      return 0;
    },

    percentage() {
      return (this.rowCount - this.row) / this.rowCount;
    },
  },

  methods: {
    duration() {
      const { minDuration, coefficient, rowCount, row } = this;
      const percentage = (rowCount - row) / rowCount;
      return minDuration + coefficient * percentage;
    },

    enter(el, done) {
      const fromY = -1 * (this.centerY + this.cellSize);
      const destY = 0;

      const fromParams = {
        y: fromY,
      };
      const destParams = {
        y: destY,
        ease: Bounce.easeOut,
        onComplete: () => {
          this.$emit('land');
          done();
        },
      };

      return TweenMax.fromTo(el, this.duration(), fromParams, destParams);
    },
  },
};
</script>
