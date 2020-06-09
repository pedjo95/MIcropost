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

document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/post")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}
