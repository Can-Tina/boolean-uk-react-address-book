import { useState, useEffect } from "react";

function CreateContactForm(props) {

  const { contacts, setContacts, setNewContactSubmitted } = props

  const findEmptyId = () => {
    let foundEmptyId = false
    let iteration = 0

    while (!foundEmptyId) {
      !contacts[iteration] ? foundEmptyId = true : iteration++;
    }
    return iteration + 1;
  }

  const initialFormState = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postCode: "",
    blockContact: false
  };

  const [formState, setFormState] = useState(initialFormState)

  const handleChange = (event) => {
    setFormState((previousForm) => ({
      ...previousForm,
      [event.target.name]: event.target.value
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormState((previousForm) => ({
      ...previousForm,
      [event.target.name]: event.target.checked
    }));
  };

  const postContact = async (newContact) => {
    await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
  };

  const postAddress = async (newAddress) => {
    await fetch("http://localhost:3000/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    });
  };
  
  const handleData = async (newContact, newAddress) => {
    await postContact(newContact)
    await postAddress(newAddress)
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/contacts")
      const data = await result.json()
      setContacts(data)
    }
    await fetchData()
    //setNewContactSubmitted(true)
  }
  
  const handleSubmit = () => {
    event.preventDefault()
    const contactId = findEmptyId()
    const newContact = {
      id: contactId,
      firstName: formState.firstName,
      lastName: formState.lastName,
      blockContact: formState.blockContact,
      addressId: contactId
    }

    const newAddress = {
      id: contactId,
      street: formState.street,
      city: formState.city,
      postCode: formState.postCode
    }

    handleData(newContact, newAddress)
  }

  

  return (
    <form className="form-stack light-shadow center contact-form" onSubmit={() => handleSubmit()}>
      <h1>Create Contact</h1>

      <label htmlFor="first-name-input">First Name:</label>
      <input id="first-name-input" name="firstName" type="text" onChange={() => handleChange(event)} />

      <label htmlFor="last-name-input">Last Name:</label>
      <input id="last-name-input" name="lastName" type="text" onChange={() => handleChange(event)} />

      <label htmlFor="street">Street:</label>
      <input id="street-input" name="street" type="text" onChange={() => handleChange(event)} />

      <label htmlFor="city">City:</label>
      <input id="city-input" name="city" type="text" onChange={() => handleChange(event)} />

      <label htmlFor="postCode">Post Code:</label>
      <input id="post-code-input" name="postCode" type="text" onChange={() => handleChange(event)} />

      <div className="checkbox-section">
        <input id="block-checkbox" name="blockContact" type="checkbox" onChange={() => handleCheckboxChange(event)} />
        <label htmlFor="blockContact">Block</label>
      </div>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>

    </form>
  );
}

export default CreateContactForm;
