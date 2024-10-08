import React, { useState, useEffect, useRef } from 'react'
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const defaultcontacts = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ];
  const [filter, setFilter] = useState('');
  const [contacts, setContact] = useState(()=> {
    const savedLocalContacts = localStorage.getItem('contacts');
    const parsedContacts = savedLocalContacts ? JSON.parse(savedLocalContacts) : [];
    return parsedContacts.length > 0 ? parsedContacts : defaultcontacts;
  });

  const prevContacts = useRef(contacts);
  //ComponentDidUpdate
  useEffect(()=>{
    if (contacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  },[prevContacts,contacts]);

  // Add Contact Funtion
  const addContact = newContact => {
    setContact([...prevContacts.current, newContact]);
  }

  // Delete Contact Function
  const deleteContact = id => {
    setContact(prevState => prevState.filter(contact => contact.id !== id));
  }

  // Filter State Function
  const setFilterFunc = filterValue => {
    setFilter(filterValue);
  }

  // Create a arrow function that returns the lowercase version of the value of the filter input
  const filterContact = () => {
    const filterValueToLowerCase = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterValueToLowerCase));
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} /> {/* Pass the funtion for adding contacts and the state contacts*/}

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilterFunc} />
      <ContactList filterContact={filterContact} deleteContact={deleteContact} />
    </div>
  )
}


