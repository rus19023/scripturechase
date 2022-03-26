// since we have multiple methods we need to export, it would make sense to group them together with an object of some sort. This could be as simple as an object literal...or more complex as a class.

class scripturesView {
  rendertodoList(sListElement,sList) {
    // I decided to let the controller handle where the list gets placed. So instead of getting the element here in the function, when I created the view I decided to pass the target element in.
    // const sListElement = document.getElementById('scriptures');

   sListElement.innerHTML = "";
    // the list of scriptures doesn't exist here in the view either...so I've passed that in as well.
   sList.forEach((sref) => {
      // notice the call to 'this' below. 'this' is like adding './' at the beginning of a path. It helps the computer find things.
     sListElement.appendChild(this.renderOneScripture(sref));
    });
  }
  renderOneTodo(parent,s) {
    const backButton = document.createElement("button");
    backButton.innerHTML = "&lt;- All scriptures";
    const item = document.createElement("li");
    item.innerHTML = `

      <li id="listitem" class="bordered row">
        <div id="boxborder" class="bordered">
          <label id="markbtn" for="checkbox" class="bordered">
            <input type="checkbox" id="checkbox" ontouchend="onTap.markDone()" class="bordered">
          </label>
        </div>
        <label id="itemtext">${s.sRef}</label>
        <button id="delbtn" class="todo-buttons" ontouchend="onTap.removeItem()">X</button>
      </li>
        `;
    parent.innerHTML = "";
    item.insertBefore(backButton, item.childNodes[0]);
    parent.appendChild(item);
    // send the button back to the controller to attach a listener
    return backButton;
  }
}
export default scripturesView;
