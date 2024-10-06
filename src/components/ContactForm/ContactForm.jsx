import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };
  state = {
    name: '',
    number: '',
  }
  // Create function that handle the Name change
  handleNameChange = e => {
    this.setState({name: e.target.value});
  }

  // Create function that handle the Number change
  handleNumberChange = e => {
    this.setState({number: e.target.value});
  }

  // Create function that handle the submit button
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const {addContact, contacts } = this.props;
    // If the name/number field is empty exit this function
    if(name.trim() === '' || number.trim() === '') {
      return;
    }
    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLocaleLowerCase())

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim()
    });

    this.setState({
      name: '',
      number: ''
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.forms} onSubmit={this.handleSubmit}>
          <label>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Za-яА-Я]+(([' \-][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              value={name}
              onChange={this.handleNameChange}
            />
          </label>

          <label>
            <p>Number:</p>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleNumberChange}
            />
          </label>
          <button className={css.buttons} type="submit">Add Contact</button>
        </form>
    )
  }
}

