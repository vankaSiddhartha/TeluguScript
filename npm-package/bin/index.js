#! /usr/bin/env node
const fs = require('fs') // fs for file system manipulation
//heart of the TeluguScript
const translateToJS =(code)=>{
  const translations = {
    "maredhi":"let",
    "maranadhi":"const",
    "pani":"function",
    "phalitam":"return",
    "edi itey":"if",
    "lekapote":"else",
    "oka vela":"else if",
    "malle":"for",
    "malle itey":"while",
    "cheppu":"console.log",
   
  }
  let teluguScript = code
  //converting translations Object in key-value pair array and itration ecah pair
    Object.entries(translations).forEach(([telugu, js]) => {

        const regex = new RegExp(`\\b${telugu}\\b`, 'g');// b indicate to consider whole word and g means global replace not first occarance but all
        teluguScript = teluguScript.replace(regex, js);
    });
    eval(teluguScript) // excute js that in string formate
}

const fileName = process.argv[2]; // get the 2 index cmd line argument of user

//if not exit or not end with .tel
if (!fileName || !fileName.endsWith('.tel')) {
    console.error('Usage: telugu <filename.tel>');
    process.exit(1);
}


//read file 
fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        process.exit(1);
    }
    //calling the core function
    translateToJS(data);
});
