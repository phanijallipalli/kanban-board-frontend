import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from "../views/DashBoard.vue"
import LoginPage from "../views/LoginPage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import AddList from "../views/AddList.vue"
import AddTask from "../views/AddTask.vue"
import SummaryPage from "../views/SummaryPage.vue"
import EditList from "../views/EditList.vue"
import EditTask from "../views/EditTask.vue"
import GetRemainders from "../views/GetRemainders.vue"
import ForgotPassword from "../views/ForgotPassword.vue"

const routes = [
  {path : "/" , component : DashBoard},
  {path : "/login", component : LoginPage},
  {path : "/register", component : RegisterPage},
  {path : "/addlist", component : AddList},
  {path : "/addtask", component : AddTask},
  {path : "/summary", component : SummaryPage},
  {path: '/:listid/editlist', name : "editlist",component: EditList },
  {path: '/:taskid/edittask', name : "edittask",component: EditTask },
  {path : "/remainders", component : GetRemainders},
  {path : "/forgotpassword", component : ForgotPassword}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
