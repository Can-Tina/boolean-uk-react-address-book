function ViewSelectedContact(props) {
    const { selectedContact } = props
    console.log(selectedContact)
    return (
        <div className={"form-stack light-shadow center address-card " + (selectedContact.blockContact ? 'blocked' : '')}>
            <h1>{selectedContact.firstName} {selectedContact.lastName}</h1>
            <h2>Address</h2>
            <p>{selectedContact.address.street}</p>
            <p>{selectedContact.address.city}</p>
            <p>{selectedContact.address.postCode}</p>
        </div>
    )
}

export default ViewSelectedContact