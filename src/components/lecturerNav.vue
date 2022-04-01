<template>
  <main>
    <sidenav>
      <li>
        <a href="/homelect"> {{ name }} </a>
      </li>
      <li><router-link to="/lectCourse"> Courses </router-link></li>
      <li>
        <a href="#" @click="attendance">Take attendance with biometrics</a>
      </li>
      <li>
        <router-link to="/lectattend">Take attendance with code</router-link>
      </li>
      <li><router-link to="/attendanceReg"> Attendance Register</router-link></li>

      <li><a href="#" @click="logout">Log out </a></li>
    </sidenav>
  </main>
</template>

<script>
import sidenav from "@/components/sidenav.vue";
export default {
  name: "lectNav",
  components: {
    sidenav,
  },
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    getName() {
       this.name = localStorage.getItem('name')
    },
    attendance() {
      this.$http.get("http://localhost/JessieProject/attendance");
    },
    logout() {
      this.$router.push("/");
      localStorage.removeItem("Id");
    },
  },
};
</script>

<style></style>
