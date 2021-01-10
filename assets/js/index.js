// js chhỉ link cdn thui

const addUserForm = document.querySelector(".add-user-form");
const updateUserForm = document.querySelector(".update-user-form");
const removeBtn = document.querySelectorAll(".remove");
if (addUserForm) {
  addUserForm.addEventListener("submit", (e) => {
    alert("Created successfully");
  });
}
if (updateUserForm) {
  updateUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(updateUserForm);
    let dataUser = {};

    for (var pair of formData.entries()) {
      var object = Object.fromEntries([pair]);
      dataUser = { ...dataUser, ...object };
    }
    const id = dataUser._id;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", dataUser.name);
    urlencoded.append("email", dataUser.email);
    urlencoded.append("gender", dataUser.gender);
    urlencoded.append("status", dataUser.status);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`http://localhost:3000/api/users/${id}`, requestOptions)
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));
    alert("Updated successfully");
  });
}
if (removeBtn) {
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      location.reload();
    });
  });
}
