# Raportive API plugin
### Node script using Raportive API. Based on the name of the person and the domain script searches for correct email in linkedin database.
======================

## Requirements

###  1. You need Node.js
```
brew install node
```

###  2. Clone repository
```
git clone git@github.com:krystiangw/raportive_api_plugin.git
```
### 3 Install node dependiences
```
cd raportive_plugin
npm install
```

## Using
###  Use 'node' to run. 
Be sure to set env TOKEN variable. TOKEN is auth token returned by Raportive API. Example:

```
TOKEN="l6s6U8oXPzfHn4zXtIiZcYoq6Dm3bK9SQ1g_" node raportive_plugin.js
```

As input it accepts csv file with three column: firstName, lastName and domain. Raw input file example:

```
firstName,lastName,domain,
jan, koper, gmail.com,
john, smith, gmail.com,
```
Script generate list of likely email addresses, verify it and return the correct email addresses.
Generated list for: jan, koper, gmail.com,
```
'jan@gmail.com',
'koper@gmail.com',
'jankoper@gmail.com',
'jan.koper@gmail.com',
'jan-koper@gmail.com',
'j.koper@gmail.com',
'jkoper@gmail.com',
'jank@gmail.com',
'koperjan@gmail.com',
'koper.jan@gmail.com',
'koper-jan@gmail.com',
'k.jan@gmail.com',
'kjan@gmail.com',
'koperj@gmail.com'
```

You can set input file path as argument. By default paht is './input.csv'

```
INPUT="my_file.csv" TOKEN="l6s6U8oXPzfHn4zXtIiZcYoq6Dm3bK9SQ1g_" node raportive_plugin.js
```

You can set output file path as argument. By default paht is './output.csv'

```
OUTPUT="my_file.csv" TOKEN="l6s6U8oXPzfHn4zXtIiZcYoq6Dm3bK9SQ1g_" node raportive_plugin.js
```

### Response
Sample response. Raw csv file:
```
"email","first-name","last-name","headline"
"jankoper@gmail.io","jan","koper","Attended Politechnika Krakowska im. Tadeusza Kościuszki""email","first-name","last-name","headline"
"johnsmith@gmail.com","John","Smith","Branch Manager at some big company"
v":0
}
```
