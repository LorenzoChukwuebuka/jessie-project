<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add School</h4>

          <div class="input-group mb-3 w-50 col-sm-6 mx-auto">
            <button
              v-b-modal.modal-1
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
            >
              Add school
            </button>

            <input
              type="text"
              class="form-control"
              placeholder="Search School"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <table class="table mt-5 text-white" v-if="schools.length != 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">School</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody v-for="(sch, index) in schools" :key="index" :value="sch.Id">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ sch.school }}</td>
                <td>
                  <b-icon
                    icon="pen"
                    variant="success"
                    v-b-modal.modal-2
                    @click="editSchools(sch)"
                  ></b-icon>
                </td>
                <td>
                  <b-icon
                    icon="trash"
                    variant="danger"
                    @click="deleteSchool(sch.Id)"
                  ></b-icon>
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
    <b-modal id="modal-1" hide-footer title="Add school">
      <label class="mb-2 "> School </label>
      <div class="input-group input-group-sm mb-3">
        <input
          type="text"
          v-model="form.school"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary" @click="submit">Submit</button>
    </b-modal>

    <b-modal id="modal-2" hide-footer title="Add school">
      <label class="mb-2 "> Edit School </label>
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="edit.school"
          type="text"
          class="form-control"
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
  name: 'school',
  components: { sidenav },
  data () {
    return {
      form: {
        school: ''
      },
      schools: [],
      edited: null,
      edit: {
        school: '',
        Id: ''
      }
    }
  },
  mounted () {
    this.getSchool()
  },
  methods: {
    submit (e) {
      e.preventDefault()
      if (!this.form.school) {
        this.$swal({ icon: 'error', text: 'Invalid inputs' })
      } else {
        this.$http
          .post('http://localhost/JessieProject/school', this.form)
          .then(res => {
            this.$swal({ icon: 'success', text: 'Added successfully' })
          })
          .catch(err => {
            console.log(err)
          })
      }
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
    editSchools (sch) {
      this.edited = sch
      this.edit.school = this.edited.school
      this.edit.Id = this.edited.Id
    },
    deleteSchool (Id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to retrieve !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$http.delete(`http://localhost/JessieProject/school?id=${Id}`)
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
    update () {
      this.$http
        .put(`http://localhost/JessieProject/school?id=${this.edit.Id}`, this.edit)
        .then(res => {
          if (res.data.message === 'successful') {
            this.$swal({ icon: 'success', text: 'Updated succesfully' })
            setTimeout(() => {
              location.reload()
            }, 2000)
          }
        })
    }
  }
}
</script>

<style></style>
