const path = require("path");
const fs = require("fs").promises;
const generateUniqueId = require("generate-unique-id");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf8");
    let res = {};

    res = JSON.parse(contacts);
    console.table(res);
    return res;
}


async function getContactById(contactId) {
    const parsedContacts = await listContacts();
    let res = {};
    res = parsedContacts.find((contact) => contact.id === Number(contactId));
    console.log(res);
    return res;
}

async function removeContact(contactId) {
    const parsedContacts = await listContacts();
    const updatedContacts = JSON.stringify(
        parsedContacts.filter((contact) => contact.id !== contactId)
    );

    return fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
}

async function addContact(name, email, phone) {
    if (name === undefined || email === undefined || phone === undefined)
        return console.error("Please, fill all arguments");

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