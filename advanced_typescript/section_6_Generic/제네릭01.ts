import {Equal, Expect} from "../function";

const returnWhatIPassIn = <T>(t: T) : T => {
    return t;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];


//? 제네릭 타입 제한 풀기
export const returnWhatIPassIn2 = <T extends string>(t: T) => t;
const a = returnWhatIPassIn2("a");

type test1 = Expect<Equal<typeof a, "a">>;

// @ts-expect-error
returnWhatIPassIn2(1);

// @ts-expect-error
returnWhatIPassIn2(true);

// @ts-expect-error
returnWhatIPassIn2({
    foo: "bar",
});

//?다수의 타입 인자 풀기
const returnBothOfWhatIPassIn = <T1, T2>(params: { a: unknown; b: unknown }) => {
    return {
        first: params.a,
        second: params.b,
    };
};

//? 기본 타입 인자 문제 풀기
type CreateDataShape<TData, TError = undefined> = {
    data: TData;
    error: TError;
};

type tests = [
    Expect<
        Equal<
            CreateDataShape<string>,
            {
                data: string;
                error: undefined;
            }
        >
    >,
    Expect<
        Equal<
            CreateDataShape<boolean, SyntaxError>,
            {
                data: boolean;
                error: SyntaxError;
            }
        >
    >,
];

//? 클래스 제네릭 타입 풀어보기
export class Component<T> {
    private props: T;

    constructor(props: T) {
        this.props = props;
    }

    getProps = () => this.props;
}

const component = new Component({ a: 1, b: 2, c: 3 });

const result = component.getProps();
type tests = [
    Expect<Equal<typeof result, { a: number; b: number; c: number }>>
];

//? rest 제네릭 타입

type GetParametersAndReturnType<T extends (...args: any) => any> = {
    params: Parameters<T>;
    returnValue: ReturnType<T>;
};

type tests = [
    Expect<
        Equal<
            GetParametersAndReturnType<() => string>,
            { params: []; returnValue: string }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(s: string) => void>,
            { params: [string]; returnValue: void }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(n: number, b: boolean) => number>,
            { params: [number, boolean]; returnValue: number }
        >
    >,
];

//? 타입 스페이스에서의 Empty Object
export type Maybe<T extends {}> = T | null | undefined;

type tests = [
    // @ts-expect-error
    Maybe<null>,
    // @ts-expect-error
    Maybe<undefined>,

    Maybe<string>,
    Maybe<false>,
    Maybe<0>,
    Maybe<"">,
];

//? NonEmptyArray 타입
type NonEmptyArray<T> = [T, ...Array<T>];

export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(['a']);
makeEnum(['a', 'b', 'c']);

// @ts-expect-error
makeEnum([]);


//? reduce 타입
const array = [
    {
        name: "Park",
    },
    {
        name: "Kim",
    },
];

const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
    accum[item.name] = item;
    return accum;
}, {});

type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];