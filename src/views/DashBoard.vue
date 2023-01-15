<template>
    <h1>Welcome {{ this.user }}</h1>
    <div class="topcard">
        <a @click="handleDownloadpdf()" style="cursor:pointer"><small class="text-muted ">Download to Pdf </small></a>
        <a @click="handleDownloadcsv()" style="cursor:pointer"><small class="text-muted ">Download to Csv </small></a>
    </div>

    <div class="buttonslist">
        <router-link class="btn btn-success button" to="/addlist">Add List</router-link>
        <router-link class="btn btn-success button" to="/addtask">Add Task</router-link>
    </div>
    <template v-for="(key, value) in user_data" :key="key">
        <div class="contents">
            <div class="list-names">
                <div class="topcard">
                    <a @click="handleDownloadlist(value)" class="card-text" style="cursor:pointer"><small
                            class="text-muted ">Download</small></a>
                    <a @click ="handleeditlist(value)" class="card-text" style="cursor:pointer"><small class="text-muted ">Edit</small></a>
                    <a @click="handleDeletelist(value)" class="card-text" style="cursor:pointer"><small
                            class="text-muted ">Delete </small></a>

                </div>
                <h1>{{ value }}</h1>
                <div class="lists">
                    <template v-for="task in key" :key="task">
                        <div v-if="task['status'] === 'completed'">
                            <div class="card" style="background-color: #facfd2;">
                                <div class="card-body">
                                    <div class="topcard">
                                        <a  @click="handleEditTask(task['task-id'])" class="card-text" style="cursor:pointer"><small class="text-muted ">Edit
                                            </small></a>
                                        <a @click="handleDeleteTask(task['task-id'],task['task-title'])" class="card-text"
                                            style="cursor:pointer"><small class="text-muted ">Delete
                                            </small></a>
                                    </div>
                                    <h5 class="card-title">{{ task["task-title"] }}</h5>
                                    <p class="card-text">{{ task["task-description"] }}</p>
                                    <div class="bottom-card">
                                        <p class="card-text"><small class="text-muted">{{ task["status"] }} </small></p>
                                        <p class="card-text"><small class="text-muted">Due : {{ task["due-date"] }}
                                            </small>
                                        </p>
                                        <p class="card-text"><small class="text-muted">Completed : {{
                                            task["date-of-completion"]
                                        }} </small></p>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="task['status'] === 'pending'">
                            <div class="card" style="background-color: #f6f7f7;">
                                <div class="card-body">
                                    <div class="topcard">
                                        <a @click="handleEditTask(task['task-id'])" class="card-text" style="cursor:pointer"><small class="text-muted ">Edit
                                            </small></a>
                                        <a @click="handleDeleteTask(task['task-id'],task['task-title'])" class="card-text"
                                            style="cursor:pointer"><small class="text-muted ">Delete
                                            </small></a>
                                    </div>
                                    <h5 class="card-title">{{ task["task-title"] }}</h5>
                                    <p class="card-text">{{ task["task-description"] }}</p>
                                    <div class="bottom-card">
                                        <p class="card-text"><small class="text-muted ">{{ task["status"] }} </small>
                                        </p>
                                        <p class="card-text"><small class="text-muted ">Due : {{ task["due-date"] }}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </template>
</template>
  
  
<script>
import createstore from "../store";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import exportFromJSON from 'export-from-json';
export default {
    name: "DashBoard",
    data() {
        return {
            token: "",
            user_data: "",
            user: ""
        }
    },
    async created() {
        this.token = sessionStorage.getItem("login_token");
        if (this.token) {
            const decoded_token = jwt_decode(this.token);
            this.user = decoded_token['user']
            if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                sessionStorage.removeItem("login_token");
                this.$router.push("/login")
            }
            else {
                const response = await axios.get('dashboard', {
                    params: {
                        token: this.token
                    }
                });
                this.user_data = response.data.message
                localStorage.setItem("user_data",JSON.stringify(this.user_data))
                createstore.dispatch("updateUserData",JSON.stringify(this.user_data))
            }
        }
        else {
            this.$router.push("/login")
        }
    },
    methods: {
        handleDownloadpdf() {
            const data = [].concat(...(Object.values(this.user_data)))
            const fileName = this.user + "_" + new Date();
            const exportType = exportFromJSON.types.pdf;

            if (data) exportFromJSON({ data, fileName, exportType });
        },
        handleDownloadcsv() {
            const data = [].concat(...(Object.values(this.user_data)))
            const fileName = this.user + "_" + new Date();
            const exportType = exportFromJSON.types.csv;

            if (data) exportFromJSON({ data, fileName, exportType });
        },
        handleDownloadlist(value) {
            const data = this.user_data[value]
            const fileName = this.user + "_" + value + "_" + new Date();
            const exportType = exportFromJSON.types.csv;

            if (data) exportFromJSON({ data, fileName, exportType });
        },
        async handleDeletelist(value) {
            if (window.confirm("Are You Sure To Delete List-" + value)) {
                this.token = sessionStorage.getItem("login_token");
                if (this.token) {
                    const decoded_token = jwt_decode(this.token);
                    this.user = decoded_token['user']
                    if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                        sessionStorage.removeItem("login_token");
                        this.$router.push("/login")
                    }
                    else {
                        const response = await axios.delete('list', {
                            params: {
                                token: this.token,
                                list_name: value
                            }
                        });
                        console.log(response.data.message)
                        this.$router.go(0)
                    }
                }
                else {
                    this.$router.push("/login")
                }
            }
        },
        async handleDeleteTask(id,title) {
            if (window.confirm("Are You Sure To Delete Task-" + title)) {
                this.token = sessionStorage.getItem("login_token");
                if (this.token) {
                    const decoded_token = jwt_decode(this.token);
                    this.user = decoded_token['user']
                    if (decoded_token.exp < parseInt((new Date()).getTime() / 1000)) {
                        sessionStorage.removeItem("login_token");
                        this.$router.push("/login")
                    }
                    else {
                        const response = await axios.delete('task', {
                            params: {
                                token: this.token,
                                task_id: id
                            }
                        });
                        console.log(response.data.message)
                        this.$router.go(0)
                    }
                }
                else {
                    this.$router.push("/login")
                }
            }
        },
        async handleeditlist(value){
            this.$router.push({name: 'editlist', params: { listid: value}});
        },
        async handleEditTask(value){
            this.$router.push({name: 'edittask', params: { taskid: value}});
        }
    }
}

</script>
  
<style scoped>
.bottom-card p {
    display: inline;
    word-wrap: break-word;
    margin-left: 2%;
    margin-right: 2%;
}

.topcard {
    padding-right: 5%;
    text-align: right;
}

.topcard a {
    margin-left: 2%;
    text-decoration: none;
    color: yellow;
}

.button {
    margin-left: 10%;
    margin-right: 10%;
}

.list-names {
    float: left;
    word-wrap: break-word;
    margin-top: 2%;
    width: 40%;
    height: 500px;
    padding: 0 1%;
    border-radius: 1%;
    margin-left: 5%;
    margin-bottom: 2%;
    background-color: papayawhip;
}

.lists {
    overflow: auto;
    word-wrap: break-word;
    width: 100%;
    height: 75%;
}

.card {
    margin-bottom: 2%;
}
</style>