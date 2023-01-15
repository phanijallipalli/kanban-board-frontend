<template>
    <div v-if="this.list_data === null">
        <div class="login-main-div">
        <form @submit.prevent="handleSubmit">
            <h1>Add Email To Get Remainders</h1>
            <p class="error">{{ error_message }}</p>
            <div class="mb-3">
                <label for="listName" class="form-label">email</label>
                <input type="email" required class="form-control" id="exampleInputListname" v-model="email">
            </div>
            <button type="submit" class="btn btn-success">AddEmail</button>
        </form>
    </div>

    </div>
    <div v-if="this.list_data !== null">
    <h3>Remainders already set. Do u want to unset the remainder ? </h3></div>
    <button type="submit" class="btn btn-success" @click="handleUnset">Unset Remainder</button>
</template>
  
  
<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: "GetRemainders",
    data() {
        return {
            token: "",
            list_data: "",
            error_message: "",
            email: ""
        }
    },
    methods: {
        async getlist() {
            this.token = sessionStorage.getItem("login_token");
            if (this.token) {
                const decoded_token = jwt_decode(this.token);
                if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                    sessionStorage.removeItem("login_token");
                    this.$router.push("/login")
                }
                else {
                    const response = await axios.get('remainders', {
                        params: {
                            token: this.token
                        }
                    });
                    this.list_data = response.data.message
                }
            }
            else {
                this.$router.push("/login")
            }
        },
        async handleSubmit(){
            this.token = sessionStorage.getItem("login_token");
            if (this.token) {
                const decoded_token = jwt_decode(this.token);
                if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                    sessionStorage.removeItem("login_token");
                    this.$router.push("/login")
                }
                else {
                    const response = await axios.post('remainders', {
                            token: this.token,
                            email: this.email
                    });
                    this.list_data = response.data.message
                    if(this.list_data === "email created success"){
                        this.$router.push("/")
                    }
                }
            }
            else {
                this.$router.push("/login")
            }
        },
        async handleUnset(){
            this.token = sessionStorage.getItem("login_token");
            if (this.token) {
                const decoded_token = jwt_decode(this.token);
                if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                    sessionStorage.removeItem("login_token");
                    this.$router.push("/login")
                }
                else {
                    const response = await axios.put('remainders', {
                                token: this.token,
                        });
                        console.log(response.data.message)
                        this.$router.push("/")
                }
            }
            else {
                this.$router.push("/login")
            }
        }
    },
    beforeMount() {
        this.getlist()
    }
}
</script>
  
<style scoped>
.login-main-div {
    margin: 6% 25% 6% 25%;
    padding: 2% 10% 2% 10%;
    border-radius: 2%;
    background-color: whitesmoke;
}

</style>