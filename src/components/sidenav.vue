<template>
  <div>
    <div class="wrapper d-flex">
      <div class="sidebar">
        <p class="myproject px-3 ">Dashboard</p>
        <ul>
          <slot>
            <li><a href="/homeAdmin"> Admin</a></li>
            <li><router-link to="/school"> School</router-link></li>
            <li><router-link to="/dept">Department</router-link></li>
            <li><router-link to="/course">Courses</router-link></li>
            <li><router-link to="/lecturer">Lecturer</router-link></li>
            <li><router-link to="/student">Students</router-link></li>
            <li><a href="#" @click="enroll">Enroll Students biometrics</a></li>
            <li><a href="#" @click="logout"> Logout </a></li>
          </slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidenav',
  methods: {
    enroll () {
      this.$http.post('http://localhost/JessieProject/enroll')
    },
    logout () {
      localStorage.removeItem('Id')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* side nav */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: arial;
}

body {
  background: #eee;
}

.wrapper {
  position: relative;
}

.sidebar {
  position: fixed;
  width: 250px;
  height: 100%;
  background: black;
  padding: 10px 0;
}

.wrapper .sidebar ul li {
  padding: 15px;
}

.wrapper .sidebar ul li a {
  color: rgb(214, 194, 16);
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 25px !important;
}

.wrapper .sidebar ul li a .far {
  width: 25px !important;
}

.wrapper .sidebar ul li:hover {
  background: gray;
}

.wrapper .sidebar ul li a:hover {
  color: #fff;
  text-decoration: none;
}

.myproject {
  margin-top: 25px;
  color: #ffffffa8;
  font-size: 14px;
  margin-bottom: 0;
}

.userProfile {
  position: absolute;
  bottom: 0;
  left: 5%;
  display: flex;
}

.userProfile a {
  width: 20px;
  background: #4527a0;
  color: #bdb8d7;
  text-decoration: none;
  font-size: 15px;
}

.userProfile a:hover {
  color: #fff;
  background: #4527a0;
}

.userProfile p {
  color: #fff;
  padding: 0 15px 0 15px;
}

.userProfile .xyz,
.mnp {
  padding-top: 60%;
  line-height: 30px;
  font-size: 25px !important;
}

.notification1 {
  display: flex;
}

.notification1 .number1 {
  font-size: 15px;
  display: block;
  padding-left: 100px;
  color: #fff;
}

.notification2 {
  display: flex;
}

.notification2 .number2 {
  font-size: 15px;
  display: block;
  padding-left: 85px;
  color: #fff;
}
</style>
