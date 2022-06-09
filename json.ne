#users -> user __ "->" _ groups 
#| user  _ "->" _ roles 
#| user  _ "->" _ groups users 
#| user  _ "->" _ roles users  

#groups -> group _ ":" _ roles 
#| group _ ":" _ roles groups 


#roles -> role _ ":" _ items 
#| role _ ":" _ items roles

#items -> "[" _ array_string _ "]" 
#| {% () => [] %} 


#user -> string {% id %}

#group -> string {% id %}

#role -> string {% id %}


#array_string -> _ characters _ "," {% (data) => [data[0]] %}  
#| _ characters _ "," _ array_string {% (data) => [data[0], ...data[4]]%}

#values -> string {% id %} | string values

#string -> "\"" characters "\"" {% (data) => data[1]%}

@{%
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
%}



@lexer lexer


mapping_model -> mapping_groups {% id %}
  | mapping_model mapping_roles {% (d) => [d[0]].concat([d[1]]) %} 
  | mapping_model _ %comma _ {% (d) => d[0]%}

mapping_groups -> _ %group group_definition  {% (d) => {return [{"group":d[2][0],"items":d[2][1]}] }%}
  | mapping_groups separator %group group_definition _ {% (d) => {return d[0].concat([{"group":d[3][0],"items":d[3][1]}]) }%}


group_definition -> %lparen {% id %}
  | group_definition %group_name value {% (d) => d[2] %}
  | group_definition _ %comma _ {% (d) => d[0]%}
  | group_definition %roles %lbrace _ mapping_roles  {% (d) => [d[0]].concat([d[4]]) %} 
  | group_definition _ %rbrace _ {% (d) => d[0] %}
  | group_definition %rparen {% (d) => d[0] %}


mapping_roles -> _ %role role_definition  {% (d) => {return [{"role":d[2][0],"items":d[2][1]}] }%}
  | mapping_roles separator %role role_definition _ {% (d) => {return d[0].concat([{"role":d[3][0],"items":d[3][1]}]) }%}


role_definition ->  %lparen {% id %}
  | role_definition %role_name value {% (d) => d[2] %}
  | role_definition %comma {% (d) => d[0]%}
  | role_definition %access_to items  {% (d) => [d[0]].concat([d[2]]) %} 
  | role_definition %rparen {% (d) => d[0] %}

items -> %lbracket mapping_items %rbracket {% (d) => d[1] %}
  | %lbracket %rbracket {%() => [] %}

mapping_items -> value  {% (d) => [d[0]] %}
  | mapping_items _ %comma _ value {% (d) => d[0].concat(d[4]) %}

value -> %identifier {% id %}
| %string {% id %}

_ -> null {% () => null %}
	| _ %WS  {% () => null %}
	| _ %NL  {% () => null %}

__ -> %WS			{% () => null %}
	| %NL			{% () => null %}
	| %comment		{% () => null %}
	| __ %WS    	{% () => null %}
	| __ %NL    	{% () => null %}
	| __ %comment 	{% () => null %}

NL -> %NL {% () => null %}
  | _ %NL {% () => null %}

separator -> _ %comma _ {% () => null%}
  | _ {% () => null %}



