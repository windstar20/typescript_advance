import { Expect, Equal } from "../function";


type GoodByeAndHello<T> = T extends 'goodbye' ? 'goodbye' : 'hello';


type YouSayGoodbyeAndISayHello<T> = T extends 'hello' | 'goodbye'
  ? T extends 'hello'
    ? 'goodbye'
    : 'hello'
  : never;



interface Example {
    name: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}
// Example 인터페이스에서 name, age 키를 제외하고, id 또는 Id 가 포함된 key 와 value 로 이루어진 object type 조건 선언.
type OnlyIdKeys<T> = {
    [K in keyof T as K extends `${string}${'id'|'Id'}` ? K : never]: T[K]
}

// infer
type GetDataValue<T> = T extends {data: infer T2} ? T2 : never;

// Expect<Equal<GetDataValue<{data: 'hello'}>, 'hello'>>
// Expect<Equal<GetDataValue<{data: {name: 'hello'}}>, {name: 'hello'}>>

// Generic & infer
interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getName: () => Name;
    getPoint: () => Point;
  }
  
//   type Example = MyComplexInterface<
//     'click',
//     'window',
//     'my-event',
//     { x: 12; y: 14 }
//   >;
  
//   type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer T2>
//     ? T2
//     : never;
  
//   type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];
  



const parser1 = {
    parse: () => 1,
  };
  
  const parser2 = () => '123';
  
  const parser3 = {
    extract: () => true,
  };
  
  type GetParserResult<T> = T extends { parse: () => infer TR }
    ? TR
    : T extends () => infer TR
    ? TR
    : T extends {
        extract: () => infer TR;
      }
    ? TR
    : never;
  
  type tests = [
    Expect<Equal<GetParserResult<typeof parser1>, number>>,
    Expect<Equal<GetParserResult<typeof parser2>, string>>,
    Expect<Equal<GetParserResult<typeof parser3>, boolean>>
  ];
  