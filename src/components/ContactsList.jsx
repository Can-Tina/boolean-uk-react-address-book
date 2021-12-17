function ContactsList(props) {
  const { contacts, hideForm, setHideForm, setSelectedContact } = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => {
            setHideForm(!hideForm)
            setSelectedContact(null)
          }}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {

          return (
            <li key={index}>
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <button
                onClick={() => {
                    setHideForm(true)
                    setSelectedContact(contact)
                }}
                className="button"
              >
                View
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
