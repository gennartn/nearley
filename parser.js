const nearley = require("nearley");
const grammar = require("./json.js");
const fs = require('mz/fs');

var input;
// Create a Parser object from our grammar.
async function doSomething () {
    if (await fs.exists("input.json")){
        input = (await fs.readFile("input.json")).toString();
    }
        
  }

doSomething();

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
try{
    //parser.feed(input);
    parser.feed("role=[item1,item2,item3], role=[item4,item5]");
    //console.log(parser.results)

    console.log(JSON.stringify(parser.results));
}catch(e){
    console.log("Parse failed", e.message);
}
