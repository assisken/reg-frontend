<template>
  <div/>
</template>

<script>
import utils from '@/utils/login'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AuthPage',
  data () {
    return {
      code: this.$route.query.code,
      state: this.$route.query.state
    }
  },
  computed: {
    ...mapState({
      token: state => state.token.value
    })
  },
  mounted () {
    if (this.code === undefined) this.goLogin()
    new Promise(resolve => this.doThings(resolve))
      .then(_ => this.$router.push({ name: 'InstructionPage' }))
      .catch(_ => this.goLogin())
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getToken: 'token/getToken'
    }),
    goLogin () {
      let url = utils.login()
      window.location.href = url
    },
    async doThings (resolve) {
      let code = this.code
      await this.getToken({ code })
      let token = this.token
      await this.getUser({ token })
      resolve()
    }
  }
}
</script>

<style lang="scss" scoped>
#app div {
  color: white;
}
</style>
