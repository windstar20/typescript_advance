"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var user = {
    id: 1,
    name: 'james',
};
function getUser(user) {
    return user;
}
//-----------
var getProduct = function () {
    return Promise.resolve({
        id: "123",
        name: "John",
        email: "john@example.com",
    });
};
exports.Color = {
    Red: "red", // "red"
    Green: "green", //"green"
    Blue: "blue", // "blue"
};
function color(c) {
    return 'red';
}
console.log(color('Red'));
