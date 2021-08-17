/* we will be make compile.js in a way we don't need to create the compile 
our solidity code every time for that we will create built folder like 
there is in flutter */
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const builtPath= path.resolve(__dirname,'build');// getting build folder poth
fs.removeSync(builtPath);// deleting the build folder with files if they exist

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');//getting our cantract for compiling
const source = fs.readFileSync(campaignPath, 'utf-8');// reading the content of the file
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(builtPath);

for (let contract in output) {
    let name = contract.replace(':', '');
    fs.outputJSONSync(
        path.resolve(builtPath, name + '.json'),
        output[contract]
    )
}

