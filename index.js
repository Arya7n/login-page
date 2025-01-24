const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');
const viewDataBtn = document.getElementById('viewDataBtn');
const savedDataDiv = document.getElementById('savedData');

function validateForm() {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameInput.value.trim())) {
        alert("Invalid name format! Only alphabets are allowed.");
        return false;
    }

    if (!nameInput.value.trim() || !emailInput.value.trim() || !addressInput.value.trim()) {
        alert("All fields are required!");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert("Invalid email address!");
        return false;
    }

    return true;
}

function storeData() {
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        address: addressInput.value.trim(),
    };

    let existingData = localStorage.getItem('userData');
    if (existingData) {
        try {
            existingData = JSON.parse(existingData);
        } catch (error) {
            existingData = [];
        }
    } else {
        existingData = [];
    }

    existingData.push(userData);
    localStorage.setItem('userData', JSON.stringify(existingData));
    displayMessage("Data stored successfully!");
    clearForm();
}

function displayMessage(msg) {
    messageDiv.textContent = msg;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 3000);
}

function clearForm() {
    nameInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
}

function showSavedData() {
    let existingData = localStorage.getItem('userData');
    if (existingData) {
        try {
            existingData = JSON.parse(existingData);
            savedDataDiv.innerHTML = existingData.map(data => `
                <div>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <hr>
                </div>
            `).join('');
            savedDataDiv.classList.remove('hidden');
        } catch (error) {
            alert("Error retrieving saved data.");
        }
    } else {
        savedDataDiv.innerHTML = "No data available.";
        savedDataDiv.classList.remove('hidden');
    }
}

submitBtn.addEventListener('click', () => {
    if (validateForm()) {
        storeData();
    }
});

viewDataBtn.addEventListener('click', showSavedData);
