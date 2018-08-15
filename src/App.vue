<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <notification-container ref="notify"/>
  </div>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer'

export default {
  name: 'App',
  components: {
    NotificationContainer
  }
}
</script>

<style lang="scss">
@import 'assets/style/app';
</style>
