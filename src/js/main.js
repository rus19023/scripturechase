import Units from "./Units.js";

window.addEventListener("load", () => {
    const myUnits = new Units("#todos");
    myUnits.listAll();
});