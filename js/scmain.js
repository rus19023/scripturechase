import Scriptures from "./Scriptures.js";

window.addEventListener("load", () => {
    const myScripture = new Scriptures("reflist");
    myScripture.listAll();
});