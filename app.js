const apiBaseUrl = 'https://rapid-polished-aardvark.ngrok-free.app'; // Replace with your API base URL

// Create a new user
document.getElementById('createUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const complete_name = document.getElementById('newUserName').value;
    const address = document.getElementById('newUserAddress').value;
    const birthday = document.getElementById('newUserBirthday').value;
    const age = document.getElementById('newUserAge').value;
    const contact_no = document.getElementById('newUserContact').value;
    const status = document.getElementById('newUserStatus').value;
    const lgn_network = document.getElementById('newUserLgnNetwork').value;

    fetch(`${apiBaseUrl}/add_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            complete_name, address, birthday, age, contact_no, status, lgn_network
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('User created successfully');
        viewUsers();  // Refresh the user list
    })
    .catch(error => console.error('Error:', error));
});

// View all users
function viewUsers() {
    fetch(`${apiBaseUrl}/view_users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';  // Clear current list
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Control No: ${user.control_no}, Name: ${user.complete_name}, Age: ${user.age}, Contact: ${user.contact_no}`;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Search for a user by name
function searchUser() {
    const name = document.getElementById('searchUserName').value;
    
    fetch(`${apiBaseUrl}/search_user/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';  // Clear current list
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Control No: ${user.control_no}, Name: ${user.complete_name}, Age: ${user.age}, Contact: ${user.contact_no}`;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Update a user
function updateUser() {
    const controlNo = document.getElementById('updateControlNo').value;
    const complete_name = document.getElementById('updateUserName').value;
    const address = document.getElementById('updateUserAddress').value;
    const birthday = document.getElementById('updateUserBirthday').value;
    const age = document.getElementById('updateUserAge').value;
    const contact_no = document.getElementById('updateUserContact').value;
    const status = document.getElementById('updateUserStatus').value;
    const lgn_network = document.getElementById('updateUserLgnNetwork').value;

    fetch(`${apiBaseUrl}/update_user/${controlNo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            complete_name, address, birthday, age, contact_no, status, lgn_network
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('User updated successfully');
        viewUsers();  // Refresh the user list
    })
    .catch(error => console.error('Error:', error));
}

// Delete a user
function deleteUser() {
    const controlNo = document.getElementById('deleteControlNo').value;
    
    fetch(`${apiBaseUrl}/delete_user/${controlNo}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('User deleted successfully');
        viewUsers();  // Refresh the user list
    })
    .catch(error => console.error('Error:', error));
}

// Initial load
viewUsers();
