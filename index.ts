import { z } from "zod";

export const structOfArrays = <
  A extends z.ZodRawShape,
  B extends z.UnknownKeysParam,
  C extends z.ZodTypeAny,
  D,
  E,
  T extends z.ZodObject<A, B, C, D, E>
>(
  schema: T
) => {
  const { shape } = schema;
  const keys = Object.keys(shape) as (keyof typeof shape)[];

  const arrays = keys.reduce((prev, curr) => {
    return {
      ...prev,
      [curr + "s"]: [],
    };
  }, {}) as {
    [K in keyof typeof shape as `${K}s`]: (typeof shape)[K];
  };

  console.log({ keys });

  return { arrays };
};

export default structOfArrays;
