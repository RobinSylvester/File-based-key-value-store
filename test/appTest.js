//jshint esversion:6

const assert = require('chai').assert;
const app = require('../appForTesting.js');

describe('Unit testing for File-based key value pair storage application', function(){
  this.timeout(100000);
  let application = app;
  it('Check that the application creates a key value pair and stores it',function()
{
    assert(application.create()==1,"Key value pair added successfully");
});

it('Check that the application reads and returns the object based on the given key',function()
{
  assert(application.read()==1,"Read successful");
});

it('Check that the application deletes and  the key value pair based on the given key',function()
{
  assert(application.deletion()==1,"Deletion successful");
});

it('Check that the application creates file or moves to the specified file location',function()
{
  assert(application.fileCreation("E:/test.json")=="E:/test.json","successful");
});
});
