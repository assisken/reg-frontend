<template>
  <div class="hor-center page-width bg-light row">
    <div v-if="!user.email_verified" class="alert alert-danger email-alert">
      <p>Необходимо подтвердить почту на
      <a href="https://confid.ru">confid.ru</a>.
      В противном случае некоторый функционал будет недоступен.</p>
      <p>Если вы подтвердили вашу почту, но продолжаете видеть это сообщение — нажмите на кнопку "Выход" и войдите снова.</p>
    </div>
    <div class="text-center col-12 col-md-3 col-xl-2 bd-sidebar mb-2">
      <img class="d-none d-md-block rounded-circle img-thumbnail mx-auto" :src="'https://confid.ru/data/avatars/' + user.picture" />
      <nav>
        <div class="list-group btn-group-vertical mt-3 mb-3">
          <router-link
          v-for="link in links"
          @click.native="selected = link.id"
          :class="{ active: link.id === selected }"
          :key="link.id"
          :to="link.to"
          class="btn btn-outline-primary">
            {{ link.content }}
          </router-link>
        </div>
        <div class="list-group btn-group-vertical">
          <router-link :to="{ name: 'LogoutPage' }" class="btn btn-outline-danger">Выход</router-link>
        </div>
      </nav>
    </div>
    <main class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
      <transition name="fade-footer" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
        <router-view v-if="user.email_verified"/>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfilePage',
  data () {
    return {
      selected: 1,
      prevHeight: 0,
      links: [
        { id: 1, name: 'instruction', content: 'Инструкция', to: { name: 'InstructionPage' } },
        { id: 2, name: 'control_panel', content: 'Настройки', to: { name: 'ControlPanelPage' } }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
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
