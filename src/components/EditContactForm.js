import { useEffect, useState } from "react";

function EditContactForm({
  setNewContactSubmitted,
  setHideForm,
  contactToEdit,
}) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    setFormState({
      firstName: contactToEdit.firstName,
      lastName: contactToEdit.lastName,
      street: contactToEdit.address.street,
      city: contactToEdit.address.city,
      postCode: contactToEdit.address.postCode,
      blockContact: contactToEdit.blockContact,
    });
  }, [contactToEdit]);

  const handleChange = (event) => {
    setFormState((previousForm) => ({
      ...previousForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormState((previousForm) => ({
      ...previousForm,
      [event.target.name]: event.target.checked,
    }));
  };

  const postData = async(fetchAddress, data) => {
    await fetch(`http://localhost:3000/${fetchAddress}/${contactToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  };

  const handleData = async (newContact, newAddress) => {
    await postData("contacts", newContact)
    await postData("addresses", newAddress)
    setHideForm(true)
    setNewContactSubmitted(contactToEdit)
  }

  const handleSubmit = () => {
    event.preventDefault()

    const newContact = {
      id: contactToEdit.id,
      firstName: formState.firstName,
      lastName: formState.lastName,
      blockContact: formState.blockContact,
      addressId: contactToEdit.id
    }

    const newAddress = {
      id: contactToEdit.id,
      street: formState.street,
      city: formState.city,
      postCode: formState.postCode
    }

    handleData(newContact, newAddress)
  }

  return (
    <form
      className="form-stack light-shadow center contact-form"
      onSubmit={() => handleSubmit()}
    >
      <h1>Edit Contact</h1>

      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="firstName"
        type="text"
        onChange={() => handleChange(event)}
        value={formState.firstName}
      />

      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="lastName"
        type="text"
        onChange={() => handleChange(event)}
        value={formState.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street-input"
        name="street"
        type="text"
        onChange={() => handleChange(event)}
        value={formState.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city-input"
        name="city"
        type="text"
        onChange={() => handleChange(event)}
        value={formState.city}
      />

      <label htmlFor="postCode">Post Code:</label>
      <input
        id="post-code-input"
        name="postCode"
        type="text"
        onChange={() => handleChange(event)}
        value={formState.postCode}
      />

      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="blockContact"
          type="checkbox"
          onChange={() => handleCheckboxChange(event)}
          checked={formState.blockContact}
        />
        <label htmlFor="blockContact">Block</label>
      </div>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;
