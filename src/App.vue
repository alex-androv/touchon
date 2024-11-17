<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Управление контактами</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <SearchBar />
        
        <div class="mb-6">
          <button
            @click="showForm = true"
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Добавить новый контакт
          </button>
        </div>

        <ContactList @edit="editContact" />
      </div>

      <Transition name="modal">
        <div v-if="showForm" @click.self="closeForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-semibold mb-4">
              {{ editingContact ? 'Редактировать контакт' : 'Добавить новый контакт' }}
            </h2>
            <ContactForm
              :edit-mode="!!editingContact"
              :contact="editingContact"
              @submit="handleFormSubmit"
            />
            <button
              @click="closeForm"
              class="mt-4 w-full px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
            >
              Отменить
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';
import type { Contact } from './types/contact';

const showForm = ref(false);
const editingContact = ref<Contact | null>(null);

const editContact = (contact: Contact) => {
  editingContact.value = contact;
  showForm.value = true;
};

const handleFormSubmit = () => {
  closeForm();
};

const closeForm = () => {
  showForm.value = false;
  editingContact.value = null;
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>