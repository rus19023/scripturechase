import Scriptures from "./Scriptures.js";

window.addEventListener("load", () => {
    const myScripture = new Scriptures("scriptures");
    myScripture.listAll();
});