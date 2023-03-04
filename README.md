# Gift List

Verification of data inclusion using Merkle Trees.

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.
Update the name parameter in the server server request to check with various names.

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `myMerkleTree.js` file handles the logic and implementation of Merkle Trees.
