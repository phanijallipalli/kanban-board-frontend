<template>
    <div class="login-main-div">
        <form @submit.prevent="handleSubmit">
            <h1>Add List</h1>
            <p class="error">{{ error_message }}</p>
            <div class="mb-3">
                <label for="listName" class="form-label">Listname</label>
                <input type="text" required class="form-control" id="exampleInputListname" v-model="listname">
            </div>
            <button type="submit" class="btn btn-success">Addlist</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: "AddList",
    data() {
        return {
            token: "",
            listname: "",
            error_message: "",
        }
    },
    methods: {
        async handleSubmit() {
            this.token = sessionStorage.getItem("login_token");
            if (this.token) {
                const decoded_token = jwt_decode(this.token);
                if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                    sessionStorage.removeItem("login_token");
                    this.$router.push("/login")
                }
                else {
                    const response = await axios.post('addlist', {
                        token: this.token,
                        addlist: this.listname
                    }).catch(err => { return err });

                    const message = response.data?.message ?? response.message
                    if (message === "list created success") {
                        this.$router.push("/")
                    }
                    else { this.error_message = message }

                }
            }
            else {
                this.$router.push("/login")
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