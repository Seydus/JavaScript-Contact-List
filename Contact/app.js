const contactTable = document.getElementById("contact-table");
const contactModal = document.getElementById("contact-modal");
const modalTitle = document.getElementById("modal-title");
const addContactButton = document.getElementById("add-contact-button");
const saveButton = document.getElementById("save-button");
const lastNameInput = document.getElementById("lastName");
const firstNameInput = document.getElementById("firstName");
const emailInput = document.getElementById("email");
const contactNumberInput = document.getElementById("contactNumber");
let editing = false;
let editedRowIndex = -1;

function openModal(isEditing = false) {
    editing = isEditing;
    if (editing) {
      modalTitle.textContent = "Edit Contact";
      saveButton.textContent = "Save Changes";
    } else {
      modalTitle.textContent = "Add Contact";
      saveButton.textContent = "Save";
    }
    contactModal.style.display = "block";
  }

function closeModal() {
  contactModal.style.display = "none";
  clearForm();
}

function clearForm() {
  lastNameInput.value = "";
  firstNameInput.value = "";
  emailInput.value = "";
  contactNumberInput.value = "";
}

function saveContact() {
  const lastName = lastNameInput.value;
  const firstName = firstNameInput.value;
  const email = emailInput.value;
  const contactNumber = contactNumberInput.value;

  if (lastName && firstName && email && contactNumber) {
    if (editing) {
      const row = contactTable.rows[editedRowIndex];
      const cells = row.cells;
      cells[0].textContent = lastName;
      cells[1].textContent = firstName;
      cells[2].textContent = email;
      cells[3].textContent = contactNumber;
      editing = false;
    } else {
      const newRow = contactTable.insertRow(-1);
      newRow.innerHTML = `
                        <td>${lastName}</td>
                        <td>${firstName}</td>
                        <td>${email}</td>
                        <td>${contactNumber}</td>
                        <td><button onclick="editContact(this)">Edit</button> <button onclick="deleteContact(this)">Delete</button></td>
                    `;
    }

    closeModal();
  }
}

function editContact(button) {
  openModal(true);
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  lastNameInput.value = cells[0].textContent;
  firstNameInput.value = cells[1].textContent;
  emailInput.value = cells[2].textContent;
  contactNumberInput.value = cells[3].textContent;

  editedRowIndex = row.rowIndex;
}

function deleteContact(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

addContactButton.addEventListener("click", () => openModal());