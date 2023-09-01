document.addEventListener("DOMContentLoaded", function () {
  const userList = document.getElementById("userList");
  const generateButton = document.getElementById("generateButton");
  const errors = document.getElementById("errors");
  const userCountInput = document.getElementById("userCount");
  const labels = document.querySelectorAll(".label");

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      label.classList.toggle("label-clicked");
    });
  });

  generateButton.addEventListener("click", generateUsers);

  async function generateUsers() {
    userList.innerHTML = "";
    const selectedFields = getSelectedFields();
    const userCount = parseInt(userCountInput.value);

    if (userCount <= 0) {
      errors.innerHTML = "Please, start from 1 !";
      return;
    }

    if (userCount > 50) {
      errors.innerHTML = "You can only generate up to 50 users !";
      return;
    }
    if (isNaN(userCount)) {
      errors.innerHTML = "Invalid input, only numbers are valid !";
      return;
    }

    if (selectedFields.length === 0) {
      errors.innerHTML = "Select at least one tag!";
      return;
    }

    try {
      const response = await fetch("users.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();

      for (let i = 0; i < userCount; i++) {
        const randomUser = getRandomUser(users, selectedFields);
        const listItem = document.createElement("li");
        listItem.innerHTML = randomUser;
        userList.appendChild(listItem);
      }
    } catch (error) {
      console.error("Error fetching or parsing JSON:", error);
    }
  }

  function getSelectedFields() {
    const selectedFields = [];

    if (document.getElementById("nameCheckbox").checked) {
      selectedFields.push("name");
    }
    if (document.getElementById("emailCheckbox").checked) {
      selectedFields.push("email");
    }
    if (document.getElementById("phoneCheckbox").checked) {
      selectedFields.push("phone");
    }
    if (document.getElementById("countryCheckbox").checked) {
      selectedFields.push("country");
    }
    if (document.getElementById("cityCheckbox").checked) {
      selectedFields.push("city");
    }
    if (document.getElementById("websiteCheckbox").checked) {
      selectedFields.push("website");
    }

    return selectedFields;
  }

  function getRandomUser(users, selectedFields) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    const userInfo = selectedFields.map((field) => {
      return ` ${user[field]}`;
    });
    return userInfo.join("<br>");
  }
});
