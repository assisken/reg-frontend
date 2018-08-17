<template>
  <main class="hor-center page-width bg-light">
    <div class="profile row no-gutters text-dark">
      <div class="text-center profile-nav">
        <img class="rounded-circle img-thumbnail" :src="'https://confid.ru/data/avatars/' +user.picture" />
        <div class="list-group">
          <router-link
          v-for="link in links"
          @click.native="selected = link.id"
          :class="{ active: link.id === selected }"
          :key="link.id"
          :to="link.to"
          class="list-group-item">
            {{ link.content }}
          </router-link>
        </div>
        <div class="list-group">
          <router-link :to="{ name: 'LogoutPage' }" class="list-group-item">Выход</router-link>
        </div>
      </div>
        <transition name="fade-footer" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
          <router-view class="profile-content col-md-9"/>
        </transition>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      user: JSON.parse(localStorage.user),
      selected: 1,
      prevHeight: 0,
      links: [
        { id: 1, name: 'instruction', content: 'Инструкция', to: { name: 'InstructionPage' } },
        { id: 2, name: 'control_panel', content: 'Настройки', to: { name: 'ControlPanelPage' } }
      ]
    }
  },
  beforeMount () {
    this.activateNav()
  },
  methods: {
    activateNav () {
      let current = this.$route.name
      var link
      for (var i = 0; i < this.links.length; i++) {
        link = this.links[i]
        if (link.to.name === current) {
          this.selected = link.id
          break
        }
      }
    },

    // Animation
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)
      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/profile';
</style>
