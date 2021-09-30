var hasOwn = {}.hasOwnProperty;

export type Value = string | number | boolean | undefined | null;
export type Mapping = Record<string, unknown>;
export interface ArgumentArray extends Array<Argument> {}
export type Argument = Value | Mapping | ArgumentArray;

export default function libraryClassName(...args: ArgumentArray) {
  var classes = [];

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner: any = libraryClassName.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) { // I don't know the intention of this.
        //@ts-ignore
        for (var key in arg) {
          //@ts-ignore
          if (hasOwn.call(arg, key) && arg[key]) { // I don't know the syntax of this.
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
}

/********************************************************
 *
 ********************************************************/

export type ClassnamesArgument = string | undefined | Object;

export function myClassName(...args: ClassnamesArgument[]) {
  const array = args.reduce<string[]>((a, b) => {
    //There is no reason for an empty string in an array.
    if (b === '' || b === undefined) {
      return a;
    }
    
    if (typeof b === 'string') {
      a.push(b);
      
    } else {
      const classNames = Object.entries(b).reduce<string[]>((a, [key, value]) => {
        if (value) {
          a.push(key);
        }

        return a;
      }, []);
      a.push(...classNames);
    }

    return a;
  }, []);

  return array.join(' ');
}
