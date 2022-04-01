<template>
  <main>
    <sidenav> </sidenav>
    <div class="container">
      <div class="col-md-10  " style="margin-left:200px;">
        <div class="row ">
          <div class="col-xl-3 col-lg-6">
            <div class="card l-bg-cherry">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large">
                  <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Departments</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {{ totaldepts }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6">
            <div class="card l-bg-blue-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large">
                  <i class="fas fa-users"></i>
                </div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Courses</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {{ totalcourse }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6">
            <div class="card l-bg-green-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large">
                  <i class="fas fa-ticket-alt"></i>
                </div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Students</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {{ totalstudent }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6">
            <div class="card l-bg-orange-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Lecturers</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {{ totallecturers }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
export default {
  name: 'homeAdmin',
  components: {
    sidenav
  },
  data () {
    return {
      totaldepts: '',
      totalcourse: '',
      totalstudent: '',
      totallecturers: ''
    }
  },
  mounted () {
    this.getTotalDepts()
    this.getTotalCourse()
    this.getTotalLecturers()
    this.getTotalStudents()
  },
  methods: {
    getTotalDepts () {
      this.$http.get('http://localhost/JessieProject/totaldepts').then(res => {
        this.totaldepts = res.data[0].total_depts
      })
    },
    getTotalCourse () {
      this.$http.get('http://localhost/JessieProject/totalCourse').then(res => {
        this.totalcourse = res.data[0].total_course
      })
    },
    getTotalStudents () {
      this.$http
        .get('http://localhost/JessieProject/totalstudents')
        .then(res => {
          this.totalstudent = res.data[0].total_students
        })
    },
    getTotalLecturers () {
      this.$http
        .get('http://localhost/JessieProject/totallecturers')
        .then(res => {
          this.totallecturers = res.data[0].total_lecturers
        })
    }
  }
}
</script>


