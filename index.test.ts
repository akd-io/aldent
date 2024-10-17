import { expect, test } from "bun:test";
import { z } from "zod";
import structOfArrays from ".";

test("Properly indents inner multi-line string without indentation", () => {
  const testObject = z.object({
    name: z.string(),
    age: z.number(),
  });

  const {
    arrays: { names, ages },
  } = structOfArrays(testObject);

  console.log({ names });
  console.log({ ages });
});
