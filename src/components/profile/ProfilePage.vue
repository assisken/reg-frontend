<template>
  <main class="hor-center page-width bg-light">
    <div class="profile row no-gutters text-dark">
      <div class="text-center profile-nav">
        <img class="rounded-circle img-thumbnail" :src="'https://confid.ru/data/avatars/' +user.picture" />
        <div class="list-group">
          <router-link v-for="link in links" @click.native="selected = link.id" :class="{ active: link.id === selected }" :key="link.id" :to="link.to" class="list-group-item">{{ link.content }}</router-link>
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
      str: localStorage.user,
      user: JSON.parse(localStorage.user),
      selected: 1,
      prevHeight: 0,
      links: [
        { id: 1, name: 'instruction', content: 'Инструкция', to: { name: 'InstructionPage' } },
        { id: 2, name: 'about', content: 'О себе', to: { name: 'AboutPage' } }
      ]
    }
  },
  methods: {
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
.profile-nav {
  flex: 0 0 20%;
  max-width: 20%;
}
.profile-content {
  .key,
  .value {
    display: inline;
  }
  padding: 1rem 0;
}
.profile {
  div:first-child {
    padding-right: 20px;
  }
  img {
    height: auto;
    width: 160px;
    margin-bottom: 0.5rem;
  }
  .list-group {
    margin: 0.6rem 0.25rem;
  }
  .list-group-item {
    padding: 0.5rem;
  }
  pre {
    display: inline;
    margin: 0;
  }
}
</style>
