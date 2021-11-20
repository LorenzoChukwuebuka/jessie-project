<template>
  <main>
    <sidenav />
    <div class="container-fluid mt-5">
      <div class="row justify-content-center mt-5">
        <div class="container col-8 offset-3">
          <h4 class="text-white text-center">Add Department</h4>

          <div class="input-group row col-sm-8 w-50  mb-3">
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
              placeholder="Search Department"
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
    <b-modal id="modal-1" hide-footer title="Add Department">
      <label class="mb-2 "> Department </label>
      <div class="input-group input-group-sm mb-3">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <button class="btn btn-primary">Submit</button>
    </b-modal>
  </main>
</template>

<script>
import sidenav from '../../components/sidenav.vue'
export default {
  name: 'dept',
  components: { sidenav }
}
</script>

<style></style>
