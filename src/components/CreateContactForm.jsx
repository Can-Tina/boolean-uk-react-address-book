import { useState } from "react";

function CreateContactForm({ contacts, setNewContactSubmitted, setHideForm }) {

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postCode: "",
    blockContact: false
  })

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

  const postData = async(fetchAddress, data) => {
    await fetch(`http://localhost:3000/${fetchAddress}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  
  const handleData = async (newContact, newAddress, contactId) => {
    await postData("contacts", newContact)
    await postData("addresses", newAddress)
    setHideForm(true)
    setNewContactSubmitted({id: contactId})
  }
  
  const findEmptyId = () => {
    let foundEmptyId = false
    let iteration = 1

    while (!foundEmptyId) {
      contacts.some(e => e.id == iteration) ? iteration++ : foundEmptyId = true;
    }
    return iteration;
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

    handleData(newContact, newAddress, contactId)
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
