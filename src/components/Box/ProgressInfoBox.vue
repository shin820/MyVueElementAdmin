<template>
  <div class="info-box clickable" v-on:click="$emit('click')">
    <span class="info-box-icon"><v-icon scale="3" :name="icon"></v-icon></span>
    <div class="info-box-content">
      <span class="info-box-text">{{title}}</span>
      <span class="info-box-number">
        <slot name="text"></slot>
      </span>
      <div class="progress">
        <div class="progress-bar" :style="{width: ratio+'%'}"></div>
      </div>
      <span class="progress-description">
        <slot name="desc">
        </slot>
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
    },
    ratio: {
      type: Number,
      default: 0
    }
  }
}
</script>

