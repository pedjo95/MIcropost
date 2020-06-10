// Module Syntax
// const person = require("./module");

//Es2015 Module Imports
// import { person, sayHello } from "./module2";
// console.log(person.name);
// console.log(sayHello());

// import * as mod from "./module2";
// console.log(mod.person.name);
// console.log(mod.sayHello());

// import greeting from "./module2";
// console.log(greeting);

import { http } from "./http";
import { ui } from "./ui";

// Get posts
document.addEventListener("DOMContentLoaded", getPosts);

// Add posts
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Delete posts
document.querySelector("#posts").addEventListener("click", deletePost);

// Edit a post
document.querySelector("#posts").addEventListener("click", enableEdit);

// cancel edit apost
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getPosts() {
  http
    .get("http://localhost:3000/post")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
  };

  if (title === "" || body === "") {
    ui.showAlert("Please fill in all the fields", "alert alert-danger");
  } else {
    if (id === "") {
      // create a post
      http
        .post("http://localhost:3000/post", data)
        .then((data) => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      // update a post
      http
        .put(`http://localhost:3000/post/${id}`, data)
        .then((data) => {
          ui.showAlert("Post updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// delete a post
function deletePost(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/post/${id}`)
        .then((data) => {
          ui.showAlert("Post removed", "alert alert-success");

          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Edit state
function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = {
      id,
      title,
      body,
    };

    // fill form with post
    ui.fillForm(data);
  }
}

// cancel edit
function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
