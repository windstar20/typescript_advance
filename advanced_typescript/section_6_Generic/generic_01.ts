import { Equal, Expect } from "../function";


const intFc = (i: number) => i;
const strFc = (s: string) => s;

const genericFc = <T>(arg: T) => arg;

const boolFc : boolean = genericFc<boolean>(true);

// generic Q1.
// const returnWhatIPassIn = <T>(t: T) => t

// const one = returnWhatIPassIn(1);
// const matt = returnWhatIPassIn("matt");

// type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];

export const returnWhatIPassIn = <T extends string>(t: T) => t;
const a = returnWhatIPassIn("a");

type test1 = Expect<Equal<typeof a, "a">>;

// @ts-expect-error
returnWhatIPassIn(1);

// @ts-expect-error
returnWhatIPassIn(true);

// @ts-expect-error
returnWhatIPassIn({
    foo: "bar",
});


// 다수의 제네릭 타입
const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
    return {
        first: params.a,
        second: params.b,
    };
};

// rest parameters in generic

type GetParametersAndReturnType<T extends (...args: any) => any   > = {
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



// NotEmptyArray type

type NonEmptyArray<T> = [T, ...Array[T]];
export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(['a']);
makeEnum([]);
