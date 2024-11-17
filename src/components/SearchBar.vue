<template>
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Искать контакты по имени"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useContactsStore } from '../stores/contacts';
  
  const store = useContactsStore();
  const searchQuery = ref('');
  
  const handleSearch = () => {
    store.setSearchQuery(searchQuery.value);
  };
  </script>