const nearley = require("nearley");
const grammar = require("./json.js");


const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try{
    parser.feed("group=groupName=group1, roles={role=(roleName=role1,accessTo=[item1,item2]), role=(roleName=role2,accessTo=[item2,item3])}),role=(roleName=role3,accessTo=[itemt1,itemt2])")

    console.log(JSON.stringify(parser.results[0]));
}catch(e){
    console.log("Parse failed", e.message);
}
