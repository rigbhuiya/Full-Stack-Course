import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card.jsx";
import contacts from "./Contact.js";

function createContact(contact)
{
  return <Card key={contact.id} name={contact.name} image={contact.image} tel={contact.tel} mail={contact.mail} />;
}


ReactDOM.render(
  <div>
    <h1>My Contacts</h1>

    {contacts.map(createContact)}
    

  </div>,
  document.getElementById("root")
);
