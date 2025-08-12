<!-- src/components/Banner.vue -->
<template>
  <div class="banner">
    <h1>Make a Difference Today</h1>
    <p>Your donation can change lives and communities around the world.</p>
  </div>
</template>

<script setup>
const scrollToCampaigns = () => {
  // Tìm phần tử có ID 'campaigns' và cuộn đến đó
  const campaignsSection = document.getElementById('campaigns');
  if (campaignsSection) {
    campaignsSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.banner {
  position: relative;
  text-align: center;
  padding: 100px 50px;
  background: url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    no-repeat center center;
  background-size: cover;
  color: #fff;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Lớp phủ tối 40% */
  z-index: 1;
}


.banner h1 {
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff; /* Màu trắng */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6); /* Đổ bóng màu tối */
  position: relative;
  z-index: 2;
}

.banner p {
  font-size: 1.5em;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 2;
}


</style>
