const { keccak256 } = require("ethereum-cryptography/keccak");
const {
  utf8ToBytes,
  toHex,
  hexToBytes,
} = require("ethereum-cryptography/utils");
const express = require("express");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT =
  "23b0ff06705d80de91cbb6cf5fbeea3c798d0353c4c0f8db3111ab94e9eeb7b0";

app.post("/gift", (req, res) => {
  const body = req.body;
  const name = body.name;
  const proof = body.proof;
  if (!name) {
    res.status(300).json({ Error: "No name supplied" });
  }

  if (!proof) {
    res.status(300).json({ Error: "No proof supplied" });
  }

  const length = proof.length;
  let currentHash = keccak256(utf8ToBytes(name));
  for (let i = 0; i < length; i++) {
    if (proof[i].left) {
      currentHash = keccak256(
        Buffer.concat([hexToBytes(proof[i].hash), currentHash])
      );
    } else {
      currentHash = keccak256(
        Buffer.concat([currentHash, hexToBytes(proof[i].hash)])
      );
    }
  }

  let isInTheList = false;
  if (toHex(currentHash) == MERKLE_ROOT) {
    isInTheList = true;
  }
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
