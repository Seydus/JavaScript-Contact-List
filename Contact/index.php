<?php
include 'dbconn.php';

$select = "SELECT * FROM userinfo";
$result = mysqli_query($conn, $select);

if (isset($_POST['ajax'])) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
    exit();
}

if (isset($_POST['submit'])) {
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $contactNumber = mysqli_real_escape_string($conn, $_POST['contactNumber']);

    $checkEmailQuery = "SELECT COUNT(*) FROM userinfo WHERE email = '$email'";
    $emailResult = mysqli_query($conn, $checkEmailQuery);
    $emailCount = mysqli_fetch_assoc($emailResult)['COUNT(*)'];

    if ($emailCount > 0) {
        echo "Email already exists. Please use a different email.";
        exit();
    }

    $insertQuery = "INSERT INTO userinfo (firstName, lastName, email, contactNumber) VALUES ('$firstName', '$lastName', '$email', '$contactNumber')";
    
    if (mysqli_query($conn, $insertQuery)) {
        echo "Contact added successfully!";
    } else {
        echo "Failed to add contact: " . mysqli_error($conn);
    }
}

if (isset($_POST['delete'])) {
    $idToDelete = $_POST['delete'];

    $deleteQuery = "DELETE FROM userinfo WHERE id = '$idToDelete'";
    if (mysqli_query($conn, $deleteQuery)) {
        echo "Deleted successfully!";
        exit();
    } else {
        echo "Failed to delete data: " . mysqli_error($conn);
        exit();
    }
}

if (isset($_POST['update'])) {
    $idToUpdate = $_POST['update'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $contactNumber = $_POST['contactNumber'];

    $updateQuery = "UPDATE userinfo SET firstName = '$firstName', lastName = '$lastName', email = '$email', contactNumber = '$contactNumber' WHERE id = '$idToUpdate'";

    if (mysqli_query($conn, $updateQuery)) {
        echo "Updated successfully!";
        exit();
    } else {
        echo "Failed to update data: " . mysqli_error($conn);
        exit();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" type="image/x-icon" href="./assets/icon.ico">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div id="contact-modal" class="modal" style="display:none;">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2 id="modal-title">Add Contact</h2>
            <form id="contact-form" method="POST">
                <input type="text" id="firstName" name="firstName" maxlength="50" placeholder="First Name" required>
                <input type="text" id="lastName" name="lastName" maxlength="50" placeholder="Last Name" required>
                <input type="email" id="email" name="email" maxlength="50" placeholder="Email Address" required>
                <input type="tel" id="contactNumber" name="contactNumber" pattern="[0-9]{1,15}" maxlength="15" placeholder="Contact Number" required>
                <span id="contactNumberWarning" class="warning"></span>
                <input type="hidden" id="contact-id" name="contact-id" value="">
                <button type="submit" name="submit" id="add-button">Add</button>
            </form>
        </div>
    </div>

    <main>
        <div class="header-container">
            <div class="contact-h1-container">
                <h1>Contacts</h1>
            </div>
            <div class="button-container">
                <button id="add-contact-button">Add Contact</button>
            </div>
        </div>

        <table id="contact-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </main>

    <script src="./app.js"></script>
</body>

</html>