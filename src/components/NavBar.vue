<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <router-link to="/" class="navbar-brand">Kanban-Board</router-link>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Dashboard</a>
        </li>
        <li class="nav-item">
          <router-link to="/summary" class="nav-link">Summary</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="handlelogout" style="cursor:pointer">Logout</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="exportToPdf" style="cursor:pointer">Export Html to pdf</a>
        </li>
        <li class="nav-item">
          <router-link to="/remainders" class="nav-link">Get Remainders</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import html2pdf from "html2pdf.js";
export default {
  name: "NavBar",
  methods: {
    handlelogout() {
      sessionStorage.removeItem("login_token");
      localStorage.removeItem("user_data")
      localStorage.removeItem("listdata")
      this.$router.push("/login")
    },
    exportToPdf(){
      html2pdf(document.getElementById("app"),{margin: 1,
      filename: "html_reports.pdf"
      });
    }
  }
}
</script>

<style scoped>

</style>