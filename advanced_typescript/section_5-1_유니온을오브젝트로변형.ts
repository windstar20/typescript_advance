import { Expect, Equal } from "./function";

export type Route = 
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

export type RoutesObject = {
    [K in Route as K['route']] : K['search']
};

type tests = [
    Expect<
        Equal<
            RoutesObject,
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
// Object =>
interface Values {
    email: string;
    firstName: string;
    lastName: string;
}

type ValuesAsUnionOfTuples = {
    [K in keyof Values] : [K, Values[K]]
}[keyof Values];

type tests2 = [
    Expect<
        Equal<
            ValuesAsUnionOfTuples,
            ["email", string] | ["firstName", string] | ["lastName", string]
        >
    >
];

// Obejct key, value 를 string union 으로 변형.
interface FruitMap {
    apple: "red";
    banana: "yellow";
    orange: "orange";
}

type TransformedFruit = {
    [K in keyof FruitMap] : `${K}:${FruitMap[K]}`
}[keyof FruitMap]

type tests3 = [
    Expect<
        Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];


// Object union을 string union으로 변형

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

type TransformedFruit2 = {
    [K in Fruit as K['name']] : `${K['name']}:${K['color']}`
}[Fruit['name']]

type tests4 = [
    Expect<
        Equal<TransformedFruit2, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];

