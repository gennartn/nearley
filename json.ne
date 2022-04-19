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
    role: 'role=',
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



#groups -> _ %group  mapping_groups
 # | 

#mapping_groups -> %lbrace _ mapping_roles _ %rbrace {% (d) => d[2] %}
 # | %lbrace _ %rbrace {%() => [] %}

mapping_roles -> _ %role _ items  {% (d) => d[3] %}
  | mapping_roles separator %role _ items _ {% (d) => d[0].concat(d[4]) %}


#Items it works
items -> %lbracket mapping_items %rbracket {% (d) => d[1] %}
  | %lbracket %rbracket {%() => [] %}

mapping_items -> value  {% (d) => [d[0]] %}
  | mapping_items _ %comma _ value {% (d) => d[0].concat(d[4]) %}
  #| mapping_items _ %comma _ value %coma {% (d) => d[0].concat([d[4]]) %} to avoid to return null if it ends with a coma

#from the video and does not works
#mapping_items -> mapping_item {% (d) => [d[0]]%}
 # | mapping_item %coma mapping_items {%(d) => [d[0], ...d[2]] %}

value -> %identifier {% id %}
| %string {% id %}

_ -> null {% () => null %}
	| _ %WS  {% () => null %}
	| _ %NL  {% () => null %}
# | _ %comment {% () => null %}

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

#characters -> character {% id %} 
#| character characters {% (data) => data[0] + data[1] %}

#character -> [^\"\\"] {% id %}
#| "\\" escape {% (data => data[1])%}

#escape 
#-> "\"" {% () => '"' %}
#|  "\\" {% () => "\\" %}
#| "/"  {% () => "/" %}
#|   "b" {% () => "\b" %}
#|   "f" {% () => "\f" %}
#|   "n" {% () => "\n" %}
#|   "r" {% () => "\r" %}
#|   "t" {% () => "\t" %}

