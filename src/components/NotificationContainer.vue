<template>
  <div id="notification-container" ref="container"/>
</template>

<script>
import Vue from 'vue'
import Notification from './Notification'
import { bus } from '@/eventBus'

export default {
  name: 'NotificationContainer',
  components: {
    Notification
  },
  created () {
    bus.$on('add-notification', text => this.addNotification(text))
  },
  methods: {
    addNotification ({ type, text }) {
      let ComponentClass = Vue.extend(Notification)
      let notification = new ComponentClass({
        propsData: {
          text: text,
          _type: type,
          visible: false
        }
      })
      notification.$mount()
      let firstChild = this.$refs.container.firstChild
      this.$refs.container.insertBefore(notification.$el, firstChild)
      notification.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
#notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
