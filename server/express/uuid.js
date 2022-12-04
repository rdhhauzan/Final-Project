const { v4: uuidv4 } = require("uuid");
let uuid = uuidv4();
let uuid2 = uuid // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
console.log(uuid);
console.log(uuid2);
