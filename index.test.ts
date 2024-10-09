import { expect, test } from "bun:test";
import dedent from "dedent";
import endent from "endent";
import { aldent } from "./index.ts";

type TagFunction =
  // We intentionally ignore the weird dedent type here
  typeof endent | typeof aldent;
type Test = (tagFunction: TagFunction) => string;

const compareTagFunctions = (test: Test, solution: string) => {
  console.log(
    "dedent",
    test(
      dedent as any /* We intentionally ignore the weird dedent type here */
    ) === solution
  );
  console.log("endent", test(endent) === solution);
  console.log("aldent", test(aldent) === solution);
  expect(test(aldent) === solution);
};

test("Properly indents inner multi-line string without indentation", () => {
  compareTagFunctions(
    (tagFunction) => tagFunction`
  function add() {
    ${`const a = 1
const b = 2
return a + b`}
  }
`,
    `function add() {
  const a = 1
  const b = 2
  return a + b
}`
  );
});

test("Properly indents inner multi-line string with lots of indentation", () => {
  compareTagFunctions(
    (tagFunction) => tagFunction`
      function add() {
        ${tagFunction`
          const a = 1
          const b = 2
          return a + b
        `}
      }
    `,
    `function add() {
  const a = 1
  const b = 2
  return a + b
}`
  );
});

test("Does not strip leading spaces of outer and inner multi-line strings", () => {
  compareTagFunctions(
    (tagFunction) => tagFunction`
        d
      c
    ${tagFunction`
      c
    b
    `}
  a
`,
    `      d
    c
    c
  b
a`
  );
});

test("Properly handles escape characters backslash and newline", () => {
  compareTagFunctions(
    (tagFunction) =>
      tagFunction`
        This text has a single \\ slash, and does not have a \\n newline here.
        It also handles a nested windows path correctly:
          ${`C:\\Users\\newuser\\Desktop`}
        `,
    `This text has a single \\ slash, and does not have a \\n newline here.
It also handles a nested windows path correctly:
  ${`C:\\Users\\newuser\\Desktop`}`
  );
});
