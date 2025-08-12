<template>
  <header class="header">
    <nav class="navbar">
      <a
        href="/"
        class="logo"
        alt="CharitySite Logo"
      >
        <img
          src="/logo.png"
          alt="CharitySite Logo"
          class="logo-img"
        />
        <span>CharitySite</span>
      </a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/campaigns">Campaign</a></li>
        <li><a href="/about">About Us</a></li>
      </ul>
      <div class="auth-links">
        <a
          v-if="isAdmin"
          href="/admin"
          class="auth-button"
          >Admin</a
        >
        <a
          v-if="!isLoggedIn"
          href="/login"
          class="auth-button"
          >Login</a
        >
        <a
          v-if="!isLoggedIn"
          href="/signup"
          class="auth-button"
          >Sign Up</a
        >

        <a
          v-if="isLoggedIn"
          href="/profile"
          class="auth-button"
          >Profile</a
        >
        <a
          v-if="isLoggedIn"
          @click="handleLogout"
          class="auth-button"
          >Logout</a
        >
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(localStorage.getItem('access_token') !== null);
const isAdmin = ref(localStorage.getItem('role') === 'admin');

function handleLogout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_id');
  if (localStorage.getItem('role')) {
    localStorage.removeItem('role');
  }
  isLoggedIn.value = false;

  router.push('/login');
}
</script>

<style scoped>
.header {
  padding: 10px 20px;
  background: #fbfbfa;
  display: flex;
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 10px;
  font-size: 1.5rem;
  color: #77777f;
  font-weight: 700;
}

.logo span {
  color: #77777f;
}

.logo-img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 50px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  justify-content: center;
}

.nav-links a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
}

.nav-links a:hover {
  color: rgba(0, 0, 0, 0.8);
}

.auth-links {
  margin-left: auto;
  margin-right: 30px;
  display: flex;
  gap: 10px;
}

.auth-button {
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  color: #061f2e;
  cursor: pointer;
  text-decoration: none;
  font-weight: 700;
}

.auth-button:hover {
  color: #f28b18;
}
</style>
