<template>
  <div/>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LogoutPage',
  mounted () {
    this.tokenLogout()
    this.userLogout()
    this.$router.push({ name: 'IndexPage' })
  },
  methods: {
    ...mapMutations({
      tokenLogout: 'token/logout',
      userLogout: 'user/logout'
    })
  }
}
</script>
