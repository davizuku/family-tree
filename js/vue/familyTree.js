function decryptString(encryptedStr, passphrase, crypto) {
    let decryptedStr = crypto.AES.decrypt(encryptedStr, passphrase)
        .toString(crypto.enc.Utf8)
    return eval('(' + decryptedStr + ')');
}

Vue.component('family-tree', {
    data: {},
    created: function () {
        var passphrase = localStorage.getItem('passphrase');
        if (typeof passphrase !== 'string') {
            passphrase = prompt('Introduzca la contraseña de desencriptación:');
            if (isValidPassphrase(passphrase, window.CryptoJS)) {
                localStorage.setItem('passphrase', passphrase);
            }
        }
        this.passphrase = passphrase;
    },
    computed: {
        isValidPassphrase: function() {
            return isValidPassphrase(this.passphrase, window.CryptoJS);
        },
        pageId: function() {
            var varName = 'id'
            var query = window.location.search.substr(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == varName) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return 'p1'
        },
        personView: function() {
            return this.pageId[0] == 'p'
        },
        coupleView: function() {
            return this.pageId[0] == 'c'
        },
        tree: function() {
            return {
                'persons': decryptString(window.persons, this.passphrase, window.CryptoJS),
                'couples': decryptString(window.couples, this.passphrase, window.CryptoJS),
            }
        }
    },
    template: `
        <div v-if=isValidPassphrase>
            <div v-if=personView><person-detail v-bind:id='pageId' v-bind:tree='tree'></person-detail></div>
            <div v-else-if=coupleView><couple v-bind:id='pageId' v-bind:tree='tree'></couple></div>
        </div>
        <div v-else>
            <p class="center"><i class="large material-icons">lock_outline</i></p>
            <p class="center">Contraseña inválida, pruebe de nuevo.</p>
        </div>
    `
})
