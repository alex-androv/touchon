<template>
    <div>
      <TransitionGroup name="list" tag="div">
        <ContactItem
          v-for="contact in store.filteredContacts"
          :key="contact.id"
          :contact="contact"
          @edit="editContact(contact)"
          @delete="handleDelete(contact.id)"
        />
      </TransitionGroup>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useContactsStore } from '../stores/contacts';
  import ContactItem from './ContactItem.vue';
  import type { Contact } from '../types/contact';
  
  const store = useContactsStore();
  const emit = defineEmits(['edit']);
  
  onMounted(() => {
    store.loadContacts();
  });
  
  const editContact = (contact: Contact) => {
    emit('edit', contact);
  };
  
  </script>
  
  <style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  </style>