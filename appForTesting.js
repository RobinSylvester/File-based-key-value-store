//jshint esversion:6
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
module.exports={fileCreation:function fileCreation(filePath)
{
  if (filePath == "" || filePath == "n") {
    filePath = "E:/test.json";
  }
  var orginObj = {students:[]};
  var stringyfyData = JSON.stringify(orginObj);



  // File non-existence check
  if(!fs.existsSync(filePath))
  {
    fs.writeFileSync(filePath, stringyfyData);
    console.log("New file Created !");
  }
  return filePath;
},


// Function is made to return integers for testing purpose
create:function create()
{
  // remove the below line from comment during testing
  let filePath="E:/test.json";

  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);
    let key = prompt("Enter the key: ");


// Key length check
    if(key.length>32)
    {

      while(key.length>32)
      {
        key = prompt("Key length exceeded. Enter a valid key: ");
      }

    }

// Key existence check
    if(keyCheck(jsonObj,key))
    {

      while(keyCheck(jsonObj,key))
      {
        key = prompt("Key already exists. Enter a new key: ");
      }

    }

     let timeToLive = prompt("Enter the key's Time-to-Live (in seconds)(optional): ");
     let storeTime = new Date();
     let firstName = prompt("Enter the  First Name: ");
     let lastName = prompt("Enter the  Last Name: ");
     let curObj;

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



// null value check
     if(empty(curObj))
     {
       console.log(curObj);
       console.log("One or more values are empty. Try again...");
       return;
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
     return 1;

},


read:function read()
{
  // remove the below line from comment during testing
  let filePath="E:/test.json";

  // Reading the JSON file
  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);

  let searchKey = prompt("Enter the key: ");
  let index = keyRead(jsonObj,searchKey);

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
    return 11;
  }
  else{
    console.log(jsonObj.students[index]);
    return 1;
  }


},

deletion:function deletion()
{
  // remove the below line from comment during testing
  let filePath="E:/test.json";
  // Reading the JSON file
  let stringyfyData = fs.readFileSync(filePath);
  let jsonObj = JSON.parse(stringyfyData);

  let deleteKey = prompt("Enter the key: ");
  let deleteIndex = keyRead(jsonObj,deleteKey);

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
    return 1;
  }
}
};
