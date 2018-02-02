<template>
  <span class="icon" v-html="html" />
</template>

<script>
export default {
  props: {
    path: { type: String, required: true },
  },

  data() {
    return {
      html: '',
    };
  },
  created() {
    import(`@/assets/${this.path}`).then(html => this.html = html);
  },
};
</script>
