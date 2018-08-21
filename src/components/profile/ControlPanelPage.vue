<template>
  <div>
    <h4>Настройки</h4>
    <hr>
    <h5>Пароли</h5>
    <password-form/>
    <br>
    <h5>Базы данных</h5>
    <db-create-form/>
  </div>
</template>

<script>
import PasswordForm from '@/components/forms/PasswordForm'
import DbCreateForm from '@/components/forms/DbCreateForm'

export default {
  name: 'ControlPanelPage',
  components: {
    PasswordForm,
    DbCreateForm
  }
}
</script>

<style lang="scss" scoped>
</style>
