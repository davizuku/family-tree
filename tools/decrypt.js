
const fs = require('fs');
const CryptoJS = require('crypto-js');
const security = require('./security');
const dataDir = __dirname + '/../js/data';

console.log("Preparing to decripyt the JSON data.");
let passphrase = security.promptPassphrase();
fs.readdir(dataDir, function (err, files) {
    if (err) {
        return console.error('Could not scan directory: ' + dataDir);
    }
    console.error('Scanning directory: ' + dataDir);
    files.forEach(function (file) {
        if (file[0] != '_') {
            console.log("\t- Reading contents of " + file);
            let entity = file.replace('.js', '');
            let encryptedStr = fs.readFileSync(dataDir + '/' + file, 'utf8')
                .replace('var ' + entity + ' = ', '')
                .replaceAll('`', '')
                .replace(';', '');
            console.log("\t\t- Decrypting string");
            let str = CryptoJS.AES.decrypt(encryptedStr, passphrase).toString(CryptoJS.enc.Utf8);
            console.log("\t\t- Writing to _" + entity + '.js');
            fs.writeFileSync(dataDir + '/_' + entity + '.js', 'var ' + entity + " = " + str + ";");
            console.log("\t\t- Finished");
        }
    });
});
