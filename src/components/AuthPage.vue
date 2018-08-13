<template>
  <div/>
</template>

<script>
import utils from '@/utils/login'

export default {
  name: 'AuthPage',
  data () {
    return {
      code: this.$route.query.code,
      state: this.$route.query.state,
      token: null
    }
  },
  mounted () {
    new Promise((resolve, reject) => this.getUser(resolve, reject))
      .then(res => {
        console.log(res)
        localStorage.user = JSON.stringify(res)
        this.$router.push({ name: 'InstructionPage' })
      })
      .catch(() => this.goLogin())
  },
  methods: {
    goLogin () {
      let url = utils.login()
      window.location.href = url
    },
    async getToken () {
      let resp = await this.$http.post('/api/login/', 'code=' + this.code)
        .catch(() => this.goLogin())
      localStorage.token = resp.data.token
      return resp.data.token
    },
    async getUser (resolve, reject) {
      let token = await this.getToken()
      await this.$http.get('/api/profile/', { headers: { Authorization: 'Token ' + token } })
        .then(resp => resolve(resp.data))
        .catch(err => reject(err))
    }
  }
}
</script>

<style lang="scss" scoped>
#app div {
  color: white;
}
</style>
