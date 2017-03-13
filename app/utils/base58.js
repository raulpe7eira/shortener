// shortener/app/engine/base58.js

const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const base = alphabet.length;

module.exports.encode = (num) => {

    var encoded = '';

    while (num) {
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet.charAt(remainder) + encoded;
    }

    return encoded;

}