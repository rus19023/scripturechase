import * as ls from "./ls.js";
import * as util from "./utilities.js";

//let sList = [];
//const url = ''
const lskey = "reflist";
const bom = 'https://github.com/rus19023/scriptures-json/blob/master/reference/book-of-mormon-reference.json';
const pgp = 'https://github.com/rus19023/scriptures-json/blob/master/reference/pearl-of-great-price-reference.json';
const nt = 'https://github.com/rus19023/scriptures-json/blob/master/reference/new-testament-reference.json';
const ot = 'https://github.com/rus19023/scriptures-json/blob/master/reference/old-testament-reference.json';
const dc = 'https://github.com/rus19023/scriptures-json/blob/master/reference/doctrine-and-covenants-reference.json';

const bom2 = 'https://github.com/rus19023/scriptures-json/blob/master/flat/book-of-mormon-flat.json';
const pgp2 = 'https://github.com/rus19023/scriptures-json/blob/master/flat/pearl-of-great-price-flat.json';
const nt2 = 'https://github.com/rus19023/scriptures-json/blob/master/flat/new-testament-flat.json';
const ot2 = 'https://github.com/rus19023/scriptures-json/blob/master/flat/old-testament-flat.json';
const dc2 = 'https://github.com/rus19023/scriptures-json/blob/master/flat/doctrine-and-covenants-flat.json';

export default class Scriptures {
  // a class needs a constructor
  constructor(parentId) {
    this.parentId = parentId;
    this.source = 'https://github.com/rus19023/scriptures-json/blob/master/flat/old-testament-flat.json';
    this.sList = [];
    this.error = error;
    this.searchWord = util.qs("#search");
    this.srchbtn = util.qs("#srchbtn");
    this.allbtn = util.qs("#allbtn");
    //this.addbtn = util.qs('#addbtn');
    this.srchbtn.addEventListener(
      "touchend",
      () => {
        this.listFiltered();
      },
      false
    );
    this.allbtn.addEventListener(
      "touchend",
      () => {
        this.listAll();
      },
      false
    );
  }

  callAPI(url) {
    fetch(url)
    .then(response => {
      reflist.innerHTML = '';
      return response.json();
    })
    .then(data => {
      console.log(data);
      data.results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        sList.appendChild(li);
      });
    })
    .catch(err => {
      console.log('Error in catch block:', err);
    });
  }
  callAPI(bom);

  listAll() {
    this.sList = getScriptures(lskey);
    this.rendersList(this.sList);
    this.itemsLeft();
  }

  quizCorrect() {
    console.log("quiz correct");
  }

  rendersList(renderlist) {
    // build new display
    const parentEl = util.qs('#reflist');
    parentEl.innerText = '';
    renderlist.forEach((field) => {
      // create new list item
      //            createLMNT(LMNT, LMNTtype, LMNTid, LMNTtext, LMNTclass)
      let item = util.createLMNT(
        "li",
        "",
        "",
        "",
        "listitem bordered item-row nodots"
      );
      let sRef = `${field.book} ${field.chapter}:${field.verse}`;
      // if (field.scripture.length > 75) {
      //   item.style.height = "12vh";
      // } else if (field.scripture.length > 30) {
      //   item.style.height = "10vh";
      // }
      let itemtext = util.createLMNT("p", "", "", field.scripture, "todo-text");
      let markbox = util.createLMNT(
        "label",
        `label${field.id}`,
        "",
        "",
        "bordered markbtn"
      );
      markbox.setAttribute("name", `label${field.id}`);
      let markbtn = util.createLMNT(
        "input",
        "checkbox",
        field.id,
        "",
        "markbtn chkbtn"
      );
      let delbtn = util.createLMNT(
        "button",
        "",
        `del${field.id}`,
        "X",
        "delbtn chkbtn"
      );
      if (field.done === true) {
        itemtext.classList.add("scratch");
        markbtn.classList.add("markbtnX");
        markbtn.checked = true;
      } else {
        markbtn.checked = false;
        markbtn.classList.remove("markbtnX");
        itemtext.classList.remove("scratch");
      }
      markbox.appendChild(markbtn);
      item.appendChild(markbox);
      item.appendChild(itemtext);
      item.appendChild(delbtn);
      parentEl.appendChild(item);
    });
    this.checkBtn();
  }

  checkBtn() {
    let btnitems = Array.from(document.querySelectorAll(".chkbtn"));
    btnitems.forEach(function (item) {
      item.addEventListener("touchend", function (e) {
        // check if the event is a checkbox
        if (e.target.type === "checkbox") {
          // get id from button id value and toggle the state
          markDone(e.target.getAttribute("id"));
        }
        // check if that is a delete-button
        if (e.target.classList.contains("delbtn")) {
          // get id from button id value and delete it
          deleteTodo(e.target.getAttribute("id"));
        }
        console.log(item);
      });
    });
  }

  listActive() {
    this.sList = getScriptures(lskey);
    this.sList = this.sList.filter((el) => el.done === false);
    this.rendersList(this.sList);
  }

  listDone() {
    this.sList = getScriptures(lskey);
    this.sList = this.sList.filter((el) => el.done === true);
    this.rendersList(this.sList);
  }

  listFiltered(searchKeyword) {
    this.sList = getScriptures(lskey);
    this.sList = this.sList.filter((el) => el.task.contains(searchKeyword));
    this.rendersList(this.sList);
  }
}

/***** END OF Scriptures CLASS *****/

/*
In the Scriptures.js module, but not in the Scriptures class create the following function
/ check the contents of sList, a local variable containing a list of Scriptures. If it is null then pull the list of Scriptures from localstorage, update the local variable, and return it
@param {string} key The key under which the value is stored under in LS @return {array} The value as an array of objects /
function getScriptures(key) { }
*/

function getScriptures(lskey) {
  let scripturelist = JSON.parse(ls.readFromLS(lskey)) || [];
  return scripturelist;
}

/*
In the Todo.js module, but not in the Scriptures class, create the following function
/* build a todo object, add it to the sList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS @param {string} scripture The text of the scripture to be saved.
A todo should look like this: { id : timestamp, content: string, completed: bool }
*/

function saveTodo(scripture, lskey) {
  let sList = getScriptures(lskey);
  // build todo object
  const todo = { id: Date.now(), scripture: scripture, done: false };
  // add obj to sList
  sList.push(todo);
  // save JSON.stringified list to ls
  ls.writeToLS(lskey, JSON.stringify(sList));
  location.reload();
}

function markDone(id) {
  sList = getScriptures(lskey);
  sList.forEach(function (item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.done = !item.done;
    }
  });
  // save modified JSON.stringified list to ls
  ls.writeToLS(lskey, JSON.stringify(sList));
  console.log(sList);
  location.reload();
}

function deleteTodo(id) {
  sList = getScriptures(lskey);
  sList = sList.filter((item) => item.id != id.substr(3, id.length));
  // save JSON.stringified list to ls
  ls.writeToLS("items", JSON.stringify(sList));
  location.reload();
}
