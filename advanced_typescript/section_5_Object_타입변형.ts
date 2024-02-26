//object type 변형

type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
    [K in Route] : K
}


interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
}
 
// type AttributeGetters = {
//     [K in keyof Attributes] : () => Attributes[K]
// }

type AttributeGetters = {
    [K in keyof Attributes as `get${Capitalize<K>}`] : () => Attributes[K]
}

