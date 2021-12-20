import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import ViewSelectedContact from "./components/SelectedContact";
import EditContactForm from "./components/EditContactForm"
import "./styles/styles.css";
import { unmountComponentAtNode } from "react-dom";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [newContactSubmitted, setNewContactSubmitted] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactToEdit, setContactToEdit] = useState(null)

  const fetchData = async() => {
    const result = await fetch("http://localhost:3000/contacts")
    const data = await result.json()
    setContacts(data)
  }

  useEffect(() => {
    fetchData()
  }, [newContactSubmitted])

  useEffect(() => {
    contacts.forEach(contact => {
        contact.id == newContactSubmitted.id ? setSelectedContact(contact) : null;
    })
  }, [contacts])
  
  console.log("contacts", contacts)
  console.log("selected", selectedContact)
  console.log("editing", contactToEdit)

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setSelectedContact={setSelectedContact}
        setContactToEdit={setContactToEdit}
      />
      <main>
        {!hideForm && !selectedContact && !contactToEdit && <CreateContactForm
            setNewContactSubmitted={setNewContactSubmitted}
            contacts={contacts}
            setHideForm={setHideForm}
        />}

        {!hideForm && contactToEdit && <EditContactForm
            setNewContactSubmitted={setNewContactSubmitted}
            setHideForm={setHideForm}
            contactToEdit={contactToEdit}
        />}

        {hideForm && selectedContact && <ViewSelectedContact
            selectedContact={selectedContact}
        />}
      </main>
    </>
  );
}