<template>
  <Header></Header>

  <div class="explore-projects-page">
    <div class="container">
      <h1 class="page-title">Explore Projects</h1>
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
        <span
          class="category see-all"
          @click="filterCampaigns('See All')"
          >See All ></span
        >
      </div>

      <div
        class="campaign-section"
        v-if="filteredCampaigns && filteredCampaigns.length > 0"
      >
        <h2 class="section-title">{{ selectedCategory || 'All' }} Campaigns</h2>
        <!-- <div class="campaign-list">
          <div
            class="campaign-card"
            v-for="campaign in filteredCampaigns"
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
        </div> -->
        <div class="campaign-list">
          <div
            class="campaign-card"
            v-for="campaign in paginatedCampaigns"
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
        </div>
      </div>

      <div class="pagination mt-10 flex gap-4 items-center justify-center">
        <button
          class="prev-page text-slate-50 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          :disabled="currentPage === 1"
          @click="currentPage = currentPage - 1"
        >
          Prev
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="next-page text-slate-50 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          :disabled="currentPage === totalPages"
          @click="currentPage = currentPage + 1"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import categoryService from '@/services/category.service';
import campaignService from '@/services/campaign.service';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const router = useRouter();
const projectCategories = ref([]);
const campaigns = ref([]);
const selectedCategory = ref(null);

const currentPage = ref(1);
const campaignsPerPage = ref(3);

const startIndex = computed(() => (currentPage.value - 1) * campaignsPerPage.value);
const endIndex = computed(() => startIndex.value + campaignsPerPage.value);

const totalPages = computed(() => {
  return Math.ceil(campaigns.value.length / campaignsPerPage.value);
});

const paginatedCampaigns = computed(() => {
  return campaigns.value.slice(startIndex.value, endIndex.value);
});

const fetchAllCampaigns = async () => {
  try {
    const data = await campaignService.getAllCampaign();
    campaigns.value = data.campaigns;
    console.log(campaigns);
  } catch (err) {
    console.error('Error fetching all campaigns:', err);
  }
};

const fetchCategoryData = async () => {
  try {
    const data = await categoryService.getAllCategory();
    projectCategories.value = data;
  } catch (err) {
    console.error('Error fetching categories:', err.message || 'Unknown error');
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
    const defaultCategory = projectCategories.value.categories.categories[0];
    selectedCategory.value = defaultCategory.category_name;
    await fetchCampaignByCategory(defaultCategory.category_id);
  } else {
    selectedCategory.value = 'See All';
    await fetchAllCampaigns();
  }
});

const filteredCampaigns = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'See All') {
    return campaigns.value;
  }
  return campaigns.value.filter((campaign) => campaign.category_name === selectedCategory.value);
});

const filterCampaigns = (category) => {
  if (category === 'See All') {
    selectedCategory.value = 'See All';
    fetchAllCampaigns();
  } else {
    selectedCategory.value = category.category_name || category;
    fetchCampaignByCategory(category.category_id);
  }
};

const navigateToDonate = (campaignId) => {
  router.push({ name: 'Campaign', params: { campaignId } });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.page-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 20px 0;
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
</style>
