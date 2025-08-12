<template>
  <Header></Header>
  <div class="donate-page">
    <div class="container">
      <div v-if="loading">Loading campaign details...</div>
      <div v-else-if="error">{{ error }}</div>
      <div
        v-else
        class="campaign-details-wrapper"
      >
        <div class="campaign-info">
          <h2 class="donate-title">{{ campaign.campaign.title }}</h2>
          <p class="campaign-description">{{ campaign.campaign.description }}</p>

          <p class="campaign-raised">
            <span class="highlight">${{ campaign.campaign.raised_amount }}</span> raised of ${{
              campaign.campaign.goal_amount
            }}
            goal
          </p>
          <div class="campaign-progress">
            <div
              class="progress-bar"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
          <p class="campaign-raised">Latest Update: {{ formattedUpdatedAt }}</p>
          <div class="donation-form">
            <form @submit.prevent="submitDonation">
              <label
                for="donation-amount"
                class="font-semibold mr-4"
                >Donation Amount:
              </label>
              <input
                type="number"
                step="any"
                v-model="donationAmount"
                id="donation-amount"
                required
                class="border-2 border-gray-950 rounded-md text-right"
              />

              <button
                type="submit"
                class="btn-donate w-full text-slate-50 block mt-6 bg-primary p-2 font-semibold"
              >
                DONATE NOW
              </button>
            </form>
          </div>
        </div>

        <div class="campaign-media">
          <img
            :src="campaign.campaign.campaign_media"
            alt="Campaign Image"
            class="campaign-image"
          />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import campaignService from '@/services/campaign.service';
import donationService from '@/services/donation.service';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { format } from 'date-fns';
const route = useRoute();
const campaign = ref(null);
const loading = ref(true);
const error = ref(null);
const donationAmount = ref(0);

onMounted(async () => {
  const campaignId = route.params.campaignId;
  if (!campaignId) {
    error.value = 'Campaign ID is missing!';
    return;
  }

  try {
    const campaignData = await campaignService.getCampaign(campaignId);
    campaign.value = campaignData;
    console.log(campaign);
  } catch (err) {
    error.value = err.message || 'Failed to fetch campaign data';
  } finally {
    loading.value = false;
  }
});

const formattedUpdatedAt = computed(() => {
  if (campaign.value && campaign.value.campaign && campaign.value.campaign.updated_at) {
    return format(new Date(campaign.value.campaign.updated_at), 'MMMM dd, yyyy HH:mm');
  }
  return '';
});

const progressPercent = computed(() => {
  const raised = campaign.value?.campaign.raised_amount || 0;
  const goal = campaign.value?.campaign.goal_amount || 0;
  if (goal === 0) return 0;
  return (raised / goal) * 100;
});

const fetchCampaignData = async () => {
  const campaignId = route.params.campaignId;
  if (!campaignId) {
    error.value = 'Campaign ID is missing!';
    return;
  }

  loading.value = true;
  try {
    const campaignData = await campaignService.getCampaign(campaignId);
    campaign.value = campaignData;
  } catch (err) {
    error.value = err.message || 'Failed to fetch campaign data';
  } finally {
    loading.value = false;
  }
};

const mutation = useMutation({
  mutationFn: async (donationData) => {
    const response = await donationService.createDonation(donationData);
    return response;
  },
  onSuccess: async () => {
    alert('Donation successful!');
    await fetchCampaignData();
  },
  onError: (error) => {
    alert(`Error: ${error.message}`);
  }
});

const submitDonation = () => {
  const donorId = localStorage.getItem('user_id');
  if (!donorId) {
    alert('User not logged in!');
    return;
  }

  const donationData = {
    donor_id: donorId,
    campaign_id: route.params.campaignId,
    amount: donationAmount.value
  };

  mutation.mutate(donationData);
};
</script>

<style scoped>
.donate-page {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #ebeeee;
  padding: 60px 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.campaign-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.campaign-info {
  flex: 1;
  margin-right: 20px;
}

.campaign-media {
  flex: 1;
  text-align: center;
}

.donate-title {
  font-size: 2.2em;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
  text-align: left;
}

.campaign-description {
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 0 10px;
  text-align: left;
}

.campaign-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.campaign-progress {
  position: relative;
  height: 10px;
  background-color: #e9ecef;
  margin: 15px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #b2bb1e;
  transition: width 0.3s ease;
}

.campaign-goal,
.campaign-raised {
  font-size: 1em;
  margin-bottom: 5px;
}

.campaign-raised {
  margin-bottom: 10px;
}

.highlight {
  color: #b2bb1e;
  font-size: 1.9em;
  font-style: normal;
  font-weight: 700;
}
</style>
