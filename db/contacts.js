const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const {v4} = require("uuid");

async function updateContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

async function getContactById(contactId) {
    const contacts = await getContacts();
    const contactById = contacts.find(contact => contact.id === contactId);
    if(!contactById){
        return null;
    }
    return contactById;
}
  
async function removeContact(contactId) {
    const contacts = await getContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const newArray = contacts.filter((_, index) => index !== contactIndex);
    updateContacts(newArray);
    return contacts[contactIndex];
}
  
async function addContact(name, email, phone) {
    const contacts = await getContacts();
    const newContact = {id: v4(), name, email, phone};
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact
}