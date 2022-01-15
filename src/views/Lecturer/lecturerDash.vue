<template>
  <main>
    <sidenav>
      <li><a href="#"> Admin</a></li>
      <li><router-link to="#"> Students</router-link></li>
      <li><router-link to="#">Take attendance</router-link></li>
      <li><a href="#" @click="enroll">Enroll Students biometrics</a></li>
      <li><a href="#" @click="enroll">Log out </a></li>
    </sidenav>
    <div class="container">
      <div class="card mx-auto w-50">
        <div class="card-body">
          <div>
            <b-calendar
              v-model="value"
              :date-disabled-fn="dateDisabled"
              block
              locale="en"
              width="100%"
            ></b-calendar>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
export default {
  name: 'homelect',
  components: {
    sidenav
  },
  data () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 15th two months prior
    const minDate = new Date(today)
    minDate.setMonth(minDate.getMonth() - 2)
    minDate.setDate(15)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 2)
    maxDate.setDate(15)

    return {
      value: '',
      min: minDate,
      max: maxDate
    }
  }
}
</script>

<style>
.panel-body .btn:not(.btn-block) {
  width: 120px;
  margin-bottom: 10px;
  padding-top: 20px;
}
.card {
  margin-top: 200px;
}
</style>
