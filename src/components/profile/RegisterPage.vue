<template>
  <div>
    <h4>Продолжение регистрации</h4>
    <hr>
    <linux-user-form/>
  </div>
</template>

<script>
import LinuxUserForm from '@/components/forms/LinuxUserForm'

export default {
  name: 'RegisterPage',
  components: {
    LinuxUserForm
  }
}
</script>
