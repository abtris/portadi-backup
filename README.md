# Portadi backup

- https://www.portadi.com/
- Package using API - https://portadi.docs.apiary.io

## Install

```
npm install portadi-backup
```

## Usage

Obtain api key in [user settings](https://app.portadi.com/#!/settings) page on Portadi administration (needs admin privileges).

### Export accounts data

```
PORTADI_API_KEY=XXXXX PORTADI_DATA_DIR=/tmp/data node lib/index.js
```

or

```
export PORTADI_API_KEY=XXXXX
node lib/index.js
```

### Export users

```
PORTADI_API_KEY=XXXXX PORTADI_DATA_DIR=/tmp/data node lib/users.js
```

or

```
export PORTADI_API_KEY=XXXXX
node lib/users.js
```
