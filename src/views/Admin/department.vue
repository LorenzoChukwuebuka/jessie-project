<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add Department</h4>

          <div class="input-group mb-3 w-50 mx-auto">
            <button
              v-b-modal.modal-1
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
            >
              Add Department
            </button>

            <input
              type="text"
              class="form-control"
              placeholder="Search Dept"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
            <h4 class="text-white text-center">departments</h4>
          <table class="table mt-5 text-white" v-if="departments.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Dept</th>
                <th scope="col">School</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody
              v-for="(dept, index) in departments"
              :key="index"
              :value="dept.Id"
            >
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ dept.dept }}</td>
                <td>{{ dept.school }}</td>
                <td>
                  <b-icon
                    icon="pen"
                    variant="success"
                    @click="startEdit(dept)"
                    v-b-modal.modal-2
                  ></b-icon>
                </td>
                <td>
                  <b-icon icon="trash" variant="danger" @click="deletedept(dept.Id)"></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
          <small v-else>
            <p class="text-center text-white">
              You have not added any schools yet
            </p>
          </small>
        </div>
      </div>
    </div>
    <b-modal id="modal-1" hide-footer title="Add Department">
      <label class="mb-2 "> School </label>
      <div class="input-group input-group-sm mb-3">
        <b-form-select
          class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
          v-model="form.schId"
        >
          <template #first>
            <b-form-select-option :value="null" disabled
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
        <label class="mb-2 mt-2"> Department </label>
        <input
          v-model="form.dept"
          type="text"
          class="form-control px-2 py-2 pb-2 mt-2 mb-3 w-100"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary" @click="submit">Submit</button>
    </b-modal>

    <b-modal id="modal-2" hide-footer title="Edit Department">
      <label class="mb-2 "> School </label>
      <div class="input-group input-group-sm mb-3">
        <b-form-select
          class="px-2 py-2 pb-2 mt-2 mb-3 w-100"
          v-model="edit.schId"
        >
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- select school --</b-form-select-option
            >
          </template>
          <option
            class="px-2 py-2"
            v-for="sch in schools"
            :key="sch.Id"
            :value="sch.Id"
          >
            {{ sch.school }}
          </option>
        </b-form-select>
        <label class="mb-2 mt-2"> Department </label>
        <input
          v-model="edit.dept"
          type="text"
          class="form-control px-2 py-2 pb-2 mt-2 mb-3 w-100"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary" @click="update">Update</button>
    </b-modal>
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'dept',
  components: { sidenav },
  data () {
    return {
      schools: [],
      departments: [],
      edited: null,
      edit: {
        dept: '',
        schId: ''
      },
      form: {
        dept: '',
        schId: ''
      }
    }
  },
  mounted () {
    this.getschool()
    this.getDept()
  },
  methods: {
    getschool () {
      this.$http.get('http://localhost/JessieProject/school').then(res => {
        this.schools = res.data
      })
    },
    submit (e) {
      e.preventDefault()
      if (!this.form.school && !this.form.dept) {
        this.$swal({ icon: 'error', text: 'Invalid input' })
      } else {
        this.$http
          .post('http://localhost/JessieProject/dept', this.form)
          .then(res => {
            if (res.data.message === 'successful') {
              this.$swal({ icon: 'success', text: 'sucessful' })
              setTimeout(() => {
                location.reload()
              }, 2000)
            } else {
              this.$swal({ icon: 'error', text: 'Department Already exists' })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getDept () {
      this.$http
        .get('http://localhost/JessieProject/dept')
        .then(res => {
          this.departments = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    startEdit (dept) {
      this.edited = dept
      this.edit.schId = this.edited.school_Id
      this.edit.dept = this.edited.dept
      this.edit.Id = this.edited.Id

      console.log(dept)
    },
    update (e) {
      e.preventDefault()
      console.log(this.edit)
      this.$http
        .put(
          `http://localhost/JessieProject/dept?id=${this.edit.Id}`,
          this.edit
        )
        .then(res => {
          console.log(res.data)
        })
    },
    deletedept (Id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to retrieve !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$http.delete(`http://localhost/JessieProject/dept?id=${Id}`)
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
