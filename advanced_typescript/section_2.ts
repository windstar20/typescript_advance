
interface User {
  id : number;
  name: string;
}

const user : User = {
  id : 1,
  name : 'james',
}

function getUser(user :User) : User {
  return user;
}

// 함수의 인자의 타입을 리턴한다.
type MakeUserParameters = Parameters<typeof getUser>

// 함수의 리턴값을 리턴한다.
type MakeUserReturnType = ReturnType<typeof getUser>;

//-----------

const getProduct = () => {
  return Promise.resolve({
    id: "123",
    name: "John",
    email: "john@example.com",
  });
};
//T1에 Promise<T> 타입을 넘겨주면 Promise 타입이 벗겨지고 T가 리턴된다.
type PromiseReturnValue = Awaited<ReturnType<typeof getProduct>>;


// Exclude 특정 타입을 제외한 새로운 타입을 생성한다.
type T0 = Exclude<string | number | boolean, boolean>

// Extract 특정 타입을 뽑아서 새로운 타입을 생성한다.
type T1 = Extract<string | number | boolean, number | boolean>;


export const Color = {  
  Red  : "Red",   // "red"
  Green: "Green",  //"green"
  Blue : "Blue",  // "blue"
} as const

type Redd = typeof Color['Red'];

type ColorType = keyof typeof Color;
type ColorValue = typeof Color;

function color(c: ColorType) {
  return 'red';
}

color('Red');
color(Color.Red);

//as const indexing
export const Color2 = {
  Red: "red",
  Green: "green",
  Blue: "blue",
  Yellow: 'yellow',
} as const;

type RedAndBlue = typeof Color2[keyof typeof Color2];


// enum
enum ColorEnum {
  Red,
  Green,
  Blue
}

function enumColor(c: ColorEnum) {

}
color('Blue');
enumColor(ColorEnum.Red);

type Red = ColorEnum.Red;
type Green = ColorEnum.Green;
type Blue =  ColorEnum.Blue;



// Object indexing 기초
const fakeDataDefaults :{foo: string, bar: number, baz: boolean} = {
  foo: 'bar',
  bar: 123,
  baz: true,
}

type FakeDataType = typeof fakeDataDefaults;

export type FooType = FakeDataType['foo'];
export type BarType = FakeDataType['bar'];
export type BazType = FakeDataType['baz'];
type FooOriginType = typeof fakeDataDefaults['foo'];

// discriminated object 의 인덱싱

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
type EventType = Event['type'];


const rgb = ["red", "green", "blue"] as const;

type ArrayRedAndBlue = typeof rgb[0 | 1];
type ArrayRGB = typeof rgb[number];








