const fs = require("fs");
const chunkSubstr = require("./utils/chunkSubstr");
const base64toBinary = require("./utils/base64toBinary");
const binaryToBase64 = require("./utils/binaryToBase64");

let filePath = "./zipfiles/advanced-custom-fields-pro.zip";
let fileName = "advanced-custom-fields-pro";

fs.readFile(filePath, {}, (err, data) => {
  if (err) throw err;
  var base64data = Buffer.from(data, "binary").toString("base64");
  let chunkArray = chunkSubstr(base64data, base64data.length / 3);
  let binaryChunkArray = chunkArrayToBinary(chunkArray);
  let binaryParityString = createParityString(binaryChunkArray);
  storeFileInDriveArray(binaryChunkArray, binaryToBase64(binaryParityString));
});

function mergeFile(binaryData) {
  fs.writeFile("./MERGED_particles.js-master.zip", binaryData, err => {
    if (err) throw err;
    console.log("done");
  });
}

function chunkArrayToBinary(chunkArray) {
  let binaryArray = [];
  for (let a = 0; a < chunkArray.length; a++) {
    binaryArray.push(base64toBinary(chunkArray[a]));
  }
  return binaryArray;
}

function createParityString(binaryArray) {
  let chunk0size = binaryArray[0].length;
  let chunk1size = binaryArray[1].length;
  let chunk2size = binaryArray[2].length;
  let parity = "";
  if (chunk0size == chunk1size && chunk1size == chunk2size) {
    for (let a = 0; a < binaryArray[0].length; a++) {
      parity += determineParityBit(binaryArray, a);
    }
    return parity;
  } else if (chunk0size == chunk1size && chunk1size !== chunk2size) {
    for (let a = 0; a < binaryArray[0].length; a++) {
      if (a == chunk0size) {
      }
      parity += determineParityBit(binaryArray, a);
    }
    return parity;
  }
}

function determineParityBit(binaryArray, a) {
  if (typeof binaryArray[2][a] == "undefined") {
    if ((binaryArray[0][a] + binaryArray[1][a]) % 2 == 0) {
      return "0";
    } else {
      return "1";
    }
  } else if (typeof binaryArray[1][a] == "undefined") {
    if (binaryArray[0][a] % 2 == 0) {
      return "0";
    } else {
      return "1";
    }
  }
  if ((binaryArray[0][a] + binaryArray[1][a] + binaryArray[2][a]) % 2 == 0) {
    return "0";
  } else {
    return "1";
  }
}

function storeFileInDriveArray(base64chunkArray, base64parityString) {
  for (let a = 0; a < base64chunkArray.length; a++) {
    fs.writeFile(
      `./drives/drive${a + 1}/${fileName}-chunk${a + 1}.zip`,
      base64chunkArray[a],
      err => {
        if (err) throw err;
      }
    );
  }
  fs.writeFile(
    `./drives/drive4/${fileName}-parity.zip`,
    base64parityString,
    err => {
      if (err) throw err;
    }
  );
}

function getTotalFilesInDrives() {
  fs.readdir("./drives/drive1/", function(err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    console.log(files.length);
    if (!files) {
      return 0;
    }
    return files.length;
  });
}
