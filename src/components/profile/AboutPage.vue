<template>
  <div>
    <h4>О себе</h4>
    <hr>
    <ul>
      <li v-for="item in items" :key="item.name">
        <b>{{ item.name }}:</b> {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data () {
    return {
      user: JSON.parse(localStorage.user),
      items: []
    }
  },
  created () {
    this.items = [
      { name: 'Email', value: this.user.email }
    ]
  }
}
</script>

<style lang="sass" scoped>

</style>
