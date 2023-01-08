# family-tree

See app in: https://davizuku.github.io/family-tree

## Data format

Data is structured in two files:

- `js/data/_persons.js`
```js
{
    "<personId>": {
        "id": "<personId>",
        "name": string|null,
        "surname1": string|null,
        "surname2": string|null,
        "birth": {
            "year": int|null,
            "month": int|null,
            "day": int|null,
        },
        "death": { // Death != null means the person is dead, but the exact date might be unknown
            "year": int|null,
            "month": int|null,
            "day": int|null
        },
        "parents": "<coupleId>"|null,
        "couples": ["<coupleId1>", ..., "<coupleIdN>"]
    }
}
```

- `js/data/_couples.js`
```js
{
    "<coupleId>": {
        "id": "<coupleId>",
        "person1": "<personId>"|null,
        "person2": "<personId>"|null,
        "start": {
            "year": int|null,
            "month": int|null,
            "day": int|null
        },
        "end": { // end != null means the two persons have split up, the exact date might be unknown
            "year": int|null,
            "month": int|null,
            "day": int|null
        },
        "descendants": ["<personId1>", ..., "<personIdN>"]
    }
}
```

Person ID must start with a `p-` and Couple ID must start with a `c-`.


## How to develop?

This repository is intended to be deployed to github pages. However, it also cares about security and confidentiality of the data. That is why the family data is encrypted using a `passphrase`.

### Requirements

Executing the encryption and decryption scripts requires Nodejs. You can install it as follows:

```bash
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm --version
nvm install lts/hydrogen # latest LTS version may vary
nvm use lts/hydrogen
```

Then, install the packages using:
```bash
npm install
```

### Encryption

A script can be used to encrypt the data in order to update the repository. To re-encrypt the `_persons.js` and `_couples.js` files into `persons.js` and `couples.js` files respectively, use:

```bash
node ./tools/encrypt.js
```

Then, commit the changes in the latter ones.

### Decryption

The following command can be used to keep the JSON files available in your repository and any time you want to re-decrypt the data files:

```bash
node ./tools/decrypt.js
```
