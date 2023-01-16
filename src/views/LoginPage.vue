<template>
  <div class="login-main-div">
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>
      <p class="error">{{ error_message }}</p>
      <div class="mb-3">
        <label for="userName" class="form-label">User Name</label>
        <input type="text" required class="form-control" id="exampleInputUserName" v-model="username">
      </div>
      <div class="mb-3">
        <label for="emailPassword1" class="form-label">Password</label>
        <input type="password" required class="form-control" id="exampleInputPassword1" v-model="password">
      </div>
      <button type="submit" class="btn btn-success">Login</button>
      <p>Doesn't Remember your password ? <router-link to="/forgotpassword" class="link">click here</router-link></p>
      <p>Doesn't have an Account Register ? <router-link to="/register" class="link">click here</router-link></p>
    </form>
  </div>
</template>
  
  
  <script>
    import axios from "axios";
  
  export default{
      name : "LoginPage",
      data() {
    return {
      username: "",
      password: "",
      error_message: "",
      data_string : ""
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password === "") {
        this.error_message = "password cannot be empty"
      }
      else {
        const response = await axios.post('login',
          {
            username: this.username,
            password: this.password
          }).catch(err => { return err });
        
        const message = response.data?.message ?? response.message
        if (message === "login success") {
          sessionStorage.setItem("login_token", response.data.token);
          let web_hookmessage = "Hello New User Created " + this.username
          this.$router.push("/")
        }
        else { this.error_message = message }
      }
    }
  }
  }
  </script>
  
  <style scoped>
  p{
    font-size: smaller;
    margin :auto
  }

  h1{
    text-align: center;
  }

  .link{
      color: green;
      text-decoration: none;
  }
  .error {
  color: red;
  text-align: center;
}

.login-main-div {
  margin: 6% 25% 6% 25%;
  padding: 2% 10% 2% 10%;
  border-radius: 2%;
  background-color: whitesmoke;
}
  </style>
