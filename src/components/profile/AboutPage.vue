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
      { name: 'ФИО', value: this.user.family_name + ' ' + this.user.given_name + ' ' + this.user.middle_name },
      { name: 'Дата рождения', value: this.user.birthdate },
      { name: 'Email', value: this.user.email },
      { name: 'Домен', value: this.user.linux_user + '.mati.su' }
    ]
  }
}
</script>
