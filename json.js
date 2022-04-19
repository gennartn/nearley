// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const moo = require('moo')

  let lexer = moo.compile({
    WS:         /[ \t]+/,
    comment:    /\/\/.*?$/,
    number:     /\-?[0-9]+(?:\.[0-9]*)?/,
    string:     { match: /"(?:\\["\\]|[^\n"\\])*"/, value: x => x.slice(1, -1) },
    user: 'user=',
    group: 'group=',
    role_name: 'roleName=',
    identifier: /[A-Za-z0-9_]+/,
    lparen:     '(',
    rparen:     ')',
    colon:      ':',
    lbrace:     '{',
    rbrace:     '}',
    lbracket:   '[',
    rbracket:   ']',
    lt:         '<',
    gt:         '>',
    equals:     '=',
    comma:      ',',
    NL:         { match: /\n/, lineBreaks: true },
  })
   function getItems(d) {
    if (d[2] && d[4]){
      return [d[0]].concat([d[2]].concat([d[4]]))      
    }
    else{
      return [d[1]].concat(d[3])
      
    } 
  }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "mapping_roles", "symbols": ["_", "role_name", "_", "items"], "postprocess": (d) => d[3]},
    {"name": "mapping_roles", "symbols": ["mapping_roles", "separator", "role_name", "_", "items", "_"], "postprocess": (d) => d[0].concat(d[4])},
    {"name": "role_name", "symbols": ["value"], "postprocess": id},
    {"name": "role_name", "symbols": ["role_name", (lexer.has("equals") ? {type: "equals"} : equals)], "postprocess": (d) => d[0]},
    {"name": "items", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "mapping_items", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": (d) => d[1]},
    {"name": "items", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": () => []},
    {"name": "mapping_items", "symbols": ["value"], "postprocess": (d) => [d[0]]},
    {"name": "mapping_items", "symbols": ["mapping_items", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "value"], "postprocess": (d) => d[0].concat(d[4])},
    {"name": "value", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "_", "symbols": [], "postprocess": () => null},
    {"name": "_", "symbols": ["_", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": () => null},
    {"name": "_", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": () => null},
    {"name": "__", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": () => null},
    {"name": "__", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": () => null},
    {"name": "__", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": () => null},
    {"name": "__", "symbols": ["__", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": () => null},
    {"name": "__", "symbols": ["__", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": () => null},
    {"name": "__", "symbols": ["__", (lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": () => null},
    {"name": "NL", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": () => null},
    {"name": "NL", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": () => null},
    {"name": "separator", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_"], "postprocess": () => null},
    {"name": "separator", "symbols": ["_"], "postprocess": () => null}
]
  , ParserStart: "mapping_roles"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
