//템플릿 리터럴

type SpecialCharacter = '/';
type Location = 'users';


type Path = `/${string}`;

export function makeUrl(path: Path) {
    return `https://mywebsite.com${path}`
}

makeUrl('/users');

makeUrl('/users/1');

type Routes = "/users" | "/users/:id" | "/products" | "/products/:id";

type DynamicRoutes = Extract<Routes, `/${string}/:id`>;

// combination

type Top = "t-shirt" | "shirts" | "jacket";

type Bottom = "jeans" | "skirt" | "slacks";

type Outfit = `${Top} with ${Bottom}`;

// 패턴을 갖고 있는 object 타입 만들기 =? Record
type fKey = 'user' | 'post' | 'comment';
type bKey = 'Id' | 'Name'

type ObjectOfKeys = Record<`${fKey}${bKey}`, string>;

// key 를 UpperCase 로 변환

type Event = `log_in` | "log_out" | "sign_up";

type UpperKeys = Record<Uppercase<Event>, string>;



