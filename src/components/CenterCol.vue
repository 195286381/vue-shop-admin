<template>
  <el-col :span="span" :offset="offset">
    <slot></slot>
  </el-col>
</template>

<script>
export default {
  props: {
    span: {
      type: Number,
      default: 0
    }
  },
  computed: {
    offset: function () {
      return (24 - this.span) / 2
    }
  }
}
</script>

<style>

</style>
