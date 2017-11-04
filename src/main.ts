import * as readlineSync from "readline-sync";

import { Parser } from "nearley";

import { tokens } from "./parser/Tokens";
import { MyLexer } from "./parser/Lexer"
import { ParserRules, ParserStart } from "./parser/Grammar";

import { ASTNode, Stmt } from './ast/AST';

import { State } from './interpreter/State';

(function main() {
  console.log("While :: REPL");

  var state = new State(),
    input, line;

  while (true) {
    const lexer = new MyLexer(tokens);
    const parser = new Parser(ParserRules, ParserStart, { lexer });
    
	input = "";
	do {
	  line = readlineSync.question('> ');
	  input += line;
	} while (line.trim().length > 0);
    
	if (input.trim().length < 1) {
	  console.log("Goodbye.");
	  break;
	}
    
	try {
      // Parse user input
      parser.feed(input);
      // Print result
      const nodes: Stmt[] = parser.results;

      switch (nodes.length) {
        case 0: {
          console.log("Parse failed!!");
          break;
        }
        case 1: {
          const node = nodes[0];
          state = node.evaluate(state);
          console.log(`\n${state.toString()}`);
          break;
        }
        default: {
          console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
          nodes.map((node) => console.log(node.toString()));
          break;
        }
      }
    } catch (parseError) {
      console.error(parseError);
    }
  }
})();