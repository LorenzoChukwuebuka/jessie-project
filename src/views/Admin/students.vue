<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add Students</h4>

          <div class="input-group mb-3">
            <button
              v-b-modal.modal-1
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
            >
              Add Students
            </button>

            <input
              type="text"
              class="form-control"
              placeholder="Search School"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <table class="table mt-5 text-white" v-if="students.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Reg Number</th>
                <th scope="col">Level</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody
              v-for="(student, index) in students"
              :key="index"
              :value="student.id"
            >
              <tr>
                <td>{{ index + 1 }}</td>

                <td>{{ student.name }}</td>
                <td>{{ student.dept }}</td>
                <td>{{ student.regNum }}</td>
                <td>{{ student.level }}</td>

                <td>
                  <b-icon
                    icon="trash"
                    @click="deletestudent(student.id)"
                    variant="danger"
                  ></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Add modal --->
    <b-modal id="modal-1" hide-footer title="Add Students">
      <label class="mb-2 "> Name </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <label class="mb-2 "> Reg Number </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="form.regnum"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <label class="mb-2 "> School </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="form.school"
        @change="getDept"
      >
        <template #first>
          <b-form-select-option :value="null" placeholder="Department" disabled
            >-- select school --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="(sch, index) in schools"
          :key="index"
          :value="sch.Id"
        >
          {{ sch.school }}
        </option>
      </b-form-select>
      <label class="mb-2 "> Department </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="form.deptId"
        @change="getCourses"
      >
        <template #first>
          <b-form-select-option :value="null" placeholder="Department" disabled
            >-- select Department --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="(depts, index) in departments"
          :key="index"
          :value="depts.Id"
        >
          {{ depts.dept }}
        </option>
      </b-form-select>
      <label class="mb-2 "> Level </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="form.levelId"
        @change="getCourses"
      >
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- select level --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="lvls in levels"
          :key="lvls.Id"
          :value="lvls.Id"
        >
          {{ lvls.level }}
        </option>
      </b-form-select>
      <hr />

      <label v-for="course in courses" :key="course.Id">
        <span class="mt-2 mb-2"> <h6>Course</h6> </span>
        <input
          class="form-check-input"
          type="checkbox"
          v-model="form.course"
          :value="course.Id"
          required
        />
        <span
          ><b> Course Code </b>{{ course.course_code }} :: <b> Course Title </b
          >{{ course.course }}
        </span>
      </label>

      <button class="btn btn-primary mt-2" @click="submit">Submit</button>
    </b-modal>

    <!-- End of add modal -->
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'student',
  components: { sidenav },
  data () {
    return {
      schools: [],
      levels: [],
      courses: [],
      departments: [],
      courses: [],
      students: [],
      form: {
        name: '',
        regnumber: '',
        deptId: '',
        levelId: '',
        school: '',
        course: []
      },
      edited: null,
      edit: {
        name: '',
        regnumber: '',
        deptId: '',
        levelId: '',
        school: '',
        course: []
      }
    }
  },
  mounted () {
    this.getSchool()
    this.fetchStudents()
    this.getlevels()
  },
  methods: {
    getSchool () {
      this.$http
        .get('http://localhost/JessieProject/school')
        .then(res => {
          this.schools = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDept () {
      this.$http
        .get(`http://localhost/JessieProject/dept?id=${this.form.school}`)
        .then(res => {
          this.departments = res.data
        })
    },
    getlevels () {
      this.$http.get('http://localhost/JessieProject/levels').then(res => {
        this.levels = res.data
      })
    },

    getCourses () {
      if (!this.form.levelId) return false
      let data = new Object()
      data.deptId = this.form.deptId
      data.levelId = this.form.levelId
      console.log(data)
      this.$http
        .post('http://localhost/JessieProject/lvlcos', data)
        .then(res => {
          this.courses = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit (e) {
      e.preventDefault()
      if (!this.form.name && !this.form.regnumber) {
        this.$swal({ icon: 'error', text: 'Invalid input' })
      } else {
        this.$http
          .post('http://localhost/JessieProject/students', this.form)
          .then(res => {
            this.$swal({
              icon: 'success',
              text: 'Your unique code for attendance is'.res.data.message
            })
          })
      }
    },
    fetchStudents () {
      this.$http.get('http://localhost/JessieProject/students').then(res => {
        this.students = res.data
      })
    },

    deletestudent (Id) {
      this.$http
        .delete(`http://localhost/JessieProject/students?id=${Id}`)
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>

<style></style>
