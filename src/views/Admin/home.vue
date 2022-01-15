<template>
  <main>
    <sidenav>
      <li><a href="/homeAdmin"> Admin</a></li>
      <li><router-link to="/school"> School</router-link></li>
      <li><router-link to="/dept">Department</router-link></li>
      <li><router-link to="/course">Courses</router-link></li>
      <li><router-link to="/lecturer">Lecturer</router-link></li>
      <li><router-link to="/student">Students</router-link></li>
      <li><a href="#" @click="enroll">Enroll Students biometrics</a></li>
      <li><a href="#" @click="logout"> Logout </a></li>
   </sidenav>
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
                      3,243
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>12.5% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div
                  class="progress mt-1 "
                  data-height="8"
                  style="height: 8px;"
                >
                  <div
                    class="progress-bar l-bg-cyan"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 25%;"
                  ></div>
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
                  <h5 class="card-title mb-0">Course</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      15.07k
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>9.23% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div
                  class="progress mt-1 "
                  data-height="8"
                  style="height: 8px;"
                >
                  <div
                    class="progress-bar l-bg-green"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 25%;"
                  ></div>
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
                  <h5 class="card-title mb-0">Student</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      578
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>10% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div
                  class="progress mt-1 "
                  data-height="8"
                  style="height: 8px;"
                >
                  <div
                    class="progress-bar l-bg-orange"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 25%;"
                  ></div>
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
                  <h5 class="card-title mb-0">Lecturer</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      $11.61k
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>2.5% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div
                  class="progress mt-1 "
                  data-height="8"
                  style="height: 8px;"
                >
                  <div
                    class="progress-bar l-bg-cyan"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 25%;"
                  ></div>
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
    return {}
  },
  mounted () {},
  methods: {
    getTotalDepts () {},
    getTotalCourse () {},
    getTotalStudents () {},
    getTotalLecturers () {}
  }
}
</script>
