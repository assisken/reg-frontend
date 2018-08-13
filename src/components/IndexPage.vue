<template>
  <div>
    <img class="logo mb-4 mx-auto d-block" src="@/assets/img/logo_smiap.png" alt="Smiap Logo" >
    <div class="hor-center page-width">
      <div class="form">
        <div class="btn-group row" style="margin-left: auto;">
          <!-- <router-link :to="{ name: 'LoginPage' }" class="btn btn-primary btn-light text-dark">Войти</router-link> -->
          <button @click="login" class="btn btn-primary btn-light text-dark">Войти</button>
          <a href="https://confid.ru/registration" target="_blank" class="btn btn-primary btn-light text-dark">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils/login'

export default {
  name: 'IndexPage',
  data () {
    return {
      user: localStorage.user
    }
  },
  methods: {
    login () {
      if (this.user) {
        this.$router.push({ name: 'InstructionPage' })
      } else {
        let url = utils.login()
        window.location.href = url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin-top: 25px;
  height: auto;
  width: 50vw;
}

.alert {
  width: auto;
}
</style>
