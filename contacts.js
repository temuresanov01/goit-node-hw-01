const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');
// const { randomUUID } = require("crypto");


const contactsPath = path.join(__dirname, "db", "contacts.json");

const getListContacts = async() => {
  const listData = await fs.readFile(contactsPath);
  if (!listData) {
    return null;
  }
  const contacts = JSON.parse(listData);
  return contacts;
};

const getContactById = async(contactId) => {
  const contacts = await getListContacts();
  const result = contacts.find(contact => String(contact.id) === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContactById = async(removeContactId) => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex(contact => String(contact.id) === removeContactId);
  if (idx === -1) {
    return null; 
  };
  const newList = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return contacts[idx];
};

const addContact = async(data) => {
  const contacts = await getListContacts();
  const newContact = {id: nanoid(), ...data};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};
  
// const addContact = async(data) => {
//   const contacts = await getListContacts();
//   const newContact = {...data, id: randomUUID()};
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return newContact;
// };

module.exports =  {
  getListContacts,
  getContactById,
  removeContactById,
  addContact
};