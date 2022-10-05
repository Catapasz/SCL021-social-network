import { login } from "../templates/login.js";
import { register } from "../templates/register.js";
import { wall } from "../templates/posts.js";

const routes = {
  "/": {
    template: login(),
  },
  register: {
    template: register(),
  },
  wall: {
    template: wall(),
  },
};

function navigate(route) {
  //, substr = ""
  console.log(route);
  const template = routes[route]?.template;
  //const addEvents =  routes[route].addEvents
  //const path = routes[route].path;
  history.pushState({}, route); //, `${path}?${substr}`
  const root = document.getElementById("root");
  root.innerHTML = "";
  //const element = document.createElement('div');
  //element.innerHTML=template;
  //console.log({template});
  root.appendChild(template); //element
  //addEvents()
}

export { navigate, routes };
