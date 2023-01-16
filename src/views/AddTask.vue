<template>
    <div class="login-main-div">
        <form @submit.prevent="handleSubmit">
            <h1>Add Task</h1>
            <p class="error">{{ error_message }}</p>
            <div class="mb-3">
                <label for="Task-title" class="form-label">Task-Title</label>
                <input type="text" required class="form-control" id="exampleInputTask-title" v-model="task_title">
            </div>
            <div class="mb-3">
                <label for="Task-description" class="form-label">Task-Description</label>
                <textarea class="form-control" required id="exampleInputtask-description"
                    v-model="task_description"></textarea>
            </div>
            <div class="mb-3">
                <label for="Due-date" class="form-label">Due-Date</label>
                <input type="date" class="form-control" required id="exampleInputdue-date" v-model="due_date">
            </div>
            <div class="mb-3">
                <label for="List" class="form-label">List</label>
                <select required name="status" id="list" v-model="list" class="form-select">
                    <template v-for="key in list_data" :key="key">
                        <option>{{ key[0] }}</option>
                    </template>
                </select>
            </div>
            <div class="form-check">
                <label for="completed" class="form-check-label">Is Task completed</label>
                <input type="checkbox" class="form-check-input" id="exampleInputCompleted" v-model="is_task_completed">
            </div>
            <button type="submit" class="btn btn-success">Add task</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: "AddTask",
    data() {
        return {
            token: "",
            error_message: "",
            list_data: "",
            task_title: "",
            task_description: "",
            due_date: "",
            list: "",
            user: "",
            is_task_completed: ""
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
                    const response = await axios.get('lists', {
                        params: {
                            token: this.token
                        }
                    });
                    this.list_data = response.data.message
                    localStorage.setItem("listdata",JSON.stringify(this.list_data))
                }
            }
            else {
                this.$router.push("/login")
            }
        },
        async handleSubmit() {
            this.token = sessionStorage.getItem("login_token");
            if (this.token) {
                const decoded_token = jwt_decode(this.token);
                this.user = decoded_token['user']
                if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                    sessionStorage.removeItem("login_token");
                    this.$router.push("/login")
                }
                else {
                    const response = await axios.post('addtask', {
                        token: this.token,
                        list_name: this.list,
                        task_title: this.task_title,
                        task_description: this.task_description,
                        due_date: this.due_date,
                        mark_as_completed: this.is_task_completed ? "yes" : "no"
                    }).catch(err => { return err });

                    const message = response.data?.message ?? response.message
                    if (message === "task created success")
                        this.$router.push("/")
                    }
                    else { this.error_message = message }
                }
            }
            else {
                this.$router.push("/login")
            }
        },

    },
    beforeMount() {
        this.getlist()
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
