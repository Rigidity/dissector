# Dissector
A simple lexer and parser library with a grammar language.

## Utilities
* `grammar(text)`  
Transpiles the grammar to JavaScript source code. You may have to edit the result to fit your needs if used externally, but otherwise you can just eval the result to get the symbols and grammar objects.
* `lex(text, rules, exact, include)`  
Processes the text with the given rules and included rule objects. If you disable exact mode, the lexer can start and stop anywhere in the source text.
* `parse(tokens, rules, exact, include)`  
Processes the tokens with the given rules and included rule objects. If you disable exact mode, the parser can start and stop anywhere in the source text.
* `errorPosition(state, text)`  
Returns an object containing the index, start, and stop indices based on the state's current index and the source text. Useful for readable error handling.
* `createModifier(handler)`  
Returns a function that will apply the handler on a state. The handler is bound to the current state.

## Grammar
* `group { ... }`  
This defines a group in the grammar. All groups are lexers unless named `parser`. You need at least one group in a grammar, and at least one rule in a group. Typically, you should include one named `parser`, and one named `lexer`. The other ones are for the lexer, without being processed automatically.
* `rule: content;`  
This defines a rule in a group. The default group when referencing rules is the current one. If you are referencing a rule with the same name as one in the current group, you must specify the group followed by two colons before the rule name.
* `(x y)` = Resets the precedence.
* `'x'` = Converts to `text`.
* `'x'..'y'` = Converts to `range`.
* `some` = Converts to grouped `rule` or `match`.
* `group::some` = Converts to grouped `rule` or `match`.
* `.` = Converts to `any`.
* `^` = Converts to `beginning`.
* `$` = Converts to `end`.
* `x | y` = Converts to `or`.
* `x : y` = Converts to `longest`.
* `x y` = Converts to `and`.
* `~x` = Converts to `hide`.
* `!x` = Converts to `not`.
* `=x` = Converts to a positive `peek`.
* `-x` = Converts to a negative `peek`.
* `x?` = Converts to `optional`.
* `x*` = Converts to `zero`.
* `x+` = Converts to `one`.
* `x{min,max}` = Converts to `between`.
* `x{,max}` = Converts to `between`.
* `x{min,}` = Converts to `between`.
* `x{0,}` = Converts to `zero`.
* `x{1,}` = Converts to `one`.
* `x{0,1}` = Converts to `optional`.
* `x{amount}` = Converts to `repeat`.
* `[x y]` = Converts to `join`.
* `...some` = Converts to ungrouped `rule` or `match`.
* `<some>` = Inserts the lexer group.

## Combinators
* `text(content)` = Matches text in the source.
* `regex(content)` = Matches a regular expression.
* `and(...)` = Matches multiple items.
* `or(...)` = The first valid match.
* `longest(...)` = The longest valid match.
* `between(min, max, ...)` = Matches multiple.
* `zero(...)` = Matches zero or more.
* `one(...)` = Matches one or more.
* `optional(...)` = Optionally matches.
* `repeat(amount, ...)` = Matches an exact amount.
* `any()` = Matches any source item.
* `beginning()` = Matches the beginning of the source.
* `end()` = Matches the end of the source.
* `range(from, to)` = Matches a range of characters.
* `join(...)` = Joins the result of the items.
* `peek(positive, ...)` = Positive or negative lookahead.
* `hide(...)` = Hides the result of the items.
* `not(...)` = Matches any source item other than the items.
* `rule(name)` = Executes another rule.
* `match(name)` = Matches a rule in the source.

## Types
* `new Context(source)` = A processing context.
* `new State(context)` = A processing state.