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

function getPosts() {
  http
    .get("http://localhost:3000/post")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const data = {
    title,
    body,
  };

  // create a post
  http
    .post("http://localhost:3000/post", data)
    .then((data) => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch((err) => console.log(err));
}
