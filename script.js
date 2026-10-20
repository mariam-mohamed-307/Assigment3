const people = [
    { name: "Ahmed", age: 25, city: "Cairo" },
    { name: "Mona", age: 30, city: "Giza" },
    { name: "Omar", age: 22, city: "Alexandria" },
    { name: "Sara", age: 28, city: "Cairo" },
    { name: "Ali", age: 35, city: "Giza" },
    { name: "Nour", age: 24, city: "Alexandria" }
];

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const ageInput = document.getElementById("age");
    const successMessage = document.getElementById("successMessage");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        document.getElementById("confirmPasswordError").textContent = "";
        document.getElementById("ageError").textContent = "";
        successMessage.textContent = "";

        let isValid = true;

        if (nameInput.value.trim() === "") {
            document.getElementById("nameError").textContent = "Name is required.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === "") {
            document.getElementById("emailError").textContent = "Email is required.";
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            document.getElementById("emailError").textContent = "Enter a valid email.";
            isValid = false;
        }

        if (passwordInput.value.length < 8) {
            document.getElementById("passwordError").textContent =
                "Password must be at least 8 characters.";
            isValid = false;
        }

        if (confirmPasswordInput.value === "") {
            document.getElementById("confirmPasswordError").textContent =
                "Please confirm your password.";
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            document.getElementById("confirmPasswordError").textContent =
                "Passwords do not match.";
            isValid = false;
        }

        const age = Number(ageInput.value);

        if (ageInput.value.trim() === "") {
            document.getElementById("ageError").textContent = "Age is required.";
            isValid = false;
        } else if (!Number.isInteger(age) || age < 1 || age > 120) {
            document.getElementById("ageError").textContent =
                "Enter a valid age between 1 and 120.";
            isValid = false;
        }

        if (isValid) {
            successMessage.textContent = "Registration successful!";
            registrationForm.reset();
        }
    });
}

const searchInput = document.getElementById("searchInput");
const peopleTable = document.getElementById("peopleTable");
const noResults = document.getElementById("noResults");
const sortNameButton = document.getElementById("sortName");
const sortAgeButton = document.getElementById("sortAge");

if (searchInput && peopleTable && noResults) {
    let displayedPeople = [...people];

    function renderTable(data) {
        peopleTable.replaceChildren();

        if (data.length === 0) {
            noResults.textContent = "No results found.";
            return;
        }

        noResults.textContent = "";

        data.forEach(function (person) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = person.name;

            const ageCell = document.createElement("td");
            ageCell.textContent = person.age;

            const cityCell = document.createElement("td");
            cityCell.textContent = person.city;

            row.append(nameCell, ageCell, cityCell);
            peopleTable.appendChild(row);
        });
    }

    function filterPeople() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        displayedPeople = people.filter(function (person) {
            return (
                person.name.toLowerCase().includes(searchTerm) ||
                person.city.toLowerCase().includes(searchTerm) ||
                String(person.age).includes(searchTerm)
            );
        });

        renderTable(displayedPeople);
    }

    searchInput.addEventListener("input", filterPeople);

    if (sortNameButton) {
        sortNameButton.addEventListener("click", function () {
            displayedPeople.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            renderTable(displayedPeople);
        });
    }

    if (sortAgeButton) {
        sortAgeButton.addEventListener("click", function () {
            displayedPeople.sort(function (a, b) {
                return a.age - b.age;
            });

            renderTable(displayedPeople);
        });
    }

    renderTable(displayedPeople);
}