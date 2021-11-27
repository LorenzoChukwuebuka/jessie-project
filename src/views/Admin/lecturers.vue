<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add lecturers</h4>

          <div class="input-group mb-3 w-50 mx-auto">
            <button
              v-b-modal.modal-1
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
            >
              Add lecturer
            </button>

            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search lecturers"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <h4 class="text-white text-center">Lecturers</h4>
          <table class="table mt-5 text-white" v-if="lecturers.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Course code</th>
                <th scope="col">Course</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody
              v-for="(lecturer, index) in filterlecturer"
              :key="index"
              :value="lecturer.lid"
            >
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ lecturer.name }}</td>
                <td>{{ lecturer.courseCode }}</td>
                <td>{{ lecturer.course }}</td>
                <td>
                  <b-icon
                    icon="pen"
                    variant="success"
                    v-b-modal.modal-2
                    @click="startedit(lecturer)"
                  ></b-icon>
                </td>
                <td>
                  <b-icon
                    icon="trash"
                    variant="danger"
                    @click="deletelecturer(lecturer.lid)"
                  ></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
          <small v-else>
            <p class="text-center text-white">
              You have not added any lecturers yet
            </p>
          </small>
        </div>
      </div>
    </div>
    <!-- Add modal --->
    <b-modal id="modal-1" hide-footer title="Add lecturers">
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
          v-for="(school,index) in schools"
          :key="index"
          :value="school.Id"
        >
          {{ school.school }}
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
          v-for="(depts,index) in departments"
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

      <div class="form-check">
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
            ><b> Course Code </b>{{ course.course_code }} ::
            <b> Course Title </b>{{ course.course }}
          </span>
        </label>
      </div>

      <button class="btn btn-primary mt-2" @click="submit">Submit</button>
    </b-modal>
    <!-- End of add modal -->

    <!-- Edit modal -->
    <b-modal id="modal-2" hide-footer title="Edit lecturers">
      <label class="mb-2 "> Name </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="edit.name"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <label class="mb-2 "> School </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="edit.school"
        @change="getDept"
      >
        <template #first>
          <b-form-select-option :value="null" placeholder="Department" disabled
            >-- select school --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="school in schools"
          :key="school.Id"
          :value="school.Id"
        >
          {{ school.school }}
        </option>
      </b-form-select>

      <label class="mb-2 "> Department </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="edit.deptId"
        @change="getCourses"
      >
        <template #first>
          <b-form-select-option :value="null" placeholder="Department" disabled
            >-- select Department --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="depts in departments"
          :key="depts.Id"
          :value="depts.Id"
        >
          {{ depts.dept }}
        </option>
      </b-form-select>
      <label class="mb-2 "> Level </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="edit.levelId"
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

      <div class="form-check">
        <label v-for="course in courses" :key="course.Id">
          <span class="mt-2 mb-2"> <h6>Course</h6> </span>
          <input
            class="form-check-input"
            type="checkbox"
            v-model="edit.course"
            :value="course.Id"
            required
          />
          <span
            ><b> Course Code </b>{{ course.course_code }} ::
            <b> Course Title </b>{{ course.course }}
          </span>
        </label>
      </div>

      <button class="btn btn-primary mt-2" @click="submit">Submit</button>
    </b-modal>
    <!-- end of edit modal -->
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'lecturer',
  components: { sidenav },
  data () {
    return {
      search: '',
      levels: [],
      departments: [],
      courses: [],
      schools: [],
      lecturers: [],
      form: {
        school: '',
        name: '',
        deptId: '',
        levelId: '',
        course: []
      },
      edit: {
        school: '',
        name: '',
        deptId: '',
        levelId: '',
        course: []
      },
      edited: null
    }
  },
  mounted () {
    this.getlevels()
    this.getSchool()
    this.getlecturers()
  },
  computed: {
    filterlecturer () {
      if (this.search) {
        return this.lecturers.filter(item => {
          return this.search
            .toLowerCase()
            .split(' ')
            .every(v => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.lecturers
      }
    }
  },
  methods: {
    getlevels () {
      this.$http.get('http://localhost/JessieProject/levels').then(res => {
        this.levels = res.data
      })
    },
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
          console.log(res.data)
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
      if (
        !this.form.name &&
        !this.form.levelId &&
        !this.form.deptId &&
        !this.form.course.length
      ) {
        this.$swal({ icon: 'error', text: 'invalid input' })
      } else {
        this.$http
          .post('http://localhost/JessieProject/lecturer', this.form)
          .then(res => {
            this.$swal({
              icon: 'success',
              text: 'Your Password is' + ' ' + res.data.message
            })
            setTimeout(() => {
              location.reload()
            }, 2000)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getlecturers () {
      this.$http
        .get('http://localhost/JessieProject/lecturer')
        .then(res => {
          this.lecturers = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletelecturer (lid) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to retrieve !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$http.delete(`http://localhost/JessieProject/lecturer?id=${lid}`)
          this.$swal('Deleted!', {
            icon: 'success'
          })
        } else {
          this.$swal('Your delete is safe!')
        }
      })
      setTimeout(() => {
        location.reload()
      }, 2000)
    },
    startedit (lecturer) {
      this.edited = lecturer
      console.log(lecturer)
    }
  }
}
</script>

<style></style>
