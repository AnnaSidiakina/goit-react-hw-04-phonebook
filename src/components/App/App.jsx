import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './App.module.css';
import Form from '../AddContactsForm/AddContactsForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  const formSubmitHandler = data => {
    const newContact = { ...data, id: nanoid() };
    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const deleteContact = contactID => {
    setContacts(contacts.filter(contact => contact.id !== contactID));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return filteredContacts;
  };
  const filteredContacts = getFilteredContacts();
  console.log(getFilteredContacts());

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <Form onSubmit={formSubmitHandler} />
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={filteredContacts}
          ondeleteContact={deleteContact}
        />
      </div>
    </>
  );
};

export default App;

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
