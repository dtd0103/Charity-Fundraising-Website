<template>
  <Header></Header>

  <div class="flex h-full">
    <LeftSideBar></LeftSideBar>
    <button
      @click="showAddCampaignModal = true"
      class="text-slate-50 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2 text-center me-2"
    >
      Add New Campaign
    </button>

    <div
      v-if="showAddCampaignModal"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div class="bg-slate-50 p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-semibold">Add New Campaign</h3>
        <form @submit.prevent="addCampaign">
          <input
            v-model="newCampaign.title"
            type="text"
            placeholder="Enter campaign title"
            class="mt-4 p-2 border rounded w-full"
          />
          <textarea
            v-model="newCampaign.description"
            placeholder="Enter campaign description"
            class="mt-4 p-2 border rounded w-full"
          ></textarea>
          <input
            v-model="newCampaign.goal_amount"
            type="number"
            placeholder="Enter goal amount"
            class="mt-4 p-2 border rounded w-full"
          />
          <select
            v-model="newCampaign.category_id"
            class="mt-4 p-2 border rounded w-full"
          >
            <option
              value=""
              disabled
            >
              Select a category
            </option>
            <option
              v-for="category in categories.categories"
              :key="category.category_id"
              :value="category.category_id"
            >
              {{ category.category_name }}
            </option>
          </select>
          <input
            type="file"
            @change="handleFileUpload"
            class="mt-4 p-2 border rounded w-full"
          />

          <div class="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              class="text-slate-50 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Add
            </button>
            <button
              @click="showAddCampaignModal = false"
              class="text-slate-50 mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showUpdateCampaignModal"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div class="bg-slate-50 p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-semibold">Update Campaign</h3>
        <form @submit.prevent="updateCampaign">
          <input
            v-model="updatedCampaign.title"
            type="text"
            placeholder="Enter campaign title"
            class="mt-4 p-2 border rounded w-full"
          />
          <textarea
            v-model="updatedCampaign.description"
            placeholder="Enter campaign description"
            class="mt-4 p-2 border rounded w-full"
          ></textarea>
          <input
            v-model="updatedCampaign.goal_amount"
            type="number"
            placeholder="Enter goal amount"
            class="mt-4 p-2 border rounded w-full"
          />
          <input
            v-model="updatedCampaign.raised_amount"
            type="number"
            placeholder="Enter raised amount"
            class="mt-4 p-2 border rounded w-full"
          />
          <input
            v-model="updatedCampaign.start_date"
            type="date"
            placeholder="Enter start date"
            class="mt-4 p-2 border rounded w-full"
          />
          <input
            v-model="updatedCampaign.end_date"
            type="date"
            placeholder="Enter end date"
            class="mt-4 p-2 border rounded w-full"
          />

          <select
            v-model="updatedCampaign.category_id"
            class="mt-4 p-2 border rounded w-full"
          >
            <option
              value=""
              disabled
            >
              Select a category
            </option>
            <option
              v-for="category in categories.categories"
              :key="category.category_id"
              :value="category.category_id"
            >
              {{ category.category_name }}
            </option>
          </select>

          <input
            type="file"
            @change="handleFileChange"
            class="mt-4 p-2 border rounded w-full"
          />

          <div class="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              class="text-slate-50 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Update
            </button>
            <button
              @click="showUpdateCampaignModal = false"
              class="text-slate-50 ml-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <table class="w-full bg-white rounded-md shadow-md table-fixed">
      <thead>
        <tr class="bg-gray-300 text-left">
          <th class="p-4 font-semibold">Title</th>
          <th class="p-4 font-semibold">Description</th>
          <th class="p-4 font-semibold">Media</th>
          <th class="p-4 font-semibold">Raised Amount</th>
          <th class="p-4 font-semibold">Goal Amount</th>
          <th class="p-4 font-semibold">Start Date</th>
          <th class="p-4 font-semibold">End Date</th>
          <th class="p-4 font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="campaign in paginatedCampaigns"
          :key="campaign.campaign_id"
          class="border-b border-gray-300"
        >
          <td class="p-4">{{ campaign.title }}</td>
          <td class="p-4">
            {{
              campaign.description.length > 50
                ? campaign.description.slice(0, 50) + '...'
                : campaign.description
            }}
          </td>
          <td class="p-4">
            <img
              :src="campaign.campaign_media"
              alt=""
            />
          </td>
          <td class="p-4">{{ campaign.raised_amount }}</td>
          <td class="p-4">{{ campaign.goal_amount }}</td>
          <td class="p-4">{{ format(new Date(campaign.start_date), 'MMMM dd, yyyy') }}</td>
          <td class="p-4">{{ campaign.end_date ? format(new Date(campaign.end_date), 'MMMM dd, yyyy') : 'None' }}</td>

          <td class="p-4">
            <button
              @click="openUpdateCampaignModal(campaign)"
              class="text-slate-50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Update
            </button>
            <button
              @click="deleteCampaign(campaign.campaign_id)"
              class="text-slate-50 mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex justify-center mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
    >
      <
    </button>
    <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
    >
      >
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { format } from 'date-fns';
import campaignService from '@/services/campaign.service';
import categoryService from '@/services/category.service';
import Header from '@/components/Header.vue';
import LeftSideBar from '@/components/LeftSideBar.vue';

const campaigns = ref([]);
const categories = ref([]);
const currentPage = ref(1);
const itemsPerPage = 3;

const showAddCampaignModal = ref(false);
const newCampaign = ref({
  title: '',
  description: '',
  goal_amount: 0,
  category_id: ''
});

const showUpdateCampaignModal = ref(false);
const updatedCampaign = ref({
  campaign_id: '',
  title: '',
  description: '',
  goal_amount: 0,
  raised_amount: 0,
  start_date: '',
  end_date: '',
  category_id: '',
  campaign_media: null
});

const openUpdateCampaignModal = (campaign) => {
  updatedCampaign.value = { ...campaign };
  showUpdateCampaignModal.value = true;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newCampaign.value.campaign_media = file;
  } else {
    newCampaign.value.campaign_media = null;
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    updatedCampaign.value.campaign_media = file;
  } else {
    updatedCampaign.value.campaign_media = null;
  }
};

const totalPages = computed(() => Math.ceil(campaigns.value.length / itemsPerPage));
const paginatedCampaigns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return campaigns.value.slice(start, end);
});
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  try {
    const campaignResponse = await campaignService.getAllCampaign();
    campaigns.value = campaignResponse.campaigns;
    const categoryResponse = await categoryService.getAllCategory();
    categories.value = categoryResponse.categories;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const addCampaignMutation = useMutation({
  mutationFn: (campaignData) => campaignService.createCampaign(campaignData),
  onSuccess: async () => {
    alert('Campaign added successfully!');
    showAddCampaignModal.value = false;
    const response = await campaignService.getAllCampaign();
    campaigns.value = response.campaigns;
  },
  onError: (error) => {
    alert('Error adding campaign');
    console.error(error);
  }
});

const addCampaign = () => {
  if (!newCampaign.value.title || !newCampaign.value.category_id) {
    alert('Please fill in all required fields');
    return;
  }
  addCampaignMutation.mutate(newCampaign.value);
};

const updateCampaignMutation = useMutation({
  mutationFn: ([campaignId, campaignData]) =>
    campaignService.updateCampaign(campaignId, campaignData),
  onSuccess: async () => {
    alert('Campaign updated successfully!');
    showUpdateCampaignModal.value = false;
    const response = await campaignService.getAllCampaign();
    campaigns.value = response.campaigns;
  },
  onError: (error) => {
    alert('Error updating campaign');
    console.error(error);
  }
});

const updateCampaign = () => {
  if (!updatedCampaign.value.title) {
    alert('Please fill in all required fields');
    return;
  }

  const { campaign_id, ...data } = updatedCampaign.value;
  console.log([campaign_id, data]);
  updateCampaignMutation.mutate([campaign_id, data]);
};

const deleteCampaignMutation = useMutation({
  mutationFn: (campaignId) => campaignService.deleteCampaign(campaignId),
  onSuccess: async () => {
    alert('Campaign deleted successfully!');
    const response = await campaignService.getAllCampaign();
    campaigns.value = response.campaigns || [];
  },
  onError: (error) => {
    alert('Error deleting campaign');
    console.error(error);
  }
});

const deleteCampaign = (campaignId) => {
  if (confirm('Are you sure you want to delete this campaign?')) {
    deleteCampaignMutation.mutate(campaignId);
  }
};
</script>
