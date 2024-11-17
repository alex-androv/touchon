import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Contact } from '../types/contact';

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([]);
  const searchQuery = ref('');

  const loadContacts = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      contacts.value = JSON.parse(savedContacts);
    }
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  };

  const filteredContacts = computed(() => {
    return contacts.value.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: crypto.randomUUID()
    };
    contacts.value.push(newContact);
    saveContacts();
  };

  const updateContact = (updatedContact: Contact) => {
    const index = contacts.value.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
      saveContacts();
    }
  };

  const deleteContact = (id: string) => {
    contacts.value = contacts.value.filter(contact => contact.id !== id);
    saveContacts();
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    contacts,
    searchQuery,
    filteredContacts,
    addContact,
    updateContact,
    deleteContact,
    setSearchQuery,
    loadContacts
  };
});