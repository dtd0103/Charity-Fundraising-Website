<template>
  <Header></Header>
  <section class="about-section">
    <div class="container">
      <div class="row align-items-center justify-content-center text-center">
        <div class="col-md-6 d-flex justify-content-center">
          <div
            class="img-about"
            :style="{ backgroundImage: 'url(' + aboutImage + ')' }"
          ></div>
        </div>

        <div class="col-md-6">
          <h2 class="about-title">Welcome to Charity Website</h2>
          <p class="about-text">
            Charity Website was founded with a mission to bring hope and support to those who are
            struggling in their lives. We aim to make a real difference by connecting generous
            people like you with those in need. Our organization has been working tirelessly since
            its inception to provide help to the less fortunate, from those suffering from poverty
            to the victims of natural disasters, from orphaned children to the elderly who are
            isolated and alone.
          </p>
          <p class="about-text">
            Since our establishment in 2024, we have focused on delivering meaningful support to
            those who need it the most. Our approach is simple: we connect the kindness of generous
            donors with the needs of those who are vulnerable. Whether it’s providing food, shelter,
            medical aid, or educational support, your donations make a tangible difference in their
            lives.
          </p>
          <p class="about-text">
            By contributing to Charity Website, you’re not just making a financial contribution; you
            are investing in the future of those who are struggling. You are giving them a chance at
            a better life, at a brighter tomorrow. Every dollar you donate goes directly to funding
            these critical efforts, and together, we can transform lives.
          </p>
          <p class="about-text">
            Join us today in our mission to provide hope, dignity, and assistance to those who need
            it most. Your generosity can create lasting change and inspire others to follow your
            example.
          </p>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 text-center">
          <h3 class="about-mission-title">Our Mission</h3>
          <p class="about-text">
            Our mission is simple: to provide essential support to those in need and help them
            create a better future. We strive to ensure that every donation you make is used in the
            most transparent and efficient way possible, bringing real help to the people who need
            it the most. We believe that with your support, we can help transform lives and create a
            ripple effect of kindness and hope that will spread across communities.
          </p>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
const aboutImage = ref('/image.png');
</script>

<style scoped>
.about-section {
  margin: 0 auto;
  background-color: #f4f7fb;
}

.img-about {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.about-text {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-mission-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 2rem;
}

.row {
  justify-content: center;
  align-items: center;
}

.container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.col-md-6 {
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .col-md-6 {
    margin-bottom: 20px;
  }
}
</style>
