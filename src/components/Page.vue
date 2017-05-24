<template>
  <div :class="cssClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: new Date().getTime()
    }
  },
  data () {
    return {
      title: 'page'
    }
  },
  computed: {
    cssClass () {
      let class = {}
      class[`page-${this.name}`] = true
      return class
    }
  }
}
</script>

<style lang="scss">
  
</style>

