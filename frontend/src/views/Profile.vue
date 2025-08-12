<template>
  <Header></Header>
  <div
    v-if="userProfile && userProfile.user"
    class="bg-white pt-4 pb-8 shadow-sm rounded-sm bg-[url('https://images.unsplash.com/photo-1449495169669-7b118f960251?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
  >
    <div class="flex items-center w-fit mx-auto space-x-2 font-semibold leading-8 text-2xl">
      <span class="text-primary">
        <svg
          class="h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </span>
      <span class="tracking-wide text-slate-200">User Profile</span>
    </div>
    <form
      @submit.prevent="updateUserProfile"
      class="text-gray-700 w-1/2 mx-auto bg-gray-200 rounded-md pb-8 mt-6"
    >
      <div class="grid md:grid-cols-1 p-10 gap-5">
        <div class="grid grid-cols-2">
          <label
            class="px-4 py-2 font-semibold"
            for="username"
            >User Name</label
          >
          <input
            type="text"
            id="username"
            class="px-4 py-2 border rounded"
            v-model="userProfile.user.username"
          />
        </div>
        <div class="grid grid-cols-2">
          <label
            class="px-4 py-2 font-semibold"
            for="email"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="px-4 py-2 border rounded"
            v-model="userProfile.user.email"
          />
        </div>
        <div class="grid grid-cols-2">
          <label
            class="px-4 py-2 font-semibold"
            for="phone"
            >Phone Number</label
          >
          <input
            type="text"
            id="phone"
            class="px-4 py-2 border rounded"
            v-model="userProfile.user.phone"
          />
        </div>
        <div class="grid grid-cols-2">
          <label
            class="px-4 py-2 font-semibold"
            for="role"
            >Role</label
          >
          <input
            type="text"
            id="role"
            class="px-4 py-2 border rounded"
            v-model="userProfile.user.role"
            disabled
          />
        </div>
        <div class="grid grid-cols-2">
          <label class="px-4 py-2 font-semibold">Created At:</label>
          <div class="px-4 py-2">{{ userProfile.user.created_at }}</div>
        </div>
        <div class="grid grid-cols-2">
          <label class="px-4 py-2 font-semibold">Updated At:</label>
          <div class="px-4 py-2">{{ userProfile.user.updated_at }}</div>
        </div>
      </div>
      <button
        type="submit"
        class="mt-4 ml-80 px-4 font-semibold py-2 bg-primary text-white rounded hover:opacity-90"
      >
        Save
      </button>
    </form>
  </div>
  <Footer></Footer>
</template>

<!-- <script setup>
import { ref, onMounted, watch } from 'vue';
import userService from '@/services/user.service';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const userProfile = ref({});
const userId = ref(null);
const isLoading = ref(false);
const isError = ref(false);
const error = ref(null);

const fetchUserData = async () => {
  if (!userId.value) return;
  isLoading.value = true;
  isError.value = false;
  error.value = null;
  try {
    const data = await userService.getUser(userId.value);
    userProfile.value = data.user;
  } catch (err) {
    isError.value = true;
    error.value = err;
    console.error('Error fetching user data:', err.message || 'Unknown error');
  } finally {
    isLoading.value = false;
  }
};

const updateUserProfile = async () => {
  try {
    isLoading.value = true;

    const response = await userService.updateUser(userId.value, userProfile.value);

    userProfile.value = response;
    await fetchUserData();

    alert('User profile updated successfully!');
  } catch (err) {
    console.error('Error updating user profile:', err.message || 'Unknown error');
    alert('Failed to update profile.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const storedUserId = localStorage.getItem('user_id');
  if (storedUserId) {
    userId.value = storedUserId;
    await fetchUserData();
  } else {
    console.error('No user ID found in localStorage');
    alert('User ID not found. Please log in again.');
  }
});

watch(() => {
  if (isLoading.value) {
    console.log('Loading user data...');
  }
});
</script> -->

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import userService from '@/services/user.service';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const userProfile = ref({});
const userId = ref(null);
const isLoading = ref(false);
const isError = ref(false);
const error = ref(null);

const fetchUserData = async () => {
  if (!userId.value) return;
  isLoading.value = true;
  isError.value = false;
  error.value = null;
  try {
    const data = await userService.getUser(userId.value);
    userProfile.value = data.user;
  } catch (err) {
    isError.value = true;
    error.value = err;
    console.error('Error fetching user data:', err.message || 'Unknown error');
  } finally {
    isLoading.value = false;
  }
};

const {
  mutate,
  isLoading: mutationLoading,
  isError: mutationError
} = useMutation({
  mutationFn: async (updatedProfile) => {
    if (!userId.value) {
      throw new Error('User ID is missing!');
    }
    const response = await userService.updateUser(userId.value, updatedProfile);
    return response;
  },
  onSuccess: async (response) => {
    userProfile.value = response;
    alert('User profile updated successfully!');
    await fetchUserData();
  },
  onError: (err) => {
    isError.value = true;
    error.value = err;
    console.error('Error updating user profile:', err.message || 'Unknown error');
    alert('Failed to update profile.');
  }
});

onMounted(async () => {
  const storedUserId = localStorage.getItem('user_id');
  if (storedUserId) {
    userId.value = storedUserId;
    await fetchUserData();
  } else {
    console.error('No user ID found in localStorage');
    alert('User ID not found. Please log in again.');
  }
});

const updateUserProfile = () => {
  if (userProfile.value) {
    mutate(userProfile.value);
  } else {
    alert('No profile data to update');
  }
};

watch(() => {
  if (isLoading.value) {
    console.log('Loading user data...');
  }
});
</script>
