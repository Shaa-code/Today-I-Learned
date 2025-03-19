// 기본.
function swap<T>(a: T) {
  return [b, a];
}

const [a, b] = swap("1", 2);

//1. 들어오는 인자의 타입이 서로 다른 경우에? -> 2개로 선언하면됨.
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);

//2. 모두다 any가 아닌, 명확한 타입을 반환하게 만들고 싶을 때,
function returnFirstValue(data: any) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// 0

let str = returnFirstValue(["hello", "mynameis"]);
// "hello"

//뭔지는 모르겠지만, 배열이 들어올 때는 "T[]"라고 배열로 명시해줘야한다.
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// 0

let str = returnFirstValue([1, "hello", "mynameis"]);
// "hello" -> 이렇게하면 number, string으로 타입을 추론한다.

//3. 이때 number | string 으로 추론하는게 아니라 number만으로 하고 싶다면?
function returnFirstValue<T>(data: [T, ...unknown]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// 0

let str = returnFirstValue([1, "hello", "mynameis"]);
// "hello" -> 이렇게하면 number로만 추론된다.

function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

let var1 = getLength([1, 2, 3]); // 배열도 length를 가지고 있음.
let var2 = getLength("12345"); // 문자열도 length를 가지고 있음.
let var3 = getLength({ length: 10 }); //객체에 length를 만들어줘서 가지고있음.
let var4 = getLength(10); // 이런 잘못된 값은 length가 못나오게 해야한다.
// 위 처럼 제네릭을 설정하면 length가 못 나온다.
