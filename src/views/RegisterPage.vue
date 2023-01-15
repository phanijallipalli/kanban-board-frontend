<template>
  <div class="login-main-div">
  <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <p class="error">{{ error_message }}</p>
    <div class="mb-3">
      <label for="userName" class="form-label">User Name</label>
      <input type="text" required class="form-control" id="exampleInputUserName" v-model="username">
    </div>
    <div class="mb-3">
      <label for="emailPassword2" class="form-label">What's your Favorite Food ?</label>
      <input type="text" required class="form-control" id="exampleInputfood2" v-model="food">
    </div>
    <div class="mb-3">
      <label for="emailPassword1" class="form-label">Password</label>
      <input type="password" required class="form-control" id="exampleInputPassword1" v-model="password">
    </div>
    <div class="mb-3">
      <label for="emailPassword2" class="form-label">Confirm Password</label>
      <input type="text" required class="form-control" id="exampleInputPassword2" v-model="confirm_password">
    </div>
    <button type="submit" class="btn btn-success">Register</button>
    <p>Already have an account Login ? <router-link to="/login" class="link">click here</router-link></p>
  </form>
</div>
</template>
  
  
<script>
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      error_message: "",
      food : ""
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirm_password ) {
        this.error_message = "passwords do not match"
      }
      else if (this.password === "" || this.confirm_password === "" ) {
        this.error_message = "password cannot be empty"
      }
      else {
        const response = await axios.post('signup',
          {
            username: this.username,
            password: this.password,
            favorite_food: this.food
          }).catch(err => { return err });

        const message = response.data?.message ?? response.message

        if (message !== "user created success") {
          this.error_message = message
        }
        else { this.$router.push("/login") }

      }
    }
  }
}
</script>
  
<style scoped>
p {
  font-size: smaller;
  margin: auto
}

h1 {
  text-align: center;
}

.link {
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