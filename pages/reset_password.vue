<template>
  <div id="resetPassword">
    <h1>Reset Password</h1>
    <div>
      <label for="password">password</label>
      <input id="password" v-model="password" type="password" />
      <br />
      <label for="passwordConfirmation">password confirmation</label>
      <input id="passwordConfirmation" v-model="passwordConfirmation" type="password" />
      <br />
      <button @click="resetPassword">Reset Password</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    resetPassword() {
      const query = this.$route.query
      this.$axios
        .put(
          '/api/v1/auth/password',
          {
            password: this.password,
            password_confirmation: this.passwordConfirmation
          },
          {
            headers: {
              uid: query.uid,
              'access-token': query['access-token'],
              client: query.client
            }
          }
        )
        .then(res => {
          debugger
          this.$router.push('/login')
        })
        .catch(e => {
          // ここにパスワードリセットに失敗した時の処理
        })
    }
  }
}
</script>
<style>
#resetPassword {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
