//jshint esversion: 6
const fs = require('fs');
const prompt = require('prompt-sync')();
const sizeof = require('object-sizeof');
const empty = require('is-empty');

// To check whether the key is present in the file or not
function keyCheck(jsonObj,key)
{
  for(var i=0;i<jsonObj.students.length;i++)
  {
    if(jsonObj.students[i].key==key)
    {
      return true;
    }
  }
  return false;
}

// To return the search key's index in the file
function keyRead(jsonObj,key)
{
  for(var i=0;i<jsonObj.students.length;i++)
  {
    if(jsonObj.students[i].key==key)
    {
      return i;
    }
  }
  return -1;
}

// To Create a file or move to an existing filepath
function fileCreation(filePath)
{
  try{
  if (filePath == "" || filePath == "n") {
    filePath =__dirname+"/database.json";
  }


  let orginObj = {students:[]};
  let stringyfyData = JSON.stringify(orginObj);



  // File non-existence check
  if(!fs.existsSync(filePath))
  {
    fs.writeFileSync(filePath, stringyfyData);
    console.log("New file Created !");
    return filePath;

  }
 console.log("Moving to existing file path");
 return filePath;

}
catch(err)
{
  console.log("Invalid file type. create or specify a json file's path..");
  console.log(err);
  return;
}
}


// Function is made to return integers for testing purpose
function create()
{
 try{

  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);
    let key = prompt("Enter the key: ");



// Key existence check
    if(keyCheck(jsonObj,key))
    {

      while(keyCheck(jsonObj,key))
      {
        key = prompt("Key already exists. Enter a new key: ");
      }

    }

    // Key length check
    try{
        if(key.length>32)
        {

          while(key.length>32)
          {
            key = prompt("Key length exceeded. Enter a valid key: ");
          }

        }
      }
      catch(err)
      {
        console.log("Unexpected exit...");
        return;
      }

     let timeToLive = prompt("Enter the key's Time-to-Live (in seconds)(optional): ");
     let storeTime = new Date();
     let firstName = prompt("Enter the  First Name: ");
     let lastName = prompt("Enter the  Last Name: ");
     let curObj;

     // null value check
          if(empty(firstName)||empty(lastName)||empty(key))
          {

            console.log("One or more values are empty. Try again...");
            return;
          }

     // Checking whether the user has entered timeToLive value
     if(empty(timeToLive)||timeToLive<0)
     {
       timeToLive=-1;
       curObj = {key:key, firstName:firstName,lastName:lastName,timeToLive:timeToLive};
     }
     else
     {
       curObj = {key:key, firstName:firstName,lastName:lastName,timeToLive:timeToLive,storeTime:storeTime.getTime()};
     }






// Object memory size check
     if(sizeof(curObj)>16000)
     {
       console.log("Object size exceeded.");
       return;
     }

// Adding the created data to the array
     jsonObj.students.push(curObj);

// Updating the changes made
     stringyfyData = JSON.stringify(jsonObj);
     fs.writeFileSync(filePath,stringyfyData);

     console.log("Data store successful!!");
}
catch(err)
{
  console.log("Invalid file type... Select option 4 to re-enter the file path");
}

}


function read()
{

  try{

  // Reading the JSON file
  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);

  let searchKey = prompt("Enter the key: ");
  let index = keyRead(jsonObj,searchKey);

  try{

  if(jsonObj.students[index].timeToLive!=-1)
  {
    let currDate = new Date();
    let keyDate = jsonObj.students[index].storeTime;
    let seconds = (currDate.getTime() - keyDate)/1000;
    if(seconds>jsonObj.students[index].timeToLive)
    {
      console.log("Your key has been expired...");
      return;
    }
  }


  if(index==-1)
  {
    console.log("Key not found");

  }
  else{
    console.log(jsonObj.students[index]);

  }
}
catch(err)
{
  console.log("search key not found");
  return;
}
}
catch(err)
{
  console.log("Invalid file type... Select option 4 to re-enter the file path");
  console.log(err);
  return;
}

}

function deletion()
{
  try
  {
  // Reading the JSON file
  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);

  let deleteKey = prompt("Enter the key: ");
  let deleteIndex = keyRead(jsonObj,deleteKey);

  try{



  if(jsonObj.students[deleteIndex].timeToLive!=-1)
  {
    let currDate = new Date();
    let keyDate = jsonObj.students[deleteIndex].storeTime;
    let seconds = (currDate.getTime() - keyDate)/1000;
    if(seconds>jsonObj.students[deleteIndex].timeToLive)
    {
      console.log("Your key has been expired...");
      return;
    }
  }
  if(deleteIndex==-1)
  {
    console.log("Key not found");
    return;
  }
  else{
    // deleting specified element
    delete jsonObj.students[deleteIndex];

    // Removing null value created during the delete operation
    jsonObj.students = jsonObj.students.filter(function(el){
      return el != null;
    });

    // Updating the changes made
    stringyfyData = JSON.stringify(jsonObj);
    fs.writeFileSync(filePath,stringyfyData);

    console.log("Deletion successful!!");

  }
}
catch(err)
{
  console.log("Invalid key");
  return;
}
}
catch(err)
{
  console.log("Invalid file type... Select option 4 to re-enter the file path");
}
}




var jsonObj; // Variable to store the parsed data
var flag=1;
var currDate; // Current Date
var checker; // Just for catching the returning integer

var filePath = prompt('Enter filePath or press "n" to leave it default: ');

filePath=fileCreation(filePath);


while(flag==1)
{
console.log("\nWelcome to the Name database\n 1. Create\n 2. Read\n 3.Delete\n 4.Create or select another file\n 5.Exit");

var choice = prompt("Enter your choice: ");

switch (choice) {

  case '1':
 create();
  break;

  case '2':
{
  read();
 break;
}

case '3':
{
deletion();

  break;
}

case '4':
{
  filePath = prompt('Enter filePath or press "n" to leave it default: ');
  fileCreation(filePath);
  break;
}
case '5':
{
  flag=0;
  break;
}
 default:
   console.log("Invalid option");
   break;

}
}
