<template>
  <Header></Header>

  <div class="flex h-full">
    <LeftSideBar></LeftSideBar>
    <button
      @click="showAddCategoryModal = true"
      class="text-slate-50 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2"
    >
      Add New Category <span class="block font-semibold text-2xl">+</span>
    </button>
    <div
      v-if="showAddCategoryModal"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div class="bg-slate-50 mb-80 p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-semibold">Add New Category</h3>
        <input
          v-model="newCategoryName"
          type="text"
          placeholder="Enter category name"
          class="mt-4 p-2 border rounded w-full"
        />
        <div class="mt-4 flex justify-end gap-2">
          <button
            @click="addCategory"
            class="text-slate-50 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Add
          </button>
          <button
            @click="showAddCategoryModal = false"
            class="text-slate-50 mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <table class="w-full bg-white rounded-md shadow-md table-fixed">
      <thead>
        <tr class="bg-gray-300 text-left">
          <th class="p-4 font-semibold">Category Name</th>
          <th class="p-4 font-semibold text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in paginatedCategories"
          :key="category.category_id"
          class="border-b border-gray-300"
        >
          <td class="p-4">{{ category.category_name }}</td>
          <td class="p-4">
            <div class="flex gap-2 justify-center">
              <button
                class="text-slate-50 ml-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                @click="deleteCategory(category.category_id)"
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

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import categoryService from '@/services/category.service';
import Header from '@/components/Header.vue';
import LeftSideBar from '@/components/LeftSideBar.vue';

const currentPage = ref(1);
const itemsPerPage = 5;
const categories = ref({ categories: [] });
const showAddCategoryModal = ref(false);
const newCategoryName = ref('');

const totalPages = computed(() => {
  return Math.ceil(categories.value.categories.length / itemsPerPage);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return categories.value.categories.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  try {
    const response = await categoryService.getAllCategory();
    categories.value = response.categories;
    console.log(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});

const deleteCategoryMutation = useMutation({
  mutationKey: ['deleteCategory'],
  mutationFn: async (categoryId) => {
    return categoryService.deleteCategory(categoryId);
  },
  onSuccess: async () => {
    alert('Category deleted successfully!');
    try {
      const response = await categoryService.getAllCategory();
      categories.value = response.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  onError: (error) => {
    alert('Error deleting category');
    console.error(error);
  }
});

const deleteCategory = (categoryId) => {
  if (confirm('Are you sure you want to delete this category?')) {
    deleteCategoryMutation.mutate(categoryId);
  }
};

const addCategoryMutation = useMutation({
  mutationKey: ['addCategory'],
  mutationFn: async (categoryName) => {
    return categoryService.createCategory({ category_name: categoryName });
  },
  onSuccess: async () => {
    alert('Category added successfully!');
    showAddCategoryModal.value = false;
    newCategoryName.value = '';
    try {
      const response = await categoryService.getAllCategory();
      categories.value = response.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  onError: (error) => {
    alert('Error adding category');
    console.error(error);
  }
});

const addCategory = () => {
  if (newCategoryName.value.trim()) {
    addCategoryMutation.mutate(newCategoryName.value);
  } else {
    alert('Please enter a category name');
  }
};
</script>
