<template>
  <div class="box">
    <div v-if="hasHeader" class="box-header with-border">
      <span class="box-title">{{title}}</span>
      <div class="box-tools pull-right">
        <slot name="header-tools"></slot>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <slot name="body"></slot>
      <slot></slot>
    </div>
    <!-- /.box-body -->
    <div v-if="hasFooter" class="box-footer clearfix">
      <slot name="footer"></slot>
    </div>
    <!-- /.box-footer -->
    <div v-show="loading" class="overlay">
      <v-icon name="spinner" scale="4" class="fa" spin style="opacity:0.4"></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasFooter: {
      type: Boolean,
      default: false
    },
    hasHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.box .box-header .box-title {
  font-size: 16px;
}
</style>


