const contactTable = document.getElementById("contact-table");
const contactModal = document.getElementById("contact-modal");
const modalTitle = document.getElementById("modal-title");
const addContactButton = document.getElementById("add-contact-button");
const addButton = document.getElementById("add-button");
const lastNameInput = document.getElementById("lastName");
const firstNameInput = document.getElementById("firstName");
const emailInput = document.getElementById("email");
const contactNumberInput = document.getElementById("contactNumber");
let editing = false;
let editedRowIndex = -1;

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const contactNumber = document.getElementById("contactNumber").value;
    let idToUpdate = document.getElementById("contact-id").value;

    if (editing) {
      $.ajax({
        url: "index.php",
        method: "POST",
        data: {
          update: idToUpdate,
          firstName: firstName,
          lastName: lastName,
          email: email,
          contactNumber: contactNumber,
        },
        success: function (response) {
          closeModal();
          fetchData();
          idToUpdate = null;
        },
        error: function (xhr, status, error) {
          console.error(error);
        },
      });
    } else {
      $.ajax({
        url: "index.php",
        method: "POST",
        data: {
          submit: true,
          firstName: firstName,
          lastName: lastName,
          email: email,
          contactNumber: contactNumber,
        },
        success: function (response) {
          closeModal();
          fetchData();
        },
        error: function (xhr, status, error) {
          console.error(error);
        },
      });
    }
  });

function fetchData() {
  $.ajax({
    url: "index.php",
    method: "POST",
    data: { ajax: true },
    success: function (response) {
      const data = JSON.parse(response);
      const contactTable = document
        .getElementById("contact-table")
        .getElementsByTagName("tbody")[0];

      contactTable.innerHTML = "";

      data.forEach((item) => {
        const id = item.id;
        const firstName = item.firstName;
        const lastName = item.lastName;
        const email = item.email;
        const contactNumber = item.contactNumber;

        if (lastName && firstName && email && contactNumber) {
          const newRow = contactTable.insertRow(-1);
          newRow.innerHTML = `
              <td>${firstName}</td>
              <td>${lastName}</td>
              <td>${email}</td>
              <td>${contactNumber}</td>
              <td>
                <button data-id='${id}' onclick='editContact(this)'>Edit</button>
                <button data-id='${id}' onclick='deleteContact(this)'>Delete</button>
              </td>
            `;
        }
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

fetchData();

window.addEventListener("load", function () {
  closeModal();
});

function openModal(isEditing = false) {
  editing = isEditing;
  if (editing) {
    modalTitle.textContent = "Edit Contact";
    addButton.textContent = "Save";
  } else {
    modalTitle.textContent = "Add Contact";
    addButton.textContent = "Add";
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

function editContact(button) {
  openModal(true);
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  firstNameInput.value = cells[0].textContent;
  lastNameInput.value = cells[1].textContent;
  emailInput.value = cells[2].textContent;
  contactNumberInput.value = cells[3].textContent;

  document.getElementById("contact-id").value = button.getAttribute("data-id");

  editedRowIndex = row.rowIndex;
  addButton.textContent = "Save";
}

function deleteContact(button) {
  const idToDelete = button.getAttribute("data-id");
  console.log("ID to delete:", idToDelete);

  $.ajax({
    url: "index.php",
    method: "POST",
    data: { delete: idToDelete },
    success: function (response) {
      fetchData();
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

addContactButton.addEventListener("click", (event) => openModal());
