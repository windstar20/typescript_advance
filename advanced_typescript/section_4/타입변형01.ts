import {Equal, Expect} from "../function";


//? Union을 Object 로 변형.
type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
    [key in Route] : key
}

type tests = [
    Expect<
        Equal<
            RoutesObject,
            {
                "/": "/";
                "/about": "/about";
                "/admin": "/admin";
                "/admin/users": "/admin/users";
            }
        >
    >,
];


//? Object value 의 타입 변형
interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
}

type AttributeGetters = {
    [K in keyof Attributes] : () => Attributes[K]
}

type tests = [
    Expect<
        Equal<
            AttributeGetters,
            {
                firstName: () => string;
                lastName: () => string;
                age: () => number;
            }
        >
    >,
];

//? object Key 의 타입 변형
type AttributeGetters2 = {
    [K in keyof Attributes as `get${Capitalize<K>}`] : () => Attributes[K]
}

type tests = [
    Expect<
        Equal<
            AttributeGetters2,
            {
                getFirstName: () => string;
                getLastName: () => string;
                getAge: () => number;
            }
        >
    >
];

//? object Union 타입을 object 로 타입 변형: 조금 어려움

type Route2 =
    | {
    route: "/";
    search: {
        page: string;
        perPage: string;
    };
}
    | { route: "/about"; search: {} }
    | { route: "/admin"; search: {} }
    | { route: "/admin/users"; search: {} };

type Search = Route2['search'];

type RoutesObject2 = {
    [R in Route2 as R['route']] : R['search']
};

type tests = [
    Expect<
        Equal<
            RoutesObject2,
            {
                "/": {
                    page: string;
                    perPage: string;
                };
                "/about": {};
                "/admin": {};
                "/admin/users": {};
            }
        >
    >,
];


//? Object 를 Tuple 로 변형.
interface Values {
    email: string;
    firstName: string;
    lastName: string;
}

type ValuesAsUnionOfTuples = {
    [K in keyof Values] : [K, Values[K]]
}[keyof Values]
//튜플로 뽑아내기 전의 상태
//{email: ["email", Values["email"]], firstName: ["firstName", Values["firstName"]], lastName: ["lastName", Values["lastName"]]}

type tests = [
    Expect<
        Equal<
            ValuesAsUnionOfTuples,
            ["email", string] | ["firstName", string] | ["lastName", string]
        >
    >
];

//? Object Key, value 를 union으로 변형
interface FruitMap {
    apple: "red";
    banana: "yellow";
    orange: "orange";
}

type TransformedFruit = {
    [K in keyof FruitMap] : `${K}:${FruitMap[K]}`
}[keyof FruitMap]

type tests3= [
    Expect<
        Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];



type Fruit =
    | {
    name: "apple";
    color: "red";
}
    | {
    name: "banana";
    color: "yellow";
}
    | {
    name: "orange";
    color: "orange";
};
//?Object Union 을 String Union 으로 변환
type TransformedFruit2 = {
    [K in Fruit as K['name']] : `${K['name']}:${K['color']}`
}[Fruit['name']]

type tests = [
    Expect<
        Equal<TransformedFruit2, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];

//! 연습문제
type TransformedFruit3 = {
    [K in Fruit as `${K['name']}:${K['color']}`] : K['name']
}

type tests = [
    Expect<
        Equal<TransformedFruit3, {
            "apple:red": "apple";
            "banana:yellow": "banana";
            "orange:orange": "orange";
        }>
    >,
];
