//create an array of scriptures
const sList = [
  {
    itemKey: 1,
    itemName: "Buy Milk",
    itemDone: false
  },
  {
    itemKey: 2,
    itemName: "Buy Eggs",
    itemDone: false
  }
];

class scriptureModel {
  getAllScriptures(sList) {
    console.log(`getAllScriptures(sList): ${getAllScriptures(sList)}`);
    return JSON.stringify(sList);
  }

  // Get just one scripture by its reference
  getScriptureByRef(sRef) {
    return sList.find((s) => s.sRef === sRef);
  }
}

export default scriptureModel;