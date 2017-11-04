import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class WhileDo implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(cond: Exp, body: Stmt) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `WhileDo(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `while ${this.cond.unparse()} do { ${this.body.unparse()} }`;
  }

  evaluate(state: State): State {
    return state; //FIXME
  }
}
