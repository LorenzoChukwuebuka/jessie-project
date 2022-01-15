<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add course</h4>

          <div class="input-group mb-3 w-50 mx-auto">
            <button
              v-b-modal.modal-1
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
            >
              Add course
            </button>

            <input
              v-model="search"
              @keyup="getCourse"
              type="text"
              class="form-control"
              placeholder="Search Courses"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <h4 class="text-white text-center">Courses</h4>
          <table class="table mt-5 text-white" v-if="courses.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">course code</th>
                <th scope="col">course</th>
                <th scope="col">Level</th>
                <th scope="col">Department</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody v-for="(cos, index) in courses" :key="index" :value="cos.Id">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ cos.course_code }}</td>
                <td>{{ cos.course }}</td>
                <td>{{ cos.level }}</td>
                <td>{{ cos.dept }}</td>
                <td>
                  <b-icon
                    icon="pen"
                    variant="success"
                    v-b-modal.modal-2
                    @click="startedit(cos)"
                  ></b-icon>
                </td>
                <td>
                  <b-icon
                    icon="trash"
                    variant="danger"
                    @click="deleteCos(cos.Id)"
                  ></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
          <small v-else>
            <p class="text-center text-white">
              You have not added any courses yet
            </p>
          </small>
        </div>
      </div>
    </div>

    <!-- add modal ---->

    <b-modal id="modal-1" hide-footer title="Add course">
      <label class="mb-2 "> Department </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="form.deptId"
      >
        <template #first>
          <b-form-select-option :value="null" placeholder="Department" disabled
            >-- select Department --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="dept in departments"
          :key="dept.Id"
          :value="dept.Id"
        >
          {{ dept.dept }}
        </option>
      </b-form-select>
      <label class="mb-2 "> Level </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="form.levelId"
      >
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- select level --</b-form-select-option
          >
        </template>
        <option
          class="px-2 py-2"
          v-for="lvl in levels"
          :key="lvl.Id"
          :value="lvl.Id"
        >
          {{ lvl.level }}
        </option>
      </b-form-select>
      <label class="mb-2 "> Course Code </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="form.course_code"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <label class="mb-2 "> Course Title </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="form.course"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary" @click="submit">Submit</button>
    </b-modal>
    <!-- end of add modal --->

    <!--- edit modal --->
    <b-modal id="modal-2" hide-footer title="Add course">
      <label class="mb-2 "> Department </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="edit.deptId"
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
      <label class="mb-2 "> level </label>
      <b-form-select
        class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
        v-model="edit.levelId"
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
      <label class="mb-2 "> Course Code </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="edit.course_code"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <label class="mb-2 "> Course Title </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="edit.course"
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary" @click="update">Submit</button>
    </b-modal>
    <!--- end of edit modal --->
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'course',
  components: { sidenav },
  data () {
    return {
      search: '',
      courses: [],
      levels: [],
      departments: [],
      form: {
        course_code: '',
        course: '',
        deptId: '',
        levelId: ''
      },
      edited: null,
      edit: {
        course_code: '',
        course: '',
        deptId: '',
        levelId: '',
        id: ''
      }
    }
  },
  mounted () {
    this.getlevels()
    this.getDept()
    this.getCourse()
  },

  methods: {
    getlevels () {
      this.$http.get('http://localhost/JessieProject/levels').then(res => {
        this.levels = res.data
      })
    },
    getDept () {
      this.$http.get('http://localhost/JessieProject/dept').then(res => {
        this.departments = res.data
      })
    },
    submit (e) {
      e.preventDefault()
      if (
        !this.form.course &&
        !this.form.course_code &&
        !this.form.deptId &&
        !this.form.levelId
      ) {
        this.$swal({ icon: 'error', text: 'Invalid input' })
      } else {
        this.$http
          .post('http://localhost/JessieProject/course', this.form)
          .then(res => {
            if (res.data.message === 'successful') {
              this.$swal({ icon: 'success', text: res.data.message })
              setTimeout(() => {
                location.reload()
              }, 2000)
            } else if(res.data.message === 'exists') {
              this.$swal({ icon: 'error', text: 'exists' })
            }
          })
      }
    },
    getCourse () {
      this.$http.get('http://localhost/JessieProject/course').then(res => {
        if (this.search) {
          return (this.courses = res.data.filter(item => {
            return item.course.toLowerCase().includes(this.search)
          }))
        } else {
          this.courses = res.data
        }
      })
    },
    startedit (cos) {
      this.edited = cos
      this.edit.course_code = this.edited.course_code
      this.edit.course = this.edited.course
      this.edit.deptId = this.edited.dept_id
      this.edit.levelId = this.edited.level_Id
      this.edit.id = this.edited.Id
    },
    update (e) {
      e.preventDefault()
      this.$http
        .put(
          `http://localhost/JessieProject/course?id=${this.edit.id}`,
          this.edit
        )
        .then(res => {
          this.$swal({ icon: 'success', text: res.data })
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCos (Id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to retrieve !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$http.delete(`http://localhost/JessieProject/course?id=${Id}`)
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
    }
  }
}
</script>

<style></style>
