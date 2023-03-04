const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

class MyMerkle {
  constructor(leaves) {
    this.leaves = leaves.map((leaf) => {
      return keccak256(utf8ToBytes(leaf));
    });
  }

  getRoot() {
    let temp = this.leaves;
    let length = temp.length;
    let insertingPos = 0;
    let extra = false;
    while (length > 1) {
      if (length % 2) {
        length--;
        extra = true;
      }
      for (let i = 0; i < length; i += 2) {
        temp[insertingPos] = keccak256(Buffer.concat([temp[i], temp[i + 1]]));
        insertingPos++;
      }
      if (extra) {
        temp[insertingPos] = temp[length + 1];
        length = insertingPos + 1;
      } else {
        length = insertingPos;
      }
      insertingPos = 0;
      extra = false;
    }

    return toHex(temp[0]);
  }

  getProof(index) {
    const proof = [];
    let temp = this.leaves;
    let length = temp.length;
    let insertingPos = 0;
    let extra = false;
    while (length > 1) {
      if (length % 2) {
        extra = true;
        length--;
      }
      for (let i = 0; i < length; i += 2) {
        if (i == index) {
          proof.push({ hash: toHex(temp[i + 1]), left: false });
          index = insertingPos;
        } else if (i + 1 == index) {
          proof.push({ hash: toHex(temp[i]), left: true });
          index = insertingPos;
        }
        temp[insertingPos] = keccak256(Buffer.concat([temp[i], temp[i + 1]]));
        insertingPos++;
      }
      if (extra) {
        temp[insertingPos] = temp[length + 1];
        insertingPos++;
        extra = false;
      }
      length = insertingPos;
      insertingPos = 0;
    }

    return proof;
  }
}

module.exports = MyMerkle;
