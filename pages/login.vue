<template>
  <div id="login">
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
        <v-btn elevation="2" small color="primary" @click="signup">Sign Up</v-btn>
      </div>
      <div>
        <h1>SignIn</h1>
        <label for="email">email</label>
        <input id="email" v-model="email" type="email" />
        <br />
        <label for="password">password</label>
        <input id="password" v-model="password" type="password" />
        <br />
        <v-btn elevation="2" small color="primary" @click="signin">Sign In</v-btn>
      </div>
      <div>
        <h1>Forgot Password?</h1>
        <label for="email">email</label>
        <input id="email" v-model="email" type="email" />
        <br />
        <v-btn elevation="2" small color="error" @click="forgotPassword">Reset Password</v-btn>
      </div>
      <div>
        <p>please create a new account or sign in with your account's email and password</p>
      </div>
    </div>
    <div v-else>
      <p>
        ログイン中<span>{{ this.name }}</span>
      </p>
      <h1>Sign Out</h1>
      <v-btn elevation="2" small color="primary" @click="signout">Sign Out</v-btn>
    </div>
  </div>
</template>

<script>
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
      this.$axios
        .delete('/api/v1/auth/sign_out', {
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
    },
    forgotPassword() {
      const baseUrl = process.env.FRONT_BASE_URL
      console.log(`baseUrl: ${baseUrl}`)
      this.$axios
        .$post('/api/v1/auth/password', {
          email: this.email,
          redirect_url: `${baseUrl}/reset_password`
        })
        .then(res => {
          console.log(`Password reset mail has been sent to ${this.email}`)
          console.log({ res })
        })
        .catch(e => {
          console.log(`Failed to send password reset mail to ${this.email}`)
          console.log({ e })
        })
    }
  }
}
</script>
<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
