<template>
  <div>
    <h4>Панель управления</h4>
    <hr>
    <h5>Аккаунт на сервере</h5>
    <form class="form-inline" action="/api/linux-pass-reset/' %}" method="post">
      <div class="form-group">
        <input placeholder="Введите новый пароль">
        <input placeholder="Подтвердите пароль">
        <input type="submit" value="Сохранить" class="btn btn-primary">
      </div>
    </form>
    <br>
    <h5>Базы данных</h5>
    <p>Логин: {{ user.linux_user }}</p>
    <form class="form-inline" action="/api/db_password" method="post">
      <div class="form-group">
        <input v-model="user.db_password" placeholder="Введите новый пароль">
        <input placeholder="Подтвердите пароль">
        <!-- <input type="submit" value="Сохранить" class="btn btn-primary"> -->
      </div>
    </form>
      <button @click="addNotification" class="btn btn-primary">Сохранить</button>
  </div>
</template>

<script>
import { bus } from '@/eventBus'

export default {
  name: 'ControlPanelPage',
  data () {
    return {
      user: JSON.parse(localStorage.user)
    }
  },
  mounted () {
  },
  methods: {
    addNotification () {
      bus.$emit('add-notification', { type: 'danger', text: 'Hello world!' })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-inline div input {
  padding-right: 0.7rem;
}
</style>
