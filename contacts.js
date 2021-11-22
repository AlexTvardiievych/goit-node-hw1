const path = require("path");
const fs = require("fs").promises;
const generateUniqueId = require("generate-unique-id");
let res = {};

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf8");
    res = JSON.parse(contacts);
    console.table(JSON.parse(contacts));
    return JSON.parse(contacts);
}


async function getContactById(contactId) {
    const parsedContacts = await listContacts();
    res = parsedContacts.find((contact) => contact.id === Number(contactId));
    console.log(res);
    return res;
}

async function removeContact(contactId) {
    const parsedContacts = await listContacts();
    const updatedContacts = JSON.stringify(
        parsedContacts.filter((contact) => contact.id !== contactId)
    );
    console.log(`Contact, with contactId ${contactId}, deleted`);

    return fs.writeFile(contactsPath, updatedContacts, "utf8");
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const id = Number(generateUniqueId({ length: 5, useLetters: false }));
    const newContact = { id, name, email, phone };
    const updatedContacts = JSON.stringify([...contacts, newContact]);
    console.log(`Contact ${JSON.stringify(newContact)} added to list`);
    return await fs.writeFile(contactsPath, updatedContacts, "utf8");
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};