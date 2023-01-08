
const validHash = 'd41f1f7fed4dd3c0d9d6fc63eb8d980a078d6924017da384b66ae7fce0b9c6d9';

if (typeof require === 'function') {
    const io = require('readline-sync');
    const CryptoJS = require('crypto-js');

    module.exports = {
        promptPassphrase: function() {
            let passphrase = io.question("Write your passphrase: ", {hideEchoBack: true});
            if (isValidPassphrase(passphrase, CryptoJS)) {
                return passphrase;
            }
            throw new Error("Invalid passphrase. Try again.")
        },
    };
}

function isValidPassphrase(passphrase, crypto) {
    let hashedPass = crypto.SHA256(passphrase).toString();
    return hashedPass === validHash;
}
