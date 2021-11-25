/* we will be make compile.js in a way we don't need to create the compile 
our solidity code every time for that we will create built folder like 
there is in flutter */
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const builtPath= path.resolve(__dirname,'build');// getting build folder poth
fs.removeSync(builtPath);// deleting the build folder with files if they exist

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');//getting our cantract for compiling
console.log("campaignPath:- ",campaignPath);
const source = fs.readFileSync(campaignPath, 'utf-8');// reading the content of the file
console.log("source:- ",source);
const output = solc.compile(source,1).contracts;
const errors = solc.compile(source,1)?.errors;
try{

console.log("output:- ",output);
console.log("Error:- ",errors);
if(errors != undefined){
    console.log("inside if");
    throw "Error while Compileing Smart contract"
    
}}catch(e){
    throw new Error(errors)
}
fs.ensureDirSync(builtPath);

for (let contract in output) {
    console.log("inside for loop");
    let name = contract.replace(':', '');
    console.log("name:- ",name);
    fs.outputJSONSync(
        path.resolve(builtPath, name + '.json'),
        output[contract]
    )
}

