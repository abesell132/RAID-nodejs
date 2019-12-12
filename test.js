let array = [1, 0];
if (typeof array[2] == "undefined") {
  if ((array[0] + array[1]) % 2 == 0) {
    console.log("0");
  } else {
    console.log("1");
  }
} else {
  if ((array[0] + array[1] + array[2]) % 2 == 0) {
    console.log("0");
  } else {
    console.log("1");
  }
  if ((array[0] + array[1] + array[2]) % 2 == 0) {
    console.log("0");
  } else {
    console.log("1");
  }
}
