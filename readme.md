# File based key-value data store

The application performs create, read and delete operations on local storage. A json file is used to store the key value pairs. The application is Operating System independent.

## Language
NodeJS

## Installation

To install the dependencies in the application.

```bash
npm install
```

## Usage

The app.js file is the main file. To run the file.
```bash
node app.js
```
At first, the application will be asking the file path. (Example: D:\database.json)
### Create
Input 1 - Key  
Input 2 - Key's time to live (optional)  
Input 3 - Firstname (value 1)   
Input 4 - Lastname (value 2)  


### Read
Input 1 - Key

### Delete
Input 1 - Key  

### Create or select another file
Input 1 - File path with file name. (Example: D:\database.json)

## Testing
Unit testing has been made using the chai and mocha frameworks. To test the application, run the appTest file in the Test folder
```bash
npm run test
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
