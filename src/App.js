import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import ViewSelectedContact from "./components/SelectedContact";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [newContactSubmitted, setNewContactSubmitted] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  const fetchData = async() => {
    const result = await fetch("http://localhost:3000/contacts")
    const data = await result.json()
    setContacts(data)
  }

  useEffect(() => {
    if(newContactSubmitted) {
      setNewContactSubmitted(false)
      fetchData()
    }
  }, [newContactSubmitted])
  
  console.log("contacts", contacts)

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setSelectedContact={setSelectedContact}
      />
      <main>
        {!hideForm && <CreateContactForm
          setNewContactSubmitted={setNewContactSubmitted}
          contacts={contacts}
          setHideForm={setHideForm}
        />}

        {hideForm && selectedContact && <ViewSelectedContact
          selectedContact={selectedContact}
        />}
      </main>
    </>
  );
}