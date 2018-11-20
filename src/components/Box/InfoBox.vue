<template>
  <div class="info-box clickable" v-on:click="$emit('click')">
    <span class="info-box-icon"><v-icon scale="3" :name="icon"></v-icon></span>
    <div class="info-box-content">
      <span class="info-box-text">{{title}}</span>
      <span class="info-box-number">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
