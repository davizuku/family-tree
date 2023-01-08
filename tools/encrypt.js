
const fs = require('fs');
const aes = require('crypto-js/aes');
const security = require('./security');
const dataDir = __dirname + '/../js/data';

console.log("Preparing to encrypt the JSON data.");
let passphrase = security.promptPassphrase();
fs.readdir(dataDir, function (err, files) {
    if (err) {
        return console.error('Could not scan directory: ' + dataDir);
    }
    console.error('Scanning directory: ' + dataDir);
    files.forEach(function (file) {
        if (file[0] == '_') {
            console.log("\t- Reading contents of " + file);
            let entity = file.replace('_', '').replace('.js', '');
            let str = fs.readFileSync(dataDir + '/' + file, 'utf8')
                .replace('var ' + entity + ' = ', '')
                .replace(';', '');
            console.log("\t\t- Encrypting string");
            let encryptedStr = aes.encrypt(str, passphrase).toString();
            console.log("\t\t- Writing to " + entity + '.js');
            fs.writeFileSync(dataDir + '/' + entity + '.js', 'var ' + entity + " = `" + encryptedStr + "`;");
            console.log("\t\t- Finished");
        }
    });
});
