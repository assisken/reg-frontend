<template>
  <transition name="slide-fade">
    <div v-if="visible" class="alert" :class="[type]" @click="destroy">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    id: { default: 1, type: Number },
    text: { default: '', type: String },
    _type: { default: 'success', type: String },
    visible: { default: true, type: Boolean }
  },
  methods: {
    destroy () {
      this.visible = false
    }
  },
  computed: {
    type: {
      get () {
        return 'alert-' + this._type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
