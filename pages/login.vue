<template>
  <div id="app">
    <h3>ログイン画面</h3>
    <div v-if="client === ''">
      <div>
        <h1>SignUp</h1>
        <label for="name">name</label>
        <input id="name" v-model="name" type="text" />
        <br />
        <label for="email">email</label>
        <input id="email" v-model="email" type="email" />
        <br />
        <label for="password">password</label>
        <input id="password" v-model="password" type="password" />
        <br />
        <button @click="signup">新規登録ボタン</button>
      </div>
      <div>
        <h1>SignIn</h1>
        <label for="email">email</label>
        <input id="email" v-model="email" type="email" />
        <br />
        <label for="password">password</label>
        <input id="password" v-model="password" type="password" />
        <br />
        <button @click="signin">SignInボタン</button>
      </div>
      <div>
        <p>ユーザー情報がないか、ログインしてない</p>
      </div>
    </div>
    <div v-else>
      <h1><button @click="signout">SignOut</button></h1>
      <div>
        <p>
          ログイン中<span>{{ this.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      uid: '',
      access_token: '',
      client: ''
    }
  },
  methods: {
    signup() {
      this.$axios
        .post('/api/v1/auth', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('access-token', res.headers['access-token'])
          localStorage.setItem('client', res.headers.client)
          localStorage.setItem('uid', res.headers.uid)
          this.access_token = res.headers['access-token']
          this.client = res.headers.client
          this.uid = res.headers.uid
        })
    },
    signin() {
      console.log(this.email)
      console.log(this.password)
      this.$axios
        .post('/api/v1/auth/sign_in', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('access-token', res.headers['access-token'])
          localStorage.setItem('client', res.headers.client)
          localStorage.setItem('uid', res.headers.uid)
          this.access_token = res.headers['access-token']
          this.client = res.headers.client
          this.uid = res.headers.uid
        })
    },
    signout() {
      console.log(this.uid)
      console.log(this.access_token)
      console.log(this.client)
      this.$axios
        .delete('/api/v1/auth/sign_out', {
          test: { test: 'test' },
          headers: {
            uid: this.uid,
            'access-token': this.access_token,
            client: this.client
          }
        })
        .then(res => {
          this.access_token = ''
          this.client = ''
          this.uid = ''
          localStorage.removeItem('uid')
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
        })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
