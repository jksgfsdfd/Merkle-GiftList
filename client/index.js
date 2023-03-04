const axios = require("axios");
const MyMerkle = require("../utils/myMerkleTree");
const nameList = require("../utils/niceList.json");

const serverUrl = "http://localhost:1225";

const namesMerkle = new MyMerkle(nameList);

async function main() {
  const length = nameList.length;
  const index = Math.floor(Math.random() * length + 1);
  const name = nameList[index];
  const proof = namesMerkle.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: "Hiju",
    proof,
  });

  console.log({ gift });
}

main();
