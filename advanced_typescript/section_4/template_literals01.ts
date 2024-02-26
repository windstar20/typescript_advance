import {makeUrl} from "../section_4";
import {Equal, Expect} from "../function";


type Path = `/${string}`;

export function makeUrl(path: Path) : string {
    return `https://mywebsite.com${path}`
}

makeUrl("/users");
//* /users 는 에러가 없지만, 아래의 경우 에러가 생긴다.
makeUrl("users/1");


//? Template literals 와 extract
type Routes = "/users" | "/users/:id" | "/products" | "/products/:id";

type DynamicRoutes = Extract<Routes, `/${string}:id`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/products/:id">>];


//? Combination 문제
type Top = "t-shirt" | "shirts" | "jacket";

type Bottom = "jeans" | "skirt" | "slacks";

type Outfit =  `${Top} with ${Bottom}`

type tests = [
    Expect<
        Equal<
            Outfit,
            | "t-shirt with jeans"
            | "t-shirt with skirt"
            | "t-shirt with slacks"
            | "shirts with jeans"
            | "shirts with skirt"
            | "shirts with slacks"
            | "jacket with jeans"
            | "jacket with skirt"
            | "jacket with slacks"
        >
    >
];

//? 패턴을 갖고 있는 Object 쉽게 만들기

type First = 'user' | 'post' | 'comment';
type Second = 'Id' | 'Name';

type ObjectOfKeys = Record<`${First}${Second}`, string>

type tests = [
    Expect<
        Equal<
            ObjectOfKeys,
            {
                userId: string;
                userName: string;
                postId: string;
                postName: string;
                commentId: string;
                commentName: string;
            }
        >
    >,
];

//? Type utility (Uppercase) 문제

type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys2 = Record<Uppercase<Event>, string>;

type tests = [
    Expect<
        Equal<
            ObjectOfKeys2,
            {
                LOG_IN: string;
                LOG_OUT: string;
                SIGN_UP: string;
            }
        >
    >,
];

type UrlType = `http://${string}.org`

function getProtocol(url: UrlType) {
    return url.split(":")[0];
}

getProtocol("http://typescriptlang.org");
// @ts-expect-error
// getProtocol("typescriptlang.org");