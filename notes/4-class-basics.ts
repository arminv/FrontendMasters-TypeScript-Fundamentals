import { HasPhoneNumber, HasEmail } from "./1-basics";

// == CLASSES == //

/**
 * (1) Classes work similarly to what you're used to seeing in JS
 * -   They can "implement" interfaces
 */

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}

/**
 * (2) This looks a little verbose -- we have to specify the words "name" and "email" 3x.
 * -   Typescript has a shortcut: PARAMETER PROPERTIES
 */

/**
 * (3) Access modifier keywords - "who can access this thing"
 *
 * - public - everyone
 * - protected - me and subclasses
 * - private - only me
 */

class ParamPropContact implements HasEmail {
  // NOTE: if an interface requires certain fields to exist, making any of the fields/properties here (e.g. `name`, `email`) would cause a problem!
  constructor(public name: string, public email: string = "no email") {
    // nothing needed
  }
}

/**
 * (4) Class fields can have initializers (defaults)
 */
class OtherContact implements HasEmail, HasPhoneNumber {
  // NOTE: TS will still try to `infer` the type even when we have a given a default value - make sure to specify any other valid type, or TS will only allow for the type it infers!
  protected age: number = 0;
  // NOTE: we can also use `readonly` and TS will still complain in the same way as when we use access modifier keywords (i.e. public, protected, private):
  // readonly age: number = 0;
  private password: string;
  // NOTE: `Definite Assignment Operator` (i.e. !) tells TS that we guarantee that a fields always gets initialized properly - example: when we initialize a field in an early lifecycle hook in React:
  // private password!: string;
  constructor(public name: string, public email: string, public phone: number) {
    // () password must either be initialized like this, or have a default value - try commenting out the line below!
    // NOTE: one way to fix this is to have `private password: string | undefined` (i.e. allow for `password` to also be undefined, this way TS will not complain)
    this.password = Math.round(Math.random() * 1e14).toString(32);
  }
}

/**
 * (5) TypeScript even allows for abstract classes, which have a partial implementation
 */

abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) { }

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}

/**
 * (6) implementors must "fill in" any abstract methods or properties
 */
class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // must happen before non property-parameter arguments
    name: string,
    email: string
  ) {
    super(name, email);
  }
  sendEmail() {
    // mandatory!
    console.log("sending an email");
  }
}
