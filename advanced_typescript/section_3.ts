const fakeDataDefaults :{foo: string, bar: number, baz: boolean} = {
    foo: 'bar',
    bar: 123,
    baz: true,
};

type CombineFn = typeof fakeDataDefaults;

export type FooType = CombineFn['foo'];
export type BarType = CombineFn['bar'];
export type BazType = CombineFn['baz'];

//=====

export const Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue",
} as const;

enum ColorEnum {
    Red,
    Green,
    Blue
}

type Red = typeof Color['Red'];
type Green = typeof Color['Green'];
type Blue = typeof Color['Blue'];

type ColorType = keyof typeof Color;

function color(c: ColorType) {

}
color('Blue')

export const Color2 = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const;

type RedAndBlue = typeof Color2[keyof typeof Color2]


// array indexing
const rgb = ['red', 'green', 'blue'] as const;

type RedAndBlue2 = typeof rgb[number];