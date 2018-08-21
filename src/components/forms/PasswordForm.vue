<template>
  <form autocomplete="off" @submit="checkPasswords" action="/api/profile">
    <input type="hidden" name="_method" value="PUT">
    <label>Пароль от аккаунта</label>
    <div class="input-group mb-3">
      <input class="form-control" v-model="linux_password" name="linux_password" type="password" placeholder="Введите новый пароль"/>
      <input class="form-control" v-model="linux_password_cnf" name="linux_password_cnf" type="password" placeholder="Подтвердите пароль"/>
    </div>
    <label>Пароль от баз данных:</label>
    <div class="input-group mb-3">
      <input class="form-control" v-model="db_password" name="db_password" type="password" placeholder="Введите новый пароль"/>
      <input class="form-control" v-model="db_password_cnf" name="db_password_cnf" type="password" placeholder="Подтвердите пароль"/>
    </div>
    <input class="btn btn-primary" type="submit" value="Сохранить"/>
  </form>
</template>

<script>
import { bus } from '@/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'PasswordForm',
  data () {
    return {
      linux_password: '',
      linux_password_cnf: '',
      db_password: '',
      db_password_cnf: ''
    }
  },
  computed: {
    ...mapState({
      token: state => state.token.value
    })
  },
  methods: {
    checkPasswords (e) {
      e.preventDefault()
      var errors = []

      if (this.linux_password !== this.linux_password_cnf) { errors.push('Пароли аккаунта не совпадают.') }
      if (this.db_password !== this.db_password_cnf) { errors.push('Пароли от баз данных не совпадают.') }
      if (errors.length > 0) {
        bus.$emit('add-notification', { type: 'danger', text: errors })
        return
      }
      if (this.linux_password === '' && this.db_password === '') { return }

      let form = new FormData()
      if (this.linux_password) form.append('linux_password', this.linux_password)
      if (this.db_password) form.append('db_password', this.db_password)
      let token = this.token
      this.$http.patch('/api/profile/', form, { headers: { Authorization: 'Token ' + token, 'Content-Type': 'multipart/form-data' } })
        .then(_ => bus.$emit('add-notification', { type: 'success', text: ['Пароль успешно установлен.'] }))
        .catch(_ => bus.$emit('add-notification', { type: 'success', text: ['Во время выполнения произошла ошибка.', 'Попробуйте позже.'] }))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
