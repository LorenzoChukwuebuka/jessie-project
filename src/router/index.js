import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homeAdmin from '../views/Admin/home.vue'
import school from '../views/Admin/school.vue'
import dept from '../views/Admin/department.vue'
import course from '../views/Admin/course.vue'
import lecturer from '../views/Admin/lecturers.vue'
import student from '../views/Admin/students.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/homeAdmin',
    name: 'homeadmin',
    component: homeAdmin
  },
  {
    path: '/school',
    name: 'school',
    component: school
  },
  {
    path: '/dept',
    name: 'dept',
    component: dept
  },
  {
    path: '/course',
    name: 'course',
    component: course
  },
  {
    path: '/lecturer',
    name: 'lecturer',
    component:  lecturer
  },
  {
    path: '/student',
    name: 'student',
    component:  student
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
