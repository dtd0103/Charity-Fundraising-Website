<template>
  <Header />
  <div class="home-page">
    <Banner />
    <div class="container">
      <div class="section featured-projects">
        <h2 class="section-title">Explore Projects</h2>
        <div
          class="project-categories"
          v-if="
            projectCategories &&
            projectCategories.categories &&
            projectCategories.categories.categories.length > 0
          "
        >
          <span
            class="category"
            v-for="category in projectCategories.categories.categories"
            :key="category.category_id"
            :class="{ active: selectedCategory === category.category_name }"
            @click="filterCampaigns(category)"
          >
            {{ category.category_name }}
          </span>
        </div>
      </div>

      <div
        class="section selected-category"
        v-if="selectedCategory"
      >
        <h2 class="section-title">{{ selectedCategory }} Campaigns</h2>
        <div
          v-if="limitedCampaigns && limitedCampaigns.length > 0"
          class="campaign-list"
        >
          <div
            class="campaign-card"
            v-for="campaign in limitedCampaigns"
            :key="campaign.campaign_id"
          >
            <img
              :src="campaign.campaign_media"
              alt="Campaign Image"
            />
            <h3 class="campaign-title">{{ campaign.title }}</h3>
            <p class="campaign-description">{{ campaign.description }}</p>
            <button
              class="btn-donate"
              @click="navigateToDonate(campaign.campaign_id)"
            >
              Donate Now
            </button>
          </div>
          <div
            v-if="filteredCampaigns.length > 3"
            class="see-more"
          >
            <button
              @click="router.push('/campaigns')"
              class="btn-donate btn-seemore"
            >
              See More Campaigns
            </button>
          </div>
        </div>
      </div>

      <div class="section how-it-works">
        <h2 class="section-title">How It Works</h2>
        <div class="steps">
          <div
            class="step"
            v-for="(step, index) in steps"
            :key="index"
          >
            <img
              :src="step.icon"
              :alt="'Step ' + (index + 1)"
            />
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import categoryService from '@/services/category.service';
import campaignService from '@/services/campaign.service';
import Banner from '../components/Banner.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { onMounted } from 'vue';

const router = useRouter();

const projectCategories = ref([]);

const campaigns = ref([]);

const steps = ref([
  {
    icon: 'https://cdn.pixabay.com/photo/2020/08/05/13/27/eco-5465459_640.png',
    title: 'Choose a Cause',
    description: 'Select from various projects that align with your values and passions.'
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2020/08/05/13/11/eco-5465425_640.png',
    title: 'Make a Donation',
    description: 'Support the campaign by making a donation securely online.'
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2020/08/05/13/28/eco-5465482_640.png',
    title: 'Impact the World',
    description: 'Your contribution helps fund impactful initiatives and change lives.'
  }
]);

const selectedCategory = ref(null);

const isLoading = ref(true);

const fetchCategoryData = async () => {
  try {
    const data = await categoryService.getAllCategory();
    projectCategories.value = data;
  } catch (err) {
    console.error('Error fetching categories:', err.message || 'Unknown error');
  } finally {
    isLoading.value = false;
  }
};

const fetchCampaignByCategory = async (categoryId) => {
  try {
    const data = await campaignService.getCampaignByCategoryId(categoryId);
    campaigns.value = data.campaigns.campaign;
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }
};

onMounted(async () => {
  await fetchCategoryData();

  if (
    projectCategories.value &&
    projectCategories.value.categories &&
    projectCategories.value.categories.categories.length > 0
  ) {
    selectedCategory.value = projectCategories.value.categories.categories[0].category_name;
    fetchCampaignByCategory(projectCategories.value.categories.categories[0].category_id);
  }
});

const filteredCampaigns = computed(() => {
  return campaigns.value.filter((campaign) => campaign.category_name === selectedCategory.value);
});

const limitedCampaigns = computed(() => {
  return filteredCampaigns.value.slice(0, 3);
});

const filterCampaigns = (category) => {
  selectedCategory.value = category.category_name || category;
  fetchCampaignByCategory(category.category_id);
};

const navigateToDonate = (campaignId) => {
  router.push({ name: 'Campaign', params: { campaignId } });
};
</script>

<style scoped>
.home-page {
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
  text-align: center;
  font-weight: bold;
}

.project-categories {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.category {
  padding: 10px 20px;
  font-size: 1rem;
  color: #333;
  background-color: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.category.active,
.category:hover {
  background-color: #ff6a13;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.category.see-all {
  font-weight: bold;
  padding: 10px 15px;
  border: 1px solid #ff6a13;
  color: #ff6a13;
}

.category.see-all:hover {
  background-color: #ff6a13;
  color: #fff;
}
.campaign-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.campaign-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease;
}

.campaign-card:hover {
  transform: translateY(-5px);
}

.campaign-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.campaign-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.campaign-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  color: #777;
  font-size: 1em;
  margin-bottom: 15px;
}

.btn-donate {
  padding: 10px 20px;
  background-color: #ff6a13;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.btn-donate:hover {
  background-color: #ff6a13;
}

.btn-seemore {
  margin-top: 20px;
  margin-left: 460px;
}

.how-it-works .steps {
  display: flex;
  justify-content: space-between;
  text-align: center;
  gap: 30px;
}

.step img {
  max-width: 80px;
  margin: auto;
}

.step h3 {
  font-size: 1.3em;
}

.step p {
  font-size: 1em;
  color: #555;
}

@media (max-width: 768px) {
  .campaign-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .campaign-card {
    width: 100%;
  }
}
</style>
