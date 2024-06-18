import { Equal, Expect } from "../function";

// 리턴타입
const myFunc = () => {
	return {
		name : 'james'
	};
}

type MyFunctionReturn = ReturnType<typeof myFunc>;

type tests = [Expect<Equal<MyFunctionReturn, {name: string}>>]


//파라미터타입
function func(
	foo: string,
	obj: {
		bar?: number;
		bas: boolean;
}) {

}

type FuncParameters = Parameters<typeof func>;

type tests = [
	Expect<Equal<FuncParameters, [
		string,
		{
			bar?: number;
			bas: boolean;
		}
		]>>
]

//


const getUser = () => {
	return Promise.resolve({
		id: "123",
		name: "John",
		email: "john@example.com",
	});
};

type ReturnValue = Awaited<ReturnType<typeof getUser>>

type tests = [
	Expect<Equal<ReturnValue, { id: string; name: string; email: string }>>
];
