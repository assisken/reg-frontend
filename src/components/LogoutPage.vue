<template>
  <div/>
</template>

<script>
export default {
  name: 'LogoutPage',
  mounted () {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.$router.push({ name: 'IndexPage' })
  }
}
</script>
