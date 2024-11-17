<template>
    <div
      class="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow duration-200"
      v-if="contact"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold">{{ contact.name }}</h3>
          <p class="text-gray-600">{{ contact.phone }}</p>
          <p class="text-gray-600">{{ contact.email }}</p>
        </div>
        <div class="space-x-2">
          <button
            @click="emit('edit')"
            class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
          >
            Редактировать
          </button>
          <button
            @click="handleDelete"
            class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Contact } from '../types/contact';
  import { useContactsStore } from '../stores/contacts';
  
  const props = defineProps<{
    contact: Contact;
  }>();
  
  const emit = defineEmits(['edit', 'delete']);
  const store = useContactsStore();
  
  const handleDelete = () => {
    if (confirm('Вы уверены что хотите удалить этот контакт?')) {
      store.deleteContact(props.contact.id);
      emit('delete');
    }
  };
  </script>