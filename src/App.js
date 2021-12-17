import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [newContactSubmitted, setNewContactSubmitted] = useState(true)

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
      />
      <main>
        {!hideForm && <CreateContactForm
          setNewContactSubmitted={setNewContactSubmitted}
          contacts={contacts}
          setContacts={setContacts}
        />
      }</main>
    </>
  );
}