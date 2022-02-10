<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-box">
          <div class="form-header text-warning">
            <center>
              <h3>
                <i class="fa fa-users fa-fw mr-1"></i>
                Login
              </h3>
            </center>
          </div>

          <form autocomplete="off">
            <div class="input-box">
              <label for="email"
                ><i class="fa fa-envelope text-warning mr-2 fa-fw"></i
              ></label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Username"
                v-model="form.username"
                required
                data-validation-message="Please fill out this field"
              />
            </div>

            <div class="input-box">
              <label for="password"
                ><i class="fa fa-key text-warning mr-2 fa-fw"></i
              ></label>
              <input
                :type="type"
                name="password"
                id="password"
                placeholder="password"
                required
                v-model="form.password"
                data-validation-message="Please fill out this field"
              />

              <span class="eye" @click="showPassword">
                {{ text }}
              </span>
            </div>

            <div class="button ">
              <button
                type="button"
                name="button"
                id="button"
                class="btn btn-md btn-warning"
                @click="submit"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-12 col-md ">
        <small class="d-block mb-3 text-muted text-center">
          IFT Dept &copy; 2021
        </small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  components: {},
  data () {
    return {
      errors: [],
      type: 'password',
      text: 'Show',
      type: null,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      if (!this.form.username && !this.form.password) {
        this.$swal({ icon: 'error', text: 'invalid inputs' })
        this.errors.push()
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
      if (!this.errors.length) {
        this.$http
          .post('http://localhost/JessieProject/login', this.form)
          .then(res => {
            if (res.data.message === 'invalid details') {
              console.log(res.data.message)
            } else if (res.data[0].type == 0) {
              this.$router.push('/homeAdmin')
              localStorage.setItem('Id', res.data[0].Id)
            } else if (res.data[0].type == 1) {
              this.$router.push('/homelect')
              localStorage.setItem('Id', res.data[0].Id)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    showPassword () {
      if (this.type === 'password') {
        this.type = 'text'
        this.text = 'Hide'
      } else {
        this.type = 'password'
        this.text = 'Show'
      }
    }
  }
}
</script>
<style scoped>
.form-box {
  width: 500px;
  background: rgba(0, 0, 0, 0.8);
  margin: 2% auto;
  padding: 50px 0;
  color: #fff;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
}

.form-box h4 {
  color: gold;
}

.input-box {
  margin: 31px auto;
  width: 80%;
  border-bottom: 1px solid #fff;
  padding-top: 10px;
  padding-bottom: 5px;
}

.input-box input {
  width: 90%;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
}

::placeholder {
  color: yellow;
}

.eye {
  position: absolute;
  color: gold;
}

.form-text {
  color: gray;
}

.form-text a {
  color: green;
}

.form-text a.hover {
  font-size: larger;
  text-decoration: none;
}

.button .btn {
  margin: 40px auto 20px;
  width: 80%;
  display: block;
  outline: none;
  padding: 10px 0;
  border: 1px solid #fff;
  cursor: pointer;
  background: transparent;
  color: yellow;
  font-size: 16px;
  cursor: grab;
}

.btn:hover {
  background: rgb(26, 15, 2);
  opacity: 100%;
  border: 2px solid rgb(255, 255, 255);
  cursor: -moz-grabbing;
}

.sign-text {
  color: rgba(235, 236, 220, 0.815);
}

.sign-text a {
  color: rgb(255, 5, 5);
}

.sign-text a.hover {
  font-size: larger;
  text-decoration: none;
}
</style>
