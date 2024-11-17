<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.name }"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Телефон</label>
        <input
          v-model="form.phone"
          type="tel"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.phone }"
        />
        <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.email }"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
  
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        {{ editMode ? 'Редактировать контакт' : 'Добавить новый контакт' }}
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useContactsStore } from '../stores/contacts';
  import type { Contact } from '../types/contact';
  
  const props = defineProps<{
    editMode?: boolean;
    contact?: Contact;
  }>();
  
  const emit = defineEmits(['submit', 'close']);
  const store = useContactsStore();
  
  const form = reactive({
    name: '',
    phone: '',
    email: ''
  });
  
  const errors = reactive({
    name: '',
    phone: '',
    email: ''
  });
  
  onMounted(() => {
    if (props.contact) {
      form.name = props.contact.name;
      form.phone = props.contact.phone;
      form.email = props.contact.email;
    }
  });
  
  const validateForm = () => {
    let isValid = true;
    errors.name = '';
    errors.phone = '';
    errors.email = '';
  
    if (!form.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
  
    if (!form.phone.trim()) {
      errors.phone = 'Phone is required';
      isValid = false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }
  
    return isValid;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
  
    if (props.editMode && props.contact) {
      store.updateContact({
        ...props.contact,
        ...form
      });
    } else {
      store.addContact(form);
    }
  
    emit('submit');
  };
  </script>