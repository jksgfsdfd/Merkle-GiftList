const MyMerkle = require("./myMerkleTree");
const nameList = require("./niceList.json");

const namesMerkle = new MyMerkle(nameList);

const root = namesMerkle.getRoot();
console.log(root);
