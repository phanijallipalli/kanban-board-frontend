<template>
    <div class="login-main-div">
        <form @submit.prevent="handleSubmit">
            <h1>Edit List</h1>
            <p class="error">{{ error_message }}</p>
            <div class="mb-3">
                <label for="listName" class="form-label">Listname</label>
                <input type="text" required class="form-control" id="exampleInputListname" v-model="listname">
            </div>
            <button type="submit" class="btn btn-success">Editlist</button>
        </form>
    </div>
</template>
  
  
<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: "EditList",
    data() {
        return {
            url: window.location.pathname,
            listname: "",
            listid: "",
            token: "",
            error_message : ""
        }
    },
    mounted() {
        this.token = sessionStorage.getItem("login_token");
        if (this.token) {
            const decoded_token = jwt_decode(this.token);
            if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                sessionStorage.removeItem("login_token");
                this.$router.push("/login")
            }
            else {
                let listname = this.url.split("/")[1]
                this.listname = listname
                let listnames = JSON.parse(localStorage.getItem("listdata"))
                for (let i in listnames) {
                    if (listnames[i][0] === listname) {
                        this.listid = listnames[i][1]
                    }
                }
            }
        }
        else {
            this.$router.push("/login")
        }
    },
    methods: {
        async handleSubmit() {
            const response = await axios.put('list', {
                token: this.token,
                list_id: this.listid,
                list_name: this.listname
            }).catch(err => { return err });

            const message = response.data?.message ?? response.message
            if (message === "List edited success") {
                this.$router.push("/")
            }
            else { this.error_message = message }
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