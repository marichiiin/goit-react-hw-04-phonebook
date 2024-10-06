import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';


export const ContactListItem = ({filteredContact, deleteContact}) => {
    const handleDelete = () => {
        deleteContact(filteredContact.id);
    };
        return (
            <li>
                <span>{filteredContact.name}: </span>
                <span>{filteredContact.number} </span>
                <button className={css.deletebtn} onClick={handleDelete}> Delete </button>
            </li>
        );

};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};