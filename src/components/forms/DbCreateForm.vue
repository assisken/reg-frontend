<template>
  <div>
    <form @submit="createDb" class="mb-2 col col-sm-8">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">{{ user.linux_user }}_</div>
        </div>
        <input v-model="newDbName" class="form-control" placeholder="Имя новой бд">
        <div class="input-group-append">
          <input type="submit" value="Добавить" class="btn btn-primary">
        </div>
      </div>
    </form>
    <div class="col col-sm-8">
      <ul class="list-group">
        <transition-group name="fade" mode="out-in">
          <li v-for="(db, index) in dbs" :key="db.id" class="list-group-item">
            {{ db.pname }}
            <div class="button-group float-right" style="margin-top: -7px;">
              <button @click="removeDb(db, index)" class="btn btn-md btn-danger" ><font-awesome-icon icon="times"/></button>
            </div>
          </li>
        </transition-group>
      </ul>
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
</style>
