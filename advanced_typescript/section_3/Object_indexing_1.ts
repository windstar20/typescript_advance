import {Equal, Expect} from "../function";


export const fakeDataDefaults = {
    foo: "bar",
    bar: 123,
    baz: true,
}

type FakeDataType = typeof fakeDataDefaults;


export type FooType = FakeDataType['foo'];
export type BarType = FakeDataType["bar"];
export type BazType = FakeDataType["baz"];

type test = [
    Expect<Equal<FooType, string>>
]

//* Enum 을 대체하는 as const 사용법
export const Color = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const;

enum ColorEnum {
    Red,
    Green,
    Blue
}

type Red = typeof Color['Red'];
type Green = typeof Color['Green'];
type Blue = typeof Color['Blue'];

type tests1 = [
    Expect<Equal<Red, "red">>,
    Expect<Equal<Green, "green">>,
    Expect<Equal<Blue, "blue">>,
];


//! as const indexing 문제
type RedAndBlue = typeof Color['Red' | 'Blue']

type tests2 = [
    Expect<Equal<RedAndBlue, "red" | "blue">>
];

//! 05-object-values
type RedGreenBlueValue = typeof Color[keyof typeof Color];
type TColor = typeof Color;

type tests = [
    Expect<Equal<RedGreenBlueValue, "red" | "blue" | "green">>
];

//?Array indexing 문제

const rgb = ["red", "green", "blue"] as const;

type RedAndBlueRGB = typeof rgb[0 | 1];
type RGB = typeof rgb[number];

type tests3 = [
    Expect<Equal<RedAndBlueRGB, "red" | "green">>,
    Expect<Equal<RGB, "red" | "green" | "blue">>,
];

//!
export type Event =
    | {
    type: "click";
    event: MouseEvent;
}
    | {
    type: "focus";
    event: FocusEvent;
}
    | {
    type: "keydown";
    event: KeyboardEvent;
};

type EventType = Exclude<Event, {type: 'keydown'}>['type'];

type tests4 = [Expect<Equal<EventType, "click" | "focus">>];