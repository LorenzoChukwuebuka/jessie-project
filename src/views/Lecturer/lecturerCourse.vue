<template>
  <main>
    <lectNav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Select Course</h4>

          <div class="input-group mb-3 w-50 mx-auto">
            <label class="mb-2 "> Select Course </label>
            <b-form-select
              class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
              v-model="form.course"
              @change="getStudents()"
            >
              <template #first>
                <b-form-select-option
                  :value="null"
                  placeholder="Department"
                  disabled
                  >-- select course --</b-form-select-option
                >
              </template>
              <option
                class="px-2 py-2"
                v-for="cos in courses"
                :key="cos.Id"
                :value="cos.cid"
              >
                {{ cos.course }}
              </option>
            </b-form-select>
          </div>
          <h4 class="text-white text-center">Students </h4>
          <table class="table mt-5 text-white" v-if="students.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Reg Number</th>
                <th scope="col">Course Code</th>
                <th scope="col">Course</th>
              </tr>
            </thead>
            <tbody
              v-for="(stds, index) in students"
              :key="index"
              :value="stds.Id"
            >
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ stds.name }}</td>
                <td>{{ stds.regNum }}</td>
                <td>{{ stds.course_code }}</td>
                <td>{{ stds.course }}</td>
              </tr>
            </tbody>
          </table>
          <small v-else>
            <p class="text-center text-white">
              No student has registered for this course
            </p>
          </small>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import lectNav from '@/components/lecturerNav.vue'

export default {
  name: 'lectCourse',
  components: { lectNav },
  data () {
    return {
      form: {
        course: ''
      },
      courses: [],
      students: []
    }
  },
  mounted () {
    this.getCourses()
  },
  methods: {
    getCourses () {
      let lecturerId = localStorage.getItem('Id')
      this.$http
        .get(`http://localhost/JessieProject/lectCourse?id=${lecturerId}`)
        .then(res => {
          this.courses = res.data
        })
    },
    getStudents () {
      this.$http
        .get(
          `http://localhost/JessieProject/studentcourse?id=${this.form.course}`
        )
        .then(res => {
          this.students = res.data
        })
    }
  }
}
</script>
