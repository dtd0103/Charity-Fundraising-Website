<template>
  <Header></Header>

  <div class="flex h-full">
    <LeftSideBar></LeftSideBar>
    <table class="w-full bg-white rounded-md shadow-md table-fixed">
      <thead>
        <tr class="bg-gray-300 text-left">
          <th class="p-4 font-semibold">Username</th>
          <th class="p-4 font-semibold">Email</th>
          <th class="p-4 font-semibold">Phone Number</th>
          <th class="p-4 font-semibold">Role</th>
          <th class="p-4 font-semibold">Created At</th>
          <th class="p-4 font-semibold text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="">
        <tr
          v-for="user in paginatedUsers"
          :key="user.user_id"
          class="border-b border-gray-300"
        >
          <td class="p-4">{{ user.username }}</td>
          <td class="p-4">{{ user.email }}</td>
          <td class="p-4">{{ user.phone }}</td>
          <td class="p-4">{{ user.role }}</td>
          <td class="p-4">
            {{ format(new Date(user.created_at), 'MMMM dd, yyyy HH:mm') }}
          </td>
          <td class="p-4">
            <div class="flex gap-2 justify-center">
              <button
                class="text-slate-50 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                @click="updateRole(user.user_id, user.role)"
              >
                Role
              </button>

              <button
                class="text-slate-50 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                @click="deleteUser(user.user_id)"
              >
                Delete
              </button>
            </div>
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
<!-- <script setup>
import { ref, onMounted, computed } from 'vue';
import Header from '@/components/Header.vue';
import LeftSideBar from '@/components/LeftSideBar.vue';
import userService from '@/services/user.service';
import { format } from 'date-fns';
const currentPage = ref(1);
const itemsPerPage = 2;
const users = ref({ users: [] });

const totalPages = computed(() => {
  return Math.ceil(users.value.users.length / itemsPerPage);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.users.slice(start, end);
});

console.log(paginatedUsers);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  try {
    const response = await userService.getAllUser();
    users.value = response.users;
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const updateRole = async (userId, oldRole) => {
  try {
    const newRole = oldRole === 'user' ? 'user' : 'admin';
    if (newRole) {
      console.log(newRole);
      const res = await userService.updateUser(userId, { role: newRole });

      alert('Role updated successfully!');

      const response = await userService.getAllUser();
      users.value = response.users;
    }
  } catch (error) {
    alert('Error updating role');
    console.error(error);
  }
};

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await userService.deleteUser(userId);
      alert('User deleted successfully!');

      const response = await userService.getAllUser();
      users.value = response.users;
    } catch (error) {
      alert('Error deleting user');
      console.error(error);
    }
  }
};
</script> -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import userService from '@/services/user.service';
import Header from '@/components/Header.vue';
import LeftSideBar from '@/components/LeftSideBar.vue';
import { format } from 'date-fns';

const currentPage = ref(1);
const itemsPerPage = 5;
const users = ref({ users: [] });

const totalPages = computed(() => {
  return Math.ceil(users.value.users.length / itemsPerPage);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.users.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  try {
    const response = await userService.getAllUser();
    users.value = response.users;
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const updateRoleMutation = useMutation({
  mutationKey: ['updateRole'],
  mutationFn: async ({ userId, newRole }) => {
    return userService.updateUser(userId, { role: newRole });
  },
  onSuccess: async () => {
    alert('Role updated successfully!');
    try {
      const response = await userService.getAllUser();
      users.value = response.users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  onError: (error) => {
    alert('Error updating role');
    console.error(error);
  }
});

const deleteUserMutation = useMutation({
  mutationKey: ['deleteUser'],
  mutationFn: async (userId) => {
    return userService.deleteUser(userId);
  },
  onSuccess: async () => {
    alert('User deleted successfully!');
    try {
      const response = await userService.getAllUser();
      users.value = response.users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  onError: (error) => {
    alert('Error deleting user');
    console.error(error);
  }
});

const updateRole = (userId, oldRole) => {
  const newRole = oldRole === 'user' ? 'admin' : 'user';
  updateRoleMutation.mutate({ userId, newRole });
};

const deleteUser = (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    deleteUserMutation.mutate(userId);
  }
};
</script>
