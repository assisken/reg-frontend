<template>
  <form @submit="register" class="mb-2 col col-sm-8">
    <input type="hidden" name="_method" value="PATCH">
    <div class="input-group mb-3">
      <input v-model="linux_user" class="form-control" type="text" placeholder="Имя пользователя на сервере, например ipetr">
    </div>
    <div class="input-group mb-3">
      <input v-model="password" class="form-control" type="password" placeholder="Пароль">
      <input v-model="password_cnf" class="form-control" type="password" placeholder="Подтвердите пароль">
    </div>
    <input class="btn btn-primary" type="submit" value="Зарегестрироваться">
  </form>
</template>

<script>
import { bus } from '@/eventBus'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LinuxUserForm',
  data () {
    return {
      linux_user: '',
      password: '',
      password_cnf: ''
    }
  },
  computed: {
    ...mapState({
      token: state => state.token.value
    })
  },
  methods: {
    register (e) {
      e.preventDefault()
      if (this.password !== this.password_cnf) {
        bus.$emit('add-notification', { type: 'danger', text: ['Пароли не совпадают.'] })
        return
      }
      let data = JSON.stringify({ linux_user: this.linux_user, linux_password: this.password })
      this.$http.patch('/api/profile/', data, { headers: { Authorization: 'Token ' + this.token, 'Content-Type': 'application/json' } })
        .then(resp => {
          let data = resp.data
          this.update({ data })
        })
        .catch(_ => {
          bus.$emit('add-notification', { type: 'danger', text: ['Во время выполнения произошла непредвиденная ошибка.', 'Попробуйте позже.'] })
        })
    },
    ...mapMutations({
      update: 'user/merge'
    })
  }
}
</script>
