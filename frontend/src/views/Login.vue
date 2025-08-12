<template>
  <div class="contain">
    <section class="login">
      <div class="container">
        <div class="">
          <div class="login-content">
            <div class="login-image">
              <figure>
                <a href="/"
                  ><img
                    src="/sign-up.png"
                    alt="Log in image"
                /></a>
              </figure>
              <a
                href="/signup"
                class="login-image-link underline"
                >Create an account</a
              >
            </div>

            <div class="login-form">
              <h2 class="form-title">Login</h2>
              <form
                method="POST"
                class="register-form"
                id="login-form"
                @submit.prevent="handleLogin"
              >
                <div class="form-group">
                  <label for="username"
                    ><i class="zmdi zmdi-account material-icons-name"></i
                  ></label>
                  <input
                    v-model="username"
                    type="text"
                    id="username"
                    placeholder="Account"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div class="form-group form-button">
                  <input
                    type="submit"
                    class="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import userService from '@/services/user.service';
import { useRouter } from 'vue-router';
import decodeToken from '../../utils/auth';

const username = ref('');
const password = ref('');
const router = useRouter();

const loginMutation = useMutation({
  mutationFn: async (loginData) => {
    const response = await userService.login(loginData);
    return response;
  },
  onSuccess: (data) => {
    const token = data.token;
    if (token) {
      localStorage.setItem('access_token', token);
      const decoded = decodeToken();
      router.push('/');
    } else {
      alert('Login failed: No token received');
    }
  },
  onError: (error) => {
    console.error('Login failed:', error);

    if (error.response && error.response.data && error.response.data.message) {
      alert('Login failed: ' + error.response.data.message);
    } else {
      alert('Login failed: ' + error.message);
    }
  }
});

async function handleLogin() {
  try {
    loginMutation.mutate({ username: username.value, password: password.value });
  } catch (error) {
    console.error('Login failed:', error.message);
    alert('Login failed: ' + error.message);
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
section.login {
  height: 100vh;
  padding: 120px 0;
}

display-flex,
.display-flex,
.display-flex-center,
.login-content,
.social-login,
.socials {
  display: flex;
  display: -webkit-flex;
}

list-type-ulli,
.socials {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a:focus,
a:active {
  text-decoration: none;
  outline: none;
  transition: all 300ms ease 0s;
  -moz-transition: all 300ms ease 0s;
  -webkit-transition: all 300ms ease 0s;
  -o-transition: all 300ms ease 0s;
  -ms-transition: all 300ms ease 0s;
}

input,
select,
textarea {
  outline: none;
  appearance: unset !important;
  -moz-appearance: unset !important;
  -webkit-appearance: unset !important;
  -o-appearance: unset !important;
  -ms-appearance: unset !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  margin: 0;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -o-box-shadow: none !important;
  -ms-box-shadow: none !important;
}

input[type='checkbox'] {
  appearance: checkbox !important;
  -moz-appearance: checkbox !important;
  -webkit-appearance: checkbox !important;
  -o-appearance: checkbox !important;
  -ms-appearance: checkbox !important;
}

input[type='radio'] {
  appearance: radio !important;
  -moz-appearance: radio !important;
  -webkit-appearance: radio !important;
  -o-appearance: radio !important;
  -ms-appearance: radio !important;
}

img {
  max-width: 100%;
  height: auto;
}

figure {
  margin: 0;
}

p {
  margin-bottom: 0px;
  font-size: 15px;
  color: #777;
}

h2 {
  line-height: 1.66;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: #222;
  font-family: Poppins;
  font-size: 36px;
}

.main {
  background: #f8f8f8;
  padding: 150px 0;
}

.clear {
  clear: both;
}

body {
  font-size: 13px;
  line-height: 1.8;
  color: #222;
  background: #f8f8f8;
  font-weight: 400;
  font-family: Poppins;
}

.container {
  width: 900px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  -o-border-radius: 20px;
  -ms-border-radius: 20px;
}

.display-flex {
  justify-content: space-between;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  -o-justify-content: space-between;
  -ms-justify-content: space-between;
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
}

.display-flex-center {
  justify-content: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
}

.position-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.contain {
  background: url('https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
.login {
  margin-bottom: 150px;
}

.login-form,
.login-image {
  width: 50%;
  overflow: hidden;
}

.login-image {
  margin: 0 55px;
}

.form-title {
  margin-bottom: 33px;
}

.login-image {
  margin-top: 45px;
}

figure {
  margin-bottom: 50px;
  text-align: center;
}

.form-submit {
  display: inline-block;
  background: #6dabe4;
  color: #fff;
  border-bottom: none;
  width: auto;
  padding: 15px 39px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  margin-top: 25px;
  cursor: pointer;
}
.form-submit:hover {
  background: #4292dc;
}

#login {
  margin-top: 16px;
}

.login-image-link {
  font-size: 14px;
  color: #222;
  display: block;
  text-align: center;
}

.login-form {
  margin-left: 75px;
  margin-right: 75px;
  padding-left: 34px;
}

.register-form {
  width: 100%;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
  overflow: hidden;
}
.form-group:last-child {
  margin-bottom: 0px;
}

input {
  width: 100%;
  display: block;
  border: none;
  border-bottom: 1px solid #999;
  padding: 6px 30px;
  font-family: Poppins;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  color: #999;
}
input::-moz-placeholder {
  color: #999;
}
input:-ms-input-placeholder {
  color: #999;
}
input:-moz-placeholder {
  color: #999;
}
input:focus {
  border-bottom: 1px solid #222;
}
input:focus::-webkit-input-placeholder {
  color: #222;
}
input:focus::-moz-placeholder {
  color: #222;
}
input:focus:-ms-input-placeholder {
  color: #222;
}
input:focus:-moz-placeholder {
  color: #222;
}

input[type='checkbox']:not(old) {
  width: 2em;
  margin: 0;
  padding: 0;
  font-size: 1em;
  display: none;
}

input[type='checkbox']:not(old) + label {
  display: inline-block;
  line-height: 1.5em;
  margin-top: 6px;
}

input[type='checkbox']:not(old) + label > span {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 15px;
  margin-bottom: 3px;
  border: 1px solid #999;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  -o-border-radius: 2px;
  -ms-border-radius: 2px;
  background: white;
  background-image: -moz-linear-gradient(white, white);
  background-image: -ms-linear-gradient(white, white);
  background-image: -o-linear-gradient(white, white);
  background-image: -webkit-linear-gradient(white, white);
  background-image: linear-gradient(white, white);
  vertical-align: bottom;
}

input[type='checkbox']:not(old):checked + label > span {
  background-image: -moz-linear-gradient(white, white);
  background-image: -ms-linear-gradient(white, white);
  background-image: -o-linear-gradient(white, white);
  background-image: -webkit-linear-gradient(white, white);
  background-image: linear-gradient(white, white);
}

input[type='checkbox']:not(old):checked + label > span:before {
  content: '\f26b';
  display: block;
  color: #222;
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  font-family: 'Material-Design-Iconic-Font';
  font-weight: bold;
}

.agree-term {
  display: inline-block;
  width: auto;
}

label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  color: #222;
}

.label-has-error {
  top: 22%;
}

label.error {
  position: relative;
  background: url('../images/unchecked.gif') no-repeat;
  background-position-y: 3px;
  padding-left: 20px;
  display: block;
  margin-top: 20px;
}

label.valid {
  display: block;
  position: absolute;
  right: 0;
  left: auto;
  margin-top: -6px;
  width: 20px;
  height: 20px;
  background: transparent;
}
label.valid:after {
  font-family: 'Material-Design-Iconic-Font';
  content: '\f269';
  width: 100%;
  height: 100%;
  position: absolute;
  /* right: 0; */
  font-size: 16px;
  color: green;
}

.label-agree-term {
  position: relative;
  top: 0%;
  transform: translateY(0);
  -moz-transform: translateY(0);
  -webkit-transform: translateY(0);
  -o-transform: translateY(0);
  -ms-transform: translateY(0);
}

.material-icons-name {
  font-size: 18px;
}

.login-content {
  padding-top: 67px;
  padding-bottom: 87px;
}

.social-login {
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  margin-top: 80px;
}

.social-label {
  display: inline-block;
  margin-right: 15px;
}

.socials li {
  padding: 5px;
}
.socials li:last-child {
  margin-right: 0px;
}
.socials li a {
  text-decoration: none;
}
.socials li a i {
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  transform: translateZ(0);
  -moz-transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.socials li:hover a i {
  -webkit-transform: scale(1.3) translateZ(0);
  transform: scale(1.3) translateZ(0);
}

.zmdi-facebook {
  background: #3b5998;
}

.zmdi-twitter {
  background: #1da0f2;
}

.zmdi-google {
  background: #e72734;
}

.login-form {
  margin-right: 90px;
  margin-left: 80px;
}

.login-image {
  margin-left: 110px;
  margin-right: 20px;
  margin-top: 10px;
}
</style>
