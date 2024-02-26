//? Object Argument 의 Key 타입 추론하기


const typedObjectKeys = <T extends string>(obj: Record<T, any>) => {
    return Object.keys(obj) as Array<T>;
};

const result1 = typedObjectKeys({
    a: 1,
    b: 2,
});


