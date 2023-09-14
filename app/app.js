function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();

    let fn = $("#firstName").val();
    let capitalfn = fn.charAt(0).toUpperCase() + fn.slice(1);
    let ln = $("#lastName").val();
    let capitalln = ln.charAt(0).toUpperCase() + ln.slice(1);
    let age = $("#age").val();
    let pn = $("#phone").val();
    let em = $("#email").val();
    let cs = $("#classes").val();

    // Check if any input is empty
    if (!fn || !ln || !age || !pn || !em || !cs) {
      alert("Please fill in all fields.");
      return; // Prevent further processing if any input is empty
    }

    let newArrClass = cs.split(",");

    let finalClassArray = [];

    let userObj = {
      fName: capitalfn,
      lName: capitalln,
      age: age,
      phone: pn,
      email: em,
      classes: [],
    };

    $.each(newArrClass, (idx, newClass) => {
      let cl = {
        className: newClass.trim(),
      };
      finalClassArray.push(cl);
      //   console.log(finalClassArray);
    });
    console.log(finalClassArray);
    userObj.classes = finalClassArray;
    console.log(userObj);

    addUser(userObj);
  });

  $("#getName").on("click", (e) => {
    getUser();
  });
}

function addUser(user) {
  $("#firstName").val("");
  $("#lastName").val("");
  $("#age").val("");
  $("#phone").val("");
  $("#email").val("");
  $("#classes").val("");

  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}

function getUser() {
  $("#app").html("");
  let allUsers = JSON.parse(localStorage.getItem("Classes"));

  $.each(allUsers, (idx, user) => {
    // Create a container for each user
    const userContainer = $(`
      <div class="studentContainer">
        <div class="studentNameBar">
          <h1>${user.fName} ${user.lName}</h1>
        </div>
        <div class="studentInfo">
          <h6>Age: <span>${user.age}</span></h6>
          <h6>Phone Number: <span>${user.phone}</span></h6>
          <h6>Email: <span>${user.email}</span></h6>
          <h5>Classes: <span></span></h5>
        </div>
      </div>
    `);

    // Append each class to the "Classes" section
    const classesSpan = userContainer.find(".studentInfo h5 span");
    const classesArray = user.classes.map((cls) => cls.className);
    classesSpan.text(classesArray.join(", "));

    // Append the user container to the #app element
    $("#app").append(userContainer);
  });
}

function connectToStorage() {
  if (localStorage) {
    let classes = localStorage.getItem("Classes");
    if (classes) {
      console.log("already there");
    } else {
      localStorage.setItem("Classes", "[]");
    }
  } else {
    console.log("no storage detected");
  }
}

$(document).ready(function () {
  initListeners();
  connectToStorage();
});
