import {Equal, Expect} from "../function";

type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye" ? T extends "hello" ? "goodbye" : "hello" : never

type tests = [
    Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
    Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>,
];


//? 조건타입으로 Object Key 새로 만들기:
//? Object 로 특정 타입을 가진 키를 가진 타입을 생성한다.
interface Example {
    name: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}

type OnlyIdKeys<T> = {
    [K in keyof T as K extends `${string}${'id' | 'Id'}` ? K : never ] : T[K]
}

type tests = [
    Expect<
        Equal<
            OnlyIdKeys<Example>,
            {
                id: string;
                organisationId: string;
                groupId: string;
            }
        >
    >,
    Expect<Equal<OnlyIdKeys<{}>, {}>>
];


//? infer 의 사용
type GetDataValue<T> = T extends {data: infer T2} ? T2 : never;
    Expect<Equal<GetDataValue<{data: "hello"}>, "hello">>



//? 제네릭에서의 Infer 사용
interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getName: () => Name;
    getPoint: () => Point;
}

type Example = MyComplexInterface<
    "click",
    "window",
    "my-event",
    { x: 12; y: 14 }
>;

type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer T2> ? T2 : never;

type tests2 = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];



type Names = [
    "Junsuk Park",
    "Bill Evans",
    "Stan Getz",
];

type GetSurname<T> = T extends `${infer First} ${infer Last}` ? Last : never;

type tests = [
    Expect<Equal<GetSurname<Names[0]>, "Park">>,
    Expect<Equal<GetSurname<Names[1]>, "Evans">>,
    Expect<Equal<GetSurname<Names[2]>, "Getz">>,
];


const getValue = <TObj, T2 extends keyof TObj>(obj: TObj, key: T2) => {
    return obj[key];
};

const obj = {
    a: 1,
    b: "some-string",
    c: true,
    d: {
        name : 'james'
    }
};

const numberResult = getValue(obj, "a");
const stringResult = getValue(obj, "b");
const booleanResult = getValue(obj, "c");
const objResult = getValue(obj, 'd');

type tests = [
    Expect<Equal<typeof numberResult, number>>,
    Expect<Equal<typeof stringResult, string>>,
    Expect<Equal<typeof booleanResult, boolean>>,
    Expect<Equal<typeof objResult, { name: string }>>,
];