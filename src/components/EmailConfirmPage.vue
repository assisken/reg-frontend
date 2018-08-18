<template>
  <div>
    <p>Пожалуйста, подтвердите вашу почту на <a href="https://confid.ru">confid.ru</a>.</p>
    <p>В противном случае вы будете довольствоваться этой страницей.</p>
    <button @click="checkEmail" class="btn btn-primary">Торжественно клянусь, что почту я подтвердил!</button>
  </div>
</template>

<script>
export default {
  name: 'EmailComfirmPage'
}
</script>
