import { Equal, Expect } from "../function";

export type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
    [K in Route] : K
}

type tests = [
    Expect<
      Equal<
        RoutesObject,
        {
          '/': '/';
          '/about': '/about';
          '/admin': '/admin';
          '/admin/users': '/admin/users';
        }
      >
    >
];

interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
}

type AttributeGetters = {
    [K in keyof Attributes as `get${Capitalize<K>}`] : () => Attributes[K]
}
// 유니온 타입을 변경하기
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

type RoutesObject2 = {
    [K in Route2 as K['route']] : K['search']
}

type tests3 = [
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

//Object 를 Tuple 로 변형

interface Values {
    email: string;
    firstName: string;
    lastName: string;
}

type ValuesAsUnionOfTuples = {
    [K in keyof Values] : [K, Values[K]]
}[keyof Values]

type tests4 = [
    Expect<
        Equal<
            ValuesAsUnionOfTuples,
            ["email", string] | ["firstName", string] | ["lastName", string]
        >
    >
];

// Object Key, value 를 string union 으로 변형
interface FruitMap {
    apple: "red";
    banana: "yellow";
    orange: "orange";
}

type TransformedFruit = {
    [K in keyof FruitMap] : `${K}:${FruitMap[K]}`
}[keyof FruitMap]

type tests5 = [
    Expect<
        Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];

// Object union 을 tuple 로 변형
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

type TransformedFruit1 = {
    [K in Fruit as K['name']] : `${K['name']}:${K['color']}`
}[Fruit['name']]

type tests6 = [
    Expect<
        Equal<TransformedFruit1, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];

type TransformedFruit2 = {
    [K in Fruit as `${K['name']}:${K['color']}`] : K['name']
}

type tests = [
    Expect<
        Equal<TransformedFruit2, {
            "apple:red": "apple";
            "banana:yellow": "banana";
            "orange:orange": "orange";
        }>
    >,
];
