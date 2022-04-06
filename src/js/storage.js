/*start with two...may add more later

read a value from local storage and parse it as JSON @param {string} key
The key under which the value is stored in LS
@return {array} The value as an array of objects */
const readFromLS = lskey => localStorage.getItem(lskey);

/*
write an array of objects to local storage under the provided key @param {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
*/
const writeToLS = (lskey, list) =>  localStorage.setItem(lskey, list);

// remove selected item from localStorage
const removeFromLS = (lskey, id) => localStorage.removeItem(lskey, id);

//  firebase add records without schema
const addToStorage = (lskey, record) => {
    let list = JSON.parse(lskey);
    list.push(record);
    // writeToStorage(lskey, JSON.stringify(list));
};

// add records WITH schema
const ToStorage = (lskey, record) => {
    let list = JSON.parse(lskey);
    list.push(record);
    // writeToStorage(lskey, JSON.stringify(list));
};

const updateStorageItem = (lskey, id, record) => {
    let list = JSON.parse(lskey);
    list.forEach(function (item) {
        if (item.id === id) {
            item = record;
        }
    });
    // writeToStorage(lskey, JSON.stringify(list));
};

const deleteFromStorage = (lskey, id) => {
    let list = JSON.parse(lskey);
    list.forEach(function (item, index) {
        if (item.id === id) {
            list.splice(index, 1);
        }
    });
    // writeToStorage(lskey, JSON.stringify(list));
};

const readFromStorage = (lskey) => {
    let list = JSON.parse(lskey);
    return list;
};


export { readFromLS, writeToLS, removeFromLS, readFromStorage, deleteFromStorage, updateStorageItem, addToStorage, ToStorage };