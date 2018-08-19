<template>
  <div>
    <form @submit="createDb">
      <input v-model="newDbName" placeholder="Введите имя новой бд...">
      <input type="submit" value="Добавить" class="btn btn-primary">
    </form>
    <div class="container">
      <transition-group name="fade" mode="out-in">
        <div v-for="(db, index) in dbs" :key="db.id" class="row">
          <span class="col align-middle">{{ db.pname }}</span>
          <button @click="removeDb(db, index)" class="btn btn-danger col">Удалить</button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { bus } from '@/eventBus'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DbCreateForm',
  data () {
    return {
      dbs: [],
      newDbName: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
    ...mapState({
      token: state => state.token.value
    })
  },
  created () {
    new Promise((resolve, reject) => this.getDbs(resolve, reject))
      .then(res => { this.dbs = res })
  },
  methods: {
    async getDbs (resolve, reject) {
      let token = this.token
      this.$http.get('/api/profile/db/', { headers: { Authorization: 'Token ' + token } })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    },
    createDb (e) {
      e.preventDefault()
      let token = this.token
      let data = JSON.stringify({ name: this.newDbName })
      this.$http.post('/api/profile/db/', data, { headers: { Authorization: 'Token ' + token, 'Content-Type': 'application/json' } })
        .then(res => {
          this.dbs.push(res.data)
          bus.$emit('add-notification', { type: 'success', text: ['База данных ' + this.newDbName + ' успешно создана.'] })
          this.newDbName = ''
        })
        .catch(err => {
          let errors = []
          console.log(err.response.headers['content-type'])
          if (err.response.headers['content-type'] === 'application/json') {
            for (let key of Object.keys(err.response.data)) {
              errors.push(err.response.data[key][0])
            }
          } else {
            errors.push('Произошла непредвиденная ошибка.')
            errors.push('¯\\_(ツ)_/¯')
          }
          bus.$emit('add-notification', { type: 'danger', text: errors })
        })
    },
    removeDb (db, index) {
      let token = this.token
      this.$http.delete('/api/profile/db/' + db.id + '/', { headers: { Authorization: 'Token ' + token, 'Content-Type': 'application/json' } })
        .then(_ => {
          this.dbs.splice(index, 1)
          bus.$emit('add-notification', { type: 'success', text: ['База данных ' + db.pname + ' успешно удалена.'] })
        })
        .catch(_ => {
          bus.$emit('add-notification', { type: 'danger', text: ['Произошла во время удаления базы данных.', 'Попробуйте перезагрузить страницу...'] })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
div.container {
  margin: 0;
  max-width: 20rem;

  span.col {
    max-width: 13rem;
    vertical-align: middle;
  }

  button.col {
    max-width: 6rem;
  }

  .row {
    padding: 0.2rem 0;
    margin-top: 0.2rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
