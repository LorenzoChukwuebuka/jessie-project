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
              type="text"
              class="form-control"
              placeholder="Search lecturers"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <table class="table mt-5 text-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <b-modal id="modal-1" hide-footer title="Add lecturers">
      <label class="mb-2 "> Name </label>
      <div class="input-group input-group-sm mb-3">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
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
      <label class="mb-2 "> Name </label>
      <div class="input-group input-group-sm mb-3">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <hr />
      <label class="mb-2 "> Courses </label>
      <span v-for="cos in courses" :key="cos.Id">
        <b-form-checkbox-group
          v-model="selected"
         
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-checkbox-group>
      </span>

      <button class="btn btn-primary">Submit</button>
    </b-modal>
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'lecturer',
  components: { sidenav },
  data () {
    return {
      levels: [],
      departments: [],
      courses: [],
      form: {
        name: '',
        deptId: '',
        levelId: '',
        course: []
      }
    }
  },
  mounted () {
    this.getlevels()
    this.getDept()
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
    getCourses () {
      let data = new Object()
      data.deptId = this.form.deptId
      data.levelId = this.form.levelId
      console.log(data)
      this.$http
        .post('http://localhost/JessieProject/lvlcos', data)
        .then(res => {
          this.courses = res.data
        })
    }
  }
}
</script>

<style></style>
