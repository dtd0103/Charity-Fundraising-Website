<template>
  <Header></Header>

  <div class="flex h-full">
    <LeftSideBar></LeftSideBar>
    <table class="w-full bg-white rounded-md shadow-md table-fixed">
      <thead>
        <tr class="bg-gray-300 text-left">
          <th class="p-4 font-semibold">Donation ID</th>
          <th class="p-4 font-semibold">Donor Name</th>
          <th class="p-4 font-semibold">Amount</th>
          <th class="p-4 font-semibold">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="donation in paginatedDonations"
          :key="donation.donation_id"
          class="border-b border-gray-300"
        >
          <td class="p-4">{{ donation.donation_id }}</td>
          <td class="p-4">{{ donation.user_name }}</td>
          <td class="p-4">{{ donation.amount }}</td>
          <td class="p-4">{{ format(new Date(donation.donated_at), 'MMMM dd, yyyy HH:mm') }}</td>
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
import { format } from 'date-fns';
import Header from '@/components/Header.vue';
import LeftSideBar from '@/components/LeftSideBar.vue';
import donationService from '@/services/donation.service';
import userService from '@/services/user.service';

const currentPage = ref(1);
const itemsPerPage = 5;
const donations = ref({ donations: [] });
const usersCache = ref(new Map());

const totalPages = computed(() => {
  return Math.ceil(donations.value.donations.length / itemsPerPage);
});

const paginatedDonations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return donations.value.donations.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const fetchUserName = async (donation) => {
  if (usersCache.value.has(donation.donor_id)) {
    donation.user_name = usersCache.value.get(donation.donor_id);
  } else {
    try {
      const { user } = await userService.getUser(donation.donor_id);

      donation.user_name = user.user.username;
      usersCache.value.set(donation.donor_id, user.user.username);
    } catch (error) {
      console.error(`Error fetching user for donor_id ${donation.donor_id}`, error);
      donation.user_name = 'Unknown';
    }
  }
};

onMounted(async () => {
  try {
    const response = await donationService.getAllDonation();
    donations.value = response;
    for (const donation of donations.value.donations) {
      fetchUserName(donation);
    }
  } catch (error) {
    console.error('Error fetching donations:', error);
  }
});
</script>
