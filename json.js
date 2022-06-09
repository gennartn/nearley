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
    group_name: 'groupName=',
    roles: 'roles=',
    role: 'role=',
    role_name: 'roleName=',
    access_to: 'accessTo=',
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
    {"name": "mapping_model", "symbols": ["mapping_groups"], "postprocess": id},
    {"name": "mapping_model", "symbols": ["mapping_model", "mapping_roles"], "postprocess": (d) => [d[0]].concat([d[1]])},
    {"name": "mapping_model", "symbols": ["mapping_model", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_"], "postprocess": (d) => d[0]},
    {"name": "mapping_groups", "symbols": ["_", (lexer.has("group") ? {type: "group"} : group), "group_definition"], "postprocess": (d) => {return [{"group":d[2][0],"items":d[2][1]}] }},
    {"name": "mapping_groups", "symbols": ["mapping_groups", "separator", (lexer.has("group") ? {type: "group"} : group), "group_definition", "_"], "postprocess": (d) => {return d[0].concat([{"group":d[3][0],"items":d[3][1]}]) }},
    {"name": "group_definition", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen)], "postprocess": id},
    {"name": "group_definition", "symbols": ["group_definition", (lexer.has("group_name") ? {type: "group_name"} : group_name), "value"], "postprocess": (d) => d[2]},
    {"name": "group_definition", "symbols": ["group_definition", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_"], "postprocess": (d) => d[0]},
    {"name": "group_definition", "symbols": ["group_definition", (lexer.has("roles") ? {type: "roles"} : roles), (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "mapping_roles"], "postprocess": (d) => [d[0]].concat([d[4]])},
    {"name": "group_definition", "symbols": ["group_definition", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_"], "postprocess": (d) => d[0]},
    {"name": "group_definition", "symbols": ["group_definition", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": (d) => d[0]},
    {"name": "mapping_roles", "symbols": ["_", (lexer.has("role") ? {type: "role"} : role), "role_definition"], "postprocess": (d) => {return [{"role":d[2][0],"items":d[2][1]}] }},
    {"name": "mapping_roles", "symbols": ["mapping_roles", "separator", (lexer.has("role") ? {type: "role"} : role), "role_definition", "_"], "postprocess": (d) => {return d[0].concat([{"role":d[3][0],"items":d[3][1]}]) }},
    {"name": "role_definition", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen)], "postprocess": id},
    {"name": "role_definition", "symbols": ["role_definition", (lexer.has("role_name") ? {type: "role_name"} : role_name), "value"], "postprocess": (d) => d[2]},
    {"name": "role_definition", "symbols": ["role_definition", (lexer.has("comma") ? {type: "comma"} : comma)], "postprocess": (d) => d[0]},
    {"name": "role_definition", "symbols": ["role_definition", (lexer.has("access_to") ? {type: "access_to"} : access_to), "items"], "postprocess": (d) => [d[0]].concat([d[2]])},
    {"name": "role_definition", "symbols": ["role_definition", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": (d) => d[0]},
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
  , ParserStart: "mapping_model"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
