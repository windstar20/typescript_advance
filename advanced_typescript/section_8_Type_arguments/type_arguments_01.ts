
import { Equal, Expect } from '../function'

const typedObjectKeys = <T extends string>(obj : Record<T, any>) => {
  return Object.keys(obj) as Array<T>
};

// const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
//     return Object.keys(obj) as Array<TKey>;
// };

const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  });

  type test = Expect<Equal<typeof result1, Array<'a' | 'b'>>>;
