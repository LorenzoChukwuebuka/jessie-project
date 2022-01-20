<template>
  <main>
    <sidenav>
      <li>
        <a href="#"> {{ name.toUpperCase() }} </a>
      </li>
      <li><router-link to="#"> Courses </router-link></li>
      <li>
        <router-link to="#" @click="attendance">Take attendance</router-link>
      </li>

      <li><a href="#" @click="logout">Log out </a></li>
    </sidenav>
  </main>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
export default {
  name: 'lectNav',
  components: {
    sidenav
  },
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.getName()
  },
  methods: {
    getName () {
      let id = localStorage.getItem('Id')

      this.$http
        .get(`http://localhost/JessieProject/getname?id=${id}`)
        .then(res => {
          this.name = res.data[0].username
        })
    },
    attendance () {
      this.$http.get('http://localhost/JessieProject/attendance')
    },
    logout () {
      this.$router.push('/')
      localStorage.removeItem('Id')
    }
  }
}
</script>

<style></style>
