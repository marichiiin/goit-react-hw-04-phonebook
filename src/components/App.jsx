import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  // componentDidMount() invoked after a component has been rendered to the Dom
  componentDidMount() {
    //if 'contacts' key in Local Storage is not null, we write it in the 'contacts' state
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      this.setState({contacts: JSON.parse(savedContacts)});
    } else {
      this.setState({
        contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
      });
    }
    console.log('componentDidMount()');
  }

  componentDidUpdate(_prevProps, prevState) {
    // if 'contacts' state is updated, set value to localStorage
    const { contacts } = this.state;
    
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    console.log('componentDidUpdate()')
  }
  // Create a function that add contact
  addContact = newContact => {
    this.setState(prevState =>({
      contacts: [...prevState.contacts, newContact],
    }));
  }

  // Create a function that delete contact
  deleteContact = id => {
    this.setState(prevState =>({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // Create a function for the filter state
  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  // Create a arrow function that returns the lowercase version of the value of the filter input
  filterContact = () =>{
    // 1. Destructure the state of the contacts and filter
    const { contacts, filter } = this.state;
    // 2. Transform the filter stae value into lowercase
    const filterValueToLowerCase = filter.toLowerCase();
    // 3. Check the contact list for the ones that is equal to the value of the filter state then return it
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterValueToLowerCase));
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} /> {/* Pass the funtion for adding contacts and the state contacts*/}

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList filterContact={this.filterContact} deleteContact={this.deleteContact} />
      </div>
    )
  }
}

