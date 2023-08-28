# 데이터 타입과 연산자

## 기본 타입

Number

String

Boolean

undefined

null

`Javascript 는 느슨한 타입 체크로 선언시 타입을 정하지 않고 선언한다.`

C언어나 Java 처럼 Int, long, 이런거 안 정해줘도 된다.

`Javascript는 변수에 어떤 형태의 데이터를 저장하느냐에 따라 해당 변수의 타입이 결정된다.`

`// 저장하는 순간 타입이 결정되는거다.`

### Number

`Javascript에는 하나의 숫자형만 존재한다.`

`Javascript는 모든 숫자를 64비트 부동 소수점 형태로 저장하기 때문이다.`

즉, 자바스크립트에서는 정수형이 따로 없고, 모든 숫자를 실수로 처리한다.

그래서 나눗셈 연산을 할 때 주의 해야한다.

정수만을 표현하기 위해서는 Math.floor(num)을 사용해야 한다.

문자열은 배열처럼 인덱스를 이용해서 접근할 수 있다.

```jsx
var str = 'test';
console.log(str[0], str[1], str[2], str[3]); // test

str[0] = 'T';
console.log(str); // test
```

`Javascript에서 한번 생성된 문자열은 읽기만 가능하지 수정은 불가능하다.`

### Boolean

`undefined, null 둘 다 ‘값이 비어있음’을 나타낸다.`

- undefined

undefined는 타입도 undefined이며, 값도 undefined이다.

즉, undefined는 타입이자, 값을 나타낸다.

```jsx
var emptyVar; // undefined
```

- null

```jsx
var nullVar = null; // null

console.log(typeof nullVar === null); // false
console.log(nullVar === null);
```

`null의 typeof 결과는 null이 아니라 object이다.`

`Javascript에서는 null 타입 변수인지를 확인할 때 typeof 연산자가 아닌 ‘===’ 일치 연산자를 사용해서 변수의 값을 직접 확인해야 한다.`

`null은 어떤 형태로든 값을 넣어준 경우이다.`

## 참조 타입

- 객체
    1. 배열
    2. 함수
    3. 정규표현식
    

`Javascript 에서 기본 타입을 제외한 모든 값은 객체이다.`

Javascript의 객체는 자바와 같은 기존 객체지향 언어의 객체 개념과는 약간 다르다.

Java에서는 클래스를 정의하고, 클래스의 인스턴스를 생성하는 과정에서 객체가 만들어진다.

이에 비해 Javascript에서는 클래스라는 개념이 없고, 객체 리터럴이나 생성자 함수 등 별도의 방식이 존재한다.

자바스크립트에서 객체를 생성하는 방법은 크게 3가지가 있다.

1. 기본제공 Object() 객체 생성자 함수를 이용하는 방법

```jsx
var foo = new Object();

foo.name = 'foo';
foo.age = 30;
foo.gender = 'male';

console.log(typeof foo); // object
console.log(foo); // {name : 'foo' , age: 30, gender: 'male'}
```

1. 객체 리터럴을 이용하는 방법

```jsx
var foo = {
    name : 'foo',
    age : 30,
    gender: 'male'
};

console.log(typeof foo); // object
console.log(foo); // {name : 'foo' , age: 30, gender: 'male'}
```

1. 생성자 함수 이용

Javascript 의 경우에는 함수를 통해서도 객체를 생성할 수있다.

`이렇게 객체를 생성하는 함수를 “생성자 함수”라고 정의한다. (4장에서 살펴봄)`

- 객체 프로퍼티 읽기/쓰기/갱신

name, age, gender를 프로퍼티라고 정의한다.

객체의 프로퍼티 접근

```jsx
var foo = {
    name : 'foo',
    major : 'computer science'
}

//객체 프로퍼티 읽기
console.log(foo.name) // foo
console.log(foo['name']); // foo
console.log(foo.nickname); // undefined

//객체 프로퍼티 갱신
foo.major = 'eletronics engineering';

//객체 프로퍼티 동적 생성
foo.age = 30;
console.log(foo.age); // 30

//대괄호 표기법만을 사용해야 할 경우
foo['full-name'] = 'foo bar';
console.log(foo['full-name']); // foo bar;
console.log(foo.full-name); // NaN foo.full 빼기 name -> 계산되어서 NaN이 나온다.

//접근 방식이 2개가 있는 이유이다.
```

없는 프로퍼티를 생성하는 것을 “동적 생성”이라고 정의한다.

이미 프로퍼티가 있으면 값 갱신, 객체의 프로퍼티가 없을 때는 동적으로 생성된 후 값이 할당된다.

`객체에서 프로퍼티 동적생성이 허용된다는점을 기억하는게 중요하다.`

- 왜 foo[’name’]으로 해야할까?

foo[name]은 안될까?

javascript 에서는 대괄호 표기법에서 접근하려는 프로퍼티 이름을 문자열 형태로 만들지 않으면 모든 자바스크립트 객체에서 호출 가능한 toString()이라는 메서드를 자동으로 호출해서 이를 문자열로 바꾸려는 시도를 한다.

`toString을 호출하기에 안된다.`

- NaN(Not a Number)

NaN은 수치 연사을 해서 정상적인 값을 얻지 못할 때 출력되는 값이다.

ex) 1- ‘hello’는 NaN이다.

“foo.full 빼기 name”를 계산하게 된다.

이렇게 되면 foo.full 은 undefined이고, name도 undefined이므로, undefined - undefined이다.

또한 Javascript에서 undefined - undefined = NaN으로 정의되어 있다.

```jsx
var foo = {
    name: 'foo',
    age: 30,
    major: 'computer science'
}

var prop;
for (prop in foo){
    console.log(prop, foo[prop])
}
```

prop에는 프로퍼티가 들어가고, foo[prop]에는 의 이름이 들어가서 HashMap의 형태가 된다.

- 객체 프로퍼티 삭제

Javascript에서는 객체의 프로퍼티를 delete 연산자를 사용해 즉시 삭제할 수 있다.

`delete는 프로퍼티만 삭제하지, 객체 자체를 삭제하지는 못한다.`

```jsx
var foo = {
    name: 'foo',
    nickname: 'babo'
};

console.log(foo.nickname); // 'babo'
delete foo.nickname;
console.log(foo.nickname); // undefined

delete foo;
console.log(foo) // foo
```

- 참조 타입의 특성

객체의 모든 연산이 실제 값이 아닌 참조값으로 처리되기 때문이다.

```jsx
var objA = {
    val : 40
};

var objB = objA;
console.log(objA.val); // 40
console.log(objB.val); // 40

objB.val = 50;
console.log(objA.val); // 50
console.log(objB.val); // 50
```

- 객체 비교

`== 동등 연산자를 사용하여 두 객체를 비교할 때는 프로퍼티 값이 아닌 참조값을 비교한다.` 값만 비교

=== 은 값과 타입을 모두 비교

```jsx
var a = 100;
var b = 100;

var objA = { value : 100 };
var objB = { value : 100 };
var objC = objB;

console.log(a == b); // true
console.log(objA == objB) // false;
console.log(objB == objC) // true;
```

- 참조에 의한 함수 호출 방식

기본타입의 경우 함수 호출시 인자는 Call By Value

함수를 호출할 때 인자로 기본 타입의 값을 넘길 경우, 호출된 함수의 매개변수로 복사된 값이 전달된다.

참조타입(객체)의 경우 함수 호출 시 Call By Reference

`함수를 호출할 때 인자로 참조 타입인 객체를 전달할 경우, 객체의 프로퍼티 값이 함수의 매개변수로 복사되지 않고, 인자로 넘긴 객체의 참조값이 그대로 함수 내부로 전달된다.`

```jsx
var a = 100;
var objA = { value : 100 };

function changeArg(num, obj){
    num = 200;
    obj.value = 200;

    console.log(num);
    console.log(obj);
}

changeArg(a, objA);

console.log(a);
console.log(objA);
```

- 프로토타입

Javascript의 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다.

`객체지향 상속 개념과 같이 부모 객체의 프로퍼티를 마치 자신의 것처럼 쓸 수 있다.`

`Javascript에서는 이런 부모 객체를 프로토타입 객체( 짧게는 프로토타입 )라고 정의한다.`

```jsx
var foo = {
    name: 'foo',
    age: 30
};

foo.toString();

console.dir(foo);
```

- console.dir에 대해서
    
    console.log는 요소를 HTML과 같은 트리 구조로 출력 하고,
    
    DOM 요소에 대해 특별한 처리를 제공.
    
    ![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/177d935c-20ad-4a85-97f9-953365918429)
  
    console.dir은 요소를 JSON과 같은 트리 구조로 출력 하고,
    
    DOM JS 객체의 전체 표현을 보려고 할 때 유용.
    
    ![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/a4bf622f-ad56-4a40-b82d-56598ed7ee9b)

    **객체는 dir, 나머지는 log로 로깅하면 편하다.**
    

toString을 정의하지 않았지만, foo 객체의 프로토타입에 toString()이 이미 정의되어 있고, foo 객체가 상속처럼 toString() 메서드를 호출했기에 오류가 발생하지 않는다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/d38b270d-199f-4a19-acf1-8b2f9d9a7cc6)

객체 리터럴로 생성한 name과 age 프로퍼티 이외에 foo객체에 [[Prototype]] 프로퍼티가 있음을 확인할 수 있다.

ECMAScript 명세서에는 Javascript의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]라는 숨겨진 프로퍼티를 가진다고 설명하고 있다.

이 프로퍼티가 바로 앞서 설명한 foo 객체의 부모인 프로토타입 객체를 가리킨다. 이 객체의 다음 부분에 toString() 메서드가 정의되어 있다는 것을 알 수 있다.

`모든 객체의 프로토타입은 자바스크립트의 룰에 따라 객체를 생성할 때 결정된다. (프로토타입 체이닝에서 자세히 설명함.)`

`객체 리터럴 방식으로 생성된 객체의 경우 Object.prototype 객체가 프로토타입 객체가 된다는 것만 기억하고 넘어가자.`

`[[Prototype]]객체가 가리키는 객체가 바로 Object.prototype이며, toString(), valueOf()등과 같은 모든 객체에서 호출 가능한 Javascript 기본 내장 메서드가 포함되어 있다.`

그래서, 다양한 메서드를 마치 자신의 프로퍼티인것 처럼 상속받아 사용할 수 있다.

Object.prototype 객체에 포함된 메서드들은 자바스크립트 표준 메서드로서 ECMAScript 명세서에 정의되어 있다.

또한 객체를 생성할 때 결정된 프로토타입 객체는 임의의 다른 객체로 변경하는 것도 가능하다.

즉, 부모 객체를 동적으로 바꿀 수도 있는 것이다.

자바스크립트에서는 이러한 특징을 활용해서 객체 상속등의 기능을 구현한다.

이와 같이 프로토타입을 활용한 Javascript 상속에 대해서는 6장에서 알아본다.

### 배열

`Java나 C처럼 굳이 크기를 지정하지 않아도 되며, 어떤 위치에 어느 타입의 데이터를 저장하더라도 에러가 발생하지 않는다.`

배열 리터럴은 []을 사용한다.

- 배열의 요소 생성

배열도 동적으로 배열 원소를 추가할 수 있다.

`특히, Javascript의 배열의 경우는 값을 순차적으로 넣을 필요 없이 아무 인덱스 위치에나 값을 동적으로 추가할 수 있다.`

```jsx
var emptyArr = [];
console.log(emptyArr[0]); // undefined

// 배열 요소 동적 생성
emptyArr[0] = 100;
emptyArr[3] = 'eight';
emptyArr[7] = true;

console.log(emptyArr); // [100, undefined x 2, "string", undefined x 3, true]
console.log(emptyArr.length) // 8
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/4240b136-ce49-4e0d-ade7-84d4171f5ff0)

- 배열의 length 프로퍼티

```jsx
var arr = [0, 1, 2];
console.log(arr.length); // 3

arr.length = 5;
console.log(arr); // [0, 1, 2, undefined x 2]

arr.length = 2;
console.log(arr); // [0, 1]
console.log(arr[2]); // undefined
```

```jsx
// arr 배열 생성
var arr = ['zero', 'one', 'two'];

// push() 메서드 호출
arr.push('three');
console.log(arr); ['zero', 'one', 'two', 'three']

//length 값 변경 후 , push() 메서드 호출
arr.length = 5;
arr.push('four')
console.log(arr); //['zero', 'one', 'two', 'undefined', 'four']
```

`length를 늘리고, push를 해도 맨 끝에 들어간다는점을 기억해야한다.`

- 배열과 객체

Javascript에서는 배열 역시 객체이다.

하지만 배열은 일반 객체와는 약간 차이가 있다.

```jsx
var colorArray = ['orange', 'yellow', 'green'];

var colorsObj ={
    '0': 'orange',
    '1': 'yellow',
    '2': 'green'
};

console.log(typeof colorsArray); // object
console.log(typeof colorsObj); // object

console.log(colorsArray.length); // 3
console.log(colorsObj.length); // undefined

colorsArray.push('red'); // ['orange', 'yellow', 'green', 'red']
colorsObj.push('red'); // Uncaught TypeError: Object #<Object> has no method 'push'
```

colorsObj[0]이 아니라 colorsObj[’0’]의 형태로 기입하는 것이 맞다.

하지만 다음 예제에서는 colorsObj[0]의 결과가 ‘orange’로 정상 출력되었다.

어떻게 된걸까?

`이것은 Javascript엔진이 [] 연산자 내에 숫자가 사용될 경우, 해당 숫자를 자동으로 문자열 형태로 바꿔주기 때문이다.`

- length 프로퍼티, 배열 표준 메서드 호출 여부

객체 → Object.prototype

배열 → Array.prototype → Object.prototype

객체 리터럴 방식으로 생성한 객체의 경우, 객체 표준 메서드를 저장하고 있는 Object.prototype 객체가 프로토 타입이다.

배열의 경우 Array.prototype 객체가 부모 객체인 프로토타입이 된다.

Array.prototype 객체는 배열에서 사용할 push(), pop() 같은 표준 메서드를 포함하고 있다.

그리고 Array.prototype 객체의 프로토타입은 Object.prototype 객체가 된다.

- 배열 프로퍼티 동적 생성

배열도 Javascript의 객체이므로, 인덱스가 숫자인 배열 원소 이외에도 객체처럼 동적으로 프로퍼티를 추가할 수 있다.

```jsx
var arr = ['zero', 'one', 'two'];
console.log(arr.length); //3

arr.color = 'blue';
arr.name = 'number_array';
console.log(arr.length); // 3

arr[3] = 'red';
console.log(arr.length); // 4

console.dir(arr);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b4aaaa1a-6a10-431d-87b5-237ce01a6387)

배열인데도, 프로퍼티를 넣을 수 있다는점을 알고 있자.

- 배열의 프로퍼티 열거

이때, 배열만 열거 하고 싶으면 for [i]로 접근하자.

```jsx
// for in 으로 접근
for (var prop in arr){
    console.log(prop, arr[prop]);
}

0 zero
1 one
2 two
3 three
color blue
name number_array

// for i로 접근
for (var i = 0; i < arr.length; i++){
    console.log(i, arr[i]);
}

0 "zero"
1 "one"
2 "two"
3 "three"
```

- 배열 요소 삭제

배열도 객체이므로 delete연산자를 사용해서 제거가 가능하다.

배열의 원소를 삭제해도 length값은 변하지 않는다.

ex) [”zero”, “one”, undefined x 1, “three”] → 이처럼 undefined로 설정해줄 뿐이다.

보통 배열에서 요소들을 완전히 삭제할 경우 Javascript에서는 splice() 배열 메서드를 사용한다.

splice(start, deleteCount, item…)

start → 배열 시작위치

deleteCount → start로 부터 삭제할 요소 수

item → 삭제할 위치에 추가할 요소

- Array() 생성자 함수

배열 리터럴은 Array() 생성자 함수로 배열을 생성하는 과정을 단순화 시킨것이다.

일부 개발자들은 배열 리터럴 대신 Array() 생성자 함수로 배열을 생성하는 코드를 작성하므로 간단히 알아두자.

```jsx
var foo = new Array(3);
console.log(foo); // [undefined, undefined, undefined]
console.log(foo.length); // 3

var bar = new Array(1, 2, 3);
console.log(bar); // [1, 2, 3]
conosle.log(bar.length); // 3
```

- 유사 배열 객체

일반 객체에 length라는 프로퍼티가 있으면 어떻게 될까?

Javascript에서 length 프로퍼티를 가진 객체를 유사배열 객체 (Array-Like Objects)라고 정의한다.

왜 사용하는가?
객체임에도 불구하고, Javascript 표준 배열 메서드를 사용할 수 있기 때문이다.

```jsx
var arr = ['bar'];
var obj = {
    name : 'foo',
    length : 1
};

arr.push('baz');
console.log(arr); // ['bar', 'baz']

obj.push('baz'); // error
```

바로 push()를 사용한다고 해서, 객체에 값을 넣을 수 있는건아니다.

4장에서 배울 apply() 메서드를 사용하면 객체지만 표준 배열 메서드를 활용하는 것이 가능하다.

```jsx
var arr = ['bar'];
var obj = { name : 'foo', length : 1};

arr.push('baz');
console.log(arr);

Array.prototype.push.apply(obj, ['baz']);
console.log(obj); // {'1' : 'baz', name: 'foo', length: 2}
```

`앞으로 사용할 arguments 객체나 jQuery 객체가 바로 유사 배열 객체 형태로 되엉 있으므로 이러한 성질을 기억하고 있어야 한다.`

### 기본 타입과 표준 메서드

Javascript에서 기본 타입의 경우는 객체가 아닌데 어떻게 메서드를 호출 할 수 있을까?

`기본 타입의 값들에 대해서 객체 형태로 메서드를 호출할 경우, 이들 기본값은 메서드 처리 순간에 객체로 변환된 다음 각 타입별 표준 메서드를 호출하게 되는 것이다.`

그리고 메서드 호출이 끝나면 다시 기본값으로 복귀하게 된다.

```jsx
var num = 0.5;
console.log(num.toExponential(1)); //5.0e-1

console.log('test'.charAt(2)); // 's'
```

이렇듯 숫자와 문자열 등은 기본타입이지만, 이들을 위해 정의된 표준 메서드들을 객체처럼 호출할 수 있다는 것을 기억하자.

이외 다른 메서드들을 알고 싶은 독자들은 ECMAScript 명세서나 다른 서적을 참조하자.

## 연산자

- +연산자

더하기, 문자열 연결

- typeof

null과 배열이 object이다.

| 타입종류 | 이름 | 결과 |
| --- | --- | --- |
| 기본타입 | 숫자 | ‘number’ |
| 기본타입 | 문자열 | ‘string’ |
| 기본타입 | 불린값 | ‘boolean’ |
| 기본타입 | null | ‘object’ |
| 기본타입 | undefined | ‘undefined’ |
| 참조타입 | 객체 | ‘object’ |
| 참조타입 | 배열 | ‘object’ |
| 참조타입 | 함수 | ‘function’ |

- == (동등) 연산자, ===(일치) 연산자.

1. == (Coercive Equality)

비교하려는 피 연산자의 타입이 다를 경우 타입 변환을 거친 다음 비교한다.

1. === (Strict Equality)

피 연산자의 타입이 다를 경우, 타입을 변경하지 않고 비교한다.

```jsx
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```

첫번째 경우에는 타입이 다르므로 변환을 하고 비교해서 true이다.

두번째의 경우는 변환을 하지 않아서 false이다.

jQuery 코딩 가이드 라인에서도 가급적 === 연산자로 비교하기를 권하고 있다.

### !! 연산자

!! 연산자의 역할은 피연산자를 불린 값으로 변환하는 것이다.

```jsx
console.log(!!0); //false
console.log(!!1); //true
console.log(!!'string') // true
console.log(!!'') // false
console.log(!!true); // true
console.log(!!false); //false
console.log(!!null); //false
console.log(!!undefined); //false
console.log(!!{}); //true
console.log(!![1,2,3]); //true
```

`객체는 값이 비어있는 객체라도 true로 반환된다는점을 주의해야한다.`

# 함수와 프로토타입 체이닝

## 함수 정의

함수를 생성하는 3가지 방법

- 함수 선언문(Function Statement)
- 함수 표현식(Function Expression)
- Fucntion() 생성자 함수

같은 함수를 생성하지만 각각의 방식에 따라 함수 동작이 미묘하게 차이가 난다.

### 함수 리터럴

```jsx
function add(x,y){
    return x + y;
}
```

위 방식은 함수 리터럴 이라고 한다. 객체 리터럴 처럼 a = {} 중괄호 형태를 가진다.

### 함수 표현식 방식으로 함수 생성하기

Javascript에서는 함수도 하나의 값처럼 취급된다.

(이런 특징이 있으므로 함수는 일급 객체라고 한다.)

따라서 함수도 숫자나 문자열처럼 변수에 할당하는 것이 가능하다.

`이런 방식으로 함수 리터럴로 하나의 함수를 만들고, 여기서 생성된 함수를 변수에 할당하여 함수를 생성하는 것을 “함수 표현식”이라고 정의한다.`

```jsx
var add = function()x, y) {
    return x + y;
};

var plus = add;

console.log(add(3,4));
console.log(plus(5,6));
```

앞으로 add와 같이 함수가 할당된 변수를 함수 변수라고 부른다.

function이라는 익명함수(객체)에 주소를 연결하는 것이다.

add → 익명함수, plus → 익명함수

- 기명 함수 표현식의 함수 호출 방법

```jsx
var add = function sum(x, y){
    return x + y;
};

console.log(add(3,4)); // 7
conosle.log(sum(3,4)); // Uncaught ReferenceError: sum is not defined
```

`함수 표현식에서 사용된 함수 이름(sum)이 외부코드에서는 접근이 불가능하다.` `// 매우 중요!`

위 처럼 함수 이름이 포함된 함수 표현식을 “기명 함수 표현식” 이라고 정의한다.

- 왜 기명 함수 표현식을 쓰지?

디버거에서 함수를 구분할 때, 함수이름이 나타는데, 이를 위해 사용한다.

또는 함수 내부에서 해당 함수를 재귀적으로 호출할 때 사용한다고 한다. → 아래 쪽 재귀코드 확인!

```jsx
function add(x,y){
    return x + y;
}
```

이 방식으로 선언된 add()함수는 어떻게 함수 이름으로 함수 외부에서 호출이 가능할까?

함수 선언문 형식으로 정의된 add()함수는 Javascript 엔진에 의해 아래와 같은 함수 표현식 형태로 변경된다.

```jsx
var add = function add(x,y) {
    return x + y;
}
```

`함수 이름과 함수 변수의 이름이 add로 같으므로, 함수 이름으로 함수가 호출되는 것처럼 보이지만, 실제로는 add 함수 변수로 함수 외부에서 호출이 가능하게 된 것이다.`

```jsx
var factorialVar = function factorial(n){
    if(n <= 1){
        return 1;
    }
    return n * factorial(n-1);
};

console.log(factorialVar(3));
conosle.log(factorial(3));
```

함수 외부에서는 factorialVar로 함수를 호출했고, 함수 내부에서 이뤄지는 재귀호출은 factorial() 함수 이름으로 처리한다는 것을 알 수 있다.

앞서 설명한 것과 마찬가지로 함수명 factorial()으로 함수 외부에서 해당 함수를 호출하지 못해 에러가 발생한다.

### Function Statement와 Function Expression에서의 세미콜론

- Function Statement

```jsx
function add(x,y){
    return x + y;
}
```

- Function Expression

```jsx
var add = function()x, y) {
    return x + y;
};
```

일반적으로 자바스크립트 코드를 작성할 때 함수 선언문 방식으로 선언된 함수의 경우는 함수 끝에 세미콜론을 붙이지 않는다.

함수 표현식 방식의 경우는 세미콜론을 붙이는 것을 권장한다.

Javascript는 C와 같이 세미콜론 사용을 강제하지 않는다.

`Javascript 인터프리터가 자동으로 세미콜론을 삽입시켜주기 때문이다.`

하지만 신경은 써야한다. (즉시 실행 함수)를 먼저 읽어보고 코드를 이해하보자.

```jsx
var func = function(){
    return 42;
}
(function() {
    console.log("function called");
})();
```

하지만 이 코드는 세미콜론을 사용하지 않았으므로, 실제로 func() 함수를 호출하면 의도와는 다르게 number is not a function 이라는 에러가 발생한다.

`이런 문제가 발생할 수 있어, 많은 Javascript 가이드에서는 함수 표현식 방식에서의 세미콜론 사용을 강력하게 권고하고 있다.`

### Function() 생성자 함수를 통한 함수 생성하기

Javascript의 함수도 Function()이라는 기본 내장 생성자 함수로부터 생성된 객체라고 볼 수 있다.

Function() 생성자 함수로 함수를 생성하는 문법은 다음과 같다.

```jsx
new Function(arg1, arg2, ..., argN, functionBody)
```

함수의 매개변수와 함수가 호출 될 때 실행될 코드를 포함한 문자열을 가지고 있다.

- Function() 생성자 함수를 이용한 add() 함수 생성

```jsx
var add = new Function('x', 'y', 'return x + y');
console.log(add(3,4)); // 7
```

실제로 이렇게 사용하지는 않는다. 혹시라도 다른 사람이 이렇게 작성했을 수도 있으니 알고는 있자.

### 함수 호이스팅 (Function Hoisting)

Javascript Guru로 알려진 더글라스 크락포드는 함수 생성에 있어서 더글라스 크락포드의 Javascript 핵심 가이드 에서 `함수 표현식만을 사용할 것을 권하고 있다.`

`그 이유 중의 하나가 바로 함수 호이스팅 때문이다.`

`호이스팅이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미한다.`

- 함수 선언문 방식과 함수 호이스팅

```jsx
add(2, 3); // 5

function add(x,y){
    return x + y;
}

add(3, 4); // 7
```

add() 함수가 정의되지 않았음에도 함수 호출이 가능하다.

더글러스 크락포드는 이러한 함수 호이스팅은 함수를 사용하기 전에 반드시 선언해야 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들 수도 있다고 지적하며, 함수 표현식 사용을 권장하고 있다.

- 함수 표현식 방식과 함수 호이스팅

```jsx
add(2, 3); // Uncaught type error

var add = function (x, y){
    return x + y;
};

add(3, 4); // 7
```

`즉, 미리 할당이 안되게 코드를 짜는게 구조적으로 완성도가 높다고 보는거다.`

이러한 함수 호이스팅이 발생하는 원인은 Javascript의 변수 생성(Instantiation)과 초기화(Initialization)의 작업이 분리돼서 진행되기 때문이다. (5장에서 자세히 살펴봄)

## 함수 객체

함수도 객체다.

```jsx
function add(x,y){
    return x + y;
}

add.result = add(3, 2);
add.status = 'OK';

console.log(add.result); // 5
console.log(add.status); // OK

// 포함 형태
[[Code]] → return x+y;
result → 5
status → ‘OK’
```

add()함수가 일반 객체처럼 result와 status 프로퍼티를 추가하는게 가능하다는 것을 보여준다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/432cb6a7-6841-4d8d-9454-76061d6defc1)

add() 함수를 생성할 때 함수 코드는 함수 객체의 [[Code]] 내부 프로퍼티에 자동으로 저장된다.

(이것은 ECMAScript 명세서를 참조한 것이다.)

### Javascript에서 함수는 값으로 취급된다.

Javascript에서 함수는 객체다.

이는 함수도 일반 객체처럼 취급될 수 있다는 것을 의미한다.

즉, 다음과 같은 동작이 가능하다.

- 리터럴에 의해 생성
- 변수나 배열의 요소, 객체의 프로퍼티 등에 할당가능
- 함수의 인자로 전달 가능
- 함수의 리턴값으로 리턴 가능
- 동적으로 프로퍼티를 생성 및 할당 가능

이와 같은 특징이 있어서 Javascript에서는 함수를 “일급 객체(First Class)” 라고 정의한다.

여기서 일급 객체라는 용어는 컴퓨터 프로그래밍 언어 분야에서 쓰이는 용어로.

`앞에서 나열한 기능이 모두 가능한 객체를 일급 객체로 정의한다.`

`Javascript 함수가 가지는 이러한 일급 객체의 특성으로 함수형 프로그래밍이 가능하다.`

Javascript에서 함수를 제대로 이해하려면 함수가 일급 객체이며 이는 곧 함수가 일반 객체처럼 값(Value)로 취급 된다는 것을 이해해야 한다.

따라서 함수를 변수나 객체, 배열 등에 값으로도 저장할 수 있으며, 다른 함수의 인자로 전달한다거나 함수의 리턴값으로도 사용 가능하다는 것을 알 수 있다. 

### 변수나 프로퍼티의 값으로 할당

```jsx
// 변수에 함수 값 할당
var foo = 100;
var bar = function(){ return 100; };
console.log(bar()) // 100

var obj = {};
var.baz = function() { return 200; };
conosle.log(obj.baz()); // 200
```

`함수는 숫자나 문자열 처럼 변수나 프로퍼티의 값으로 할당될 수 있다.`

### 함수 인자로 전달

```jsx
// 함수 표현식으로 foo() 함수 생성
var foo = function(func){
    func(); //인자로 받은 func() 함수 호출
};

// foo() 함수 실행
foo(function()){
    console.log('Function can be used as the argument')
});

//Function can be used as the argument
```

`아.. 이게 인자로 함수를 받을 수 있다는 의미였구나.`

### 리턴 값으로 활용

```jsx
var foo = function() {
    return function (){
        console.log('this function is the return value.')
    };
};

var bar = foo();
bar();
// this function is the return value.
```

`이것이 가능한 이유 또한 함수 자체가 값으로 취급되기 때문이다.`

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/35af5b97-1106-4ffc-9c6d-1fb9d7509ecf)

foo 자체는 함수를 반환한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b5201741-b0bb-47d3-855b-1287c7ff09d4)

## 함수 객체의 기본 프로퍼티

함수 역시 일반적인 객체의 기능에 추가로 호출됐을 때 정의된 코드를 실행하는 기능을 가지고 있다는 것이다.

또한, 일반 객체와는 다르게 ㅍ추가로 함수 객체만의 표준 프로퍼티가 정의되어 있다.

```jsx
function add(x, y){
    return x + y;
}

console.dir(add);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/96eeb202-f488-4ced-88bb-834a3d81fa39)

add()함수는 arguments, caller, length 등과 같은 다양한 프로퍼티가 기본적으로 생성된 것을 확인할 수 있다.

이러한 프로퍼티들이 함수를 생성할 때 포함되는 표준 프로퍼티다.

ECMA5 스크립트 명세서에는 모든 함수가 length와 prototype 프로퍼티를 가져야 한다고 기술한다.

length나 prototype 이외에 name, caller, arguments 들은 ECMA 표준이 아니다.

- name

name 프로퍼티는 함수의 이름을 나타낸다.

예제에서는 함수명이 add이지만, 만약 이름이 없는 익명 함수라면 name 프로퍼티는 빈 문자열이 된다.

- caller

caller 프로퍼티는 자신을 호출한 함수를 나타낸다.

add() 함수를 호출하지 않았으므로, null 값이 나온다.

- arguments

arguments 프로퍼티는 함수를 호출할 때 전달된 인자값을 나타낸다.

현재는 add() 함수가 호출된 상태가 아니므로 null 값이 출력됐다.

- __ proto __

이전에도 언급했듯이, 모든 자바스크립트 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 내부 프로퍼티를 가진다.

크롬 브라우저에서는 [[Prototype]] 이라는 내부 프로퍼티가 바로 _ _ proto _ _ 프로퍼티로 구현되어있다.

add()와 같이 함수 객체의 부모 역할을 하는 프로토타입 객체를 Function.prototype 객체라고 명명하고 있으며, 이것 역시 함수 객체라고 정의한다.

크롬 브라우저에서는 Function Prototype 객체를 Empty() 함수라고 명하고 있으며, 이 역시 함수 객체이므로 add() 함수와 마찬가지로 name, caller, arguments 등과 같은 함수 객체의 프로퍼티가 있음을 확인할 수 있다.

- Function.prototype 객체의 프로토타입 객체

모든 함수들의 부모 객체는 Function Prototype 객체라고 한다.

그런데 ECMAScript 명세서에는 Function.prototype은 함수라고 정의하고 있다.

그렇다면 이러한 규칙에 의해 Function.prototype 함수 객체도 결국 함수이므로 Function Prototype 객체, 즉, 자기 자신을 부모가 갖는 것인가? 라는 의문이 생기는 독자가 있을 것이다.

ECMAScript 명세서에는 예외적으로 Function.prototype 함수 객체의 부모는 Javascript의 모든 객체의 조상인 Object.prototype 객체라고 설명하고 있다.

객체의 __ proto __ 프로퍼티는 Object.prototype 객체를 가리키고 있다.

참고로 Function.prototype 객체는 모든 함수들의 부모 역할을 하는 프로토타입 객체다.

때문에 모든 함수는 Function Prototype 객체가 있는 프로퍼티나 메서드를 마치 자신의 것처럼 상속받아 그대로 사용할 수 있다.

ECMAScript 명세서에는 이러한 Function.prototype 객체가 가져야하는 프로퍼티들ㄹ을 다음과 같이 기술한다.

- constructor 프로퍼티
- toString() 메서드
- apply(thisArg, argArray) 메서드
- call(thisArg, [, arg1 [, arg2, ]]) 메서드
- bind(thisArg, [, arg1 [, arg2 ]]) 메서드

apply(), call()은 실제로 자주 사용되는 중요한 메서드이므로, 이후 자세히 살펴본다.

- length 프로퍼티

ECMAScript에서 정한 모든 함수가 가져야 하는 표준 프로퍼티로서, 함수가 정상적으로 실행될 때 기대되는 인자의 개수를 나타낸다.

```jsx
function func0() { } ;
function func1(x) { return x; }
function func2(x, y) { return x + y; }
function func3(x, y, z) { return x + y + z; }

console.log(func0.length); // 0
console.log(func1.length); // 1
console.log(func2.length); // 2
console.log(func3.length); // 3
```

`length 프로퍼티는 함수를 작성할 떄 정의한 인자 개수를 나타내고 있음을 확인할 수 있다.`

- prototype 프로퍼티

모든 함수는 객체로서 prototype 프로퍼티를 가지고 있다.

`주의할 것은 함수 객체의 prototype 프로퍼티는 앞서 설명한 모든 객체의 부모를 나타내는 내부 프로퍼티인 [[Prototype]]과 혼동하지 말아야 한다는 것이다.`

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/d2d0eb1d-5780-4448-ba7a-af4b79a0fee3)

prototype 프로퍼티는 함수가 생성될 때 만들어지며, 다음 그림과 같이 단지 consturctor 프로퍼티 하나만 있는 객체를 가리킨다.

그리고 prototype 프로퍼티가 가리키는 프로토타입 객체의 유일한 constructor 프로퍼티는 자신과 연결된 함수를 가리킨다.

즉, Javascript에서는 함수를 생성할 때, 함수 자신과 연결된 프로토타입 객체를 동시에 생성하며, 이 둘은 다음 그림처럼 각각 prototype과 constructor라는 프로퍼티로 서로를 참조하게 된다.

함수의 prototype 프로퍼티가 가리키는 프로토타입 객체는 일반적으로 따로 네이밍하지 않고, 자신과 연결된 함수의 prototype 프로퍼티값을 그대로 이용한다.

ex) add() 함수의 프로토타입 객체는 add.prototype이 된다.

### 함수 객체와 프로토타입 객체와의 관계를 보여주는 코드

```jsx
//MyFunction() 함수 정의
function myFunction(){
    return true;
}

console.dir(myFunction.prototype);
console.dir(myFunction.prototype.constructor);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/453a2ee0-7fe3-434a-b6cf-4dd623412e07)

myFunction.prototype 객체는 constructor와 __ proto __라는 두 개의 프로퍼티가 있다.

myFunction() 함수의 프로토타입 객체이므로 constructor 프로퍼티가 있음을 확인할 수 있다.

또한, 프로토타입 객체 역시 자바스크립트 객체이므로 예외 없이 자신의 부모 역할을 하는 __ proto __ 프로퍼티가 있다.

myFunction.prototype.constructor의 값을 출력하면 프로토타입 객체와 매핑된 함수를 알아볼 수 있다.

결과값을 보면 myFunction() 함수를 가리키고 있다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/77c96e25-140c-44ca-81ad-5dc280950a48)

이 개념은 프로토타입과 프로토타입 체이닝을 이해하는 기본 지식인 만큼 잘 숙지해야 한다.

## 함수의 다양한 형태

### 콜백 함수

함수 표현식에서 함수 이름은 꼭 붙이지 않아도 되는 선택사항이다.

익명함수의 대표적인 용도가 바로 콜백 함수이다.

`콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라,`

`개발자는 단지 함수를 등록하기만 하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출되는 함수를 말한다.`

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7e303ea4-351d-4bab-9e7d-4193fdb7c112)

```jsx
<script>
    //페이지 로드 시 호출될 콜백 함수
    window.onload = function() {
        alert('This is the callback fucntion.');
    };
</script>
```

### 즉시 실행 함수(Immediate Function)

함수를 정의함과 동시에 바로 실행하는 함수를 “즉시 실행함수”라고 정의한다.

이 함수도 익명함수를 응용한 형태이다.

```jsx
(function (name) {
    console.log('This is the immediate function --> ' + name);
})('foo') ;

// This is the immediate function --> foo
```

즉시 실행 함수를 만드는 방법은 간단하다.

우선 함수 리터럴을 괄호()로 둘러싼다.

이때 함수 이름이 있든 없든 상관없다.

그런 다음 함수가 바로 호출될 수 있게 () 괄호쌍을 추가한다.

이때 괄호 안에 값을 추가해 즉시 실행 함수의 인자로 넘길 수가 있다.

예제의 경우는 (’foo’)로 즉시 실행함수를 호출했으며, 이때 ‘foo’ 인자를 넘긴것이다.

`이렇게 함수가 선언되자마자 실행되게 만든 즉시 실행 함수의 경우, 같은 함수를 다시 호출할 수 없다.`

따라서 즉시 실행 함수의 이러한 특징을 이용한다면 최초 한 번의 실행만을 필요로 하는 초기화 코드 부분 등에 사용할 수 있다.

즉시 실행 함수의 또 다른 용도를 알아보자.

ex) jQuery에서 사용된 즉시 실행 함수

```jsx
(function (window, undefined) {
    ...
})( window );
```

이렇게 jQuery에서 즉시 실행 함수를 사용하는 이유는 Javascript의 변수 유효 범위 특성 때문이다.

Javascript에서는 함수 유효 범위를 지원한다.

기본적으로 Javascript는 변수를 선언할 경우 프로그램 전체에서 접근할 수 있는 전역 유효 범위를 가진다.

그러나 함수 내부에서 정의된 매개변수와 변수들은 함수 코드 내부에서만 유효할 뿐 함수 밖에서는 유효하지 않다. ( 여기서 변수들은 var문을 사용해서 정의해야 한다. 그렇지 않으면 함수 내의 변수라도 전역 유효 범위를 갖게 된다. 5장에서 자세히 살펴본다.)

라이브러리 코드를 이렇게 즉시 실행 함수 내부에 정의해두게 되면, 라이브러리 내부의 변수들은 함수 외부에서 접근할 수 없다.

따라서 이렇게 즉시 실행 함수 내에 라이브러리 코드를 추가하면 전역 네임스페이스를 더럽히지 않으므로, 이후 다른 자바스크립트 라이브러리들이 동시에 로드가 되더라도 라이브러리 간 변수 이름 충돌 같은 문제를 방지할 수 있다.

- 즉시 실행 함수 패턴

`즉시 실행 함수 패턴은 라이브러리 코드가 로드되면 실행되는 초기화 작업을 할 때 많이 사용된다.`

jQuery 외에도 대부분의 라이브러리가 이와 같은 방식이므로, 잘 이해해야 한다.

다음은 몇 가지 유명 라이브러리의 초기화 코드이다.

```jsx
[ Underscore 1.3.3 ]
(function() {
    var root = this;
    var previousUnderscore = root._;
    ...
    var _ = function(obj) {return new wrapper(obj); };
    ...
    root['_'] = _;
    ...
}).call(this);
```

call 함수를 this인자와 함께 사용한다.

이렇게 넘긴 this가 즉시 실행 함수 내부의 this에 바인딩 된다.

물론 이것도 전역 객체이다.

함수 내부에서 root라는 이름으로 사용된다.

그리고 root에 ‘_’를 추가한다.

underscore는 브라우저뿐만 아니라. node.js에서도 사용이 가능하게 설계되었다.

```jsx
[ Sugar 1.2 ]
( function() {
 ...
    // Initialize
    buildObject();
    buildString();
    buildFunction();
    initalizeClass(date);
})();

```

특별한 인자 없이 즉시 실행 함수를 호출한다.

sugar에서 제공하는 대부분의 함수는 Object.prototype이나 Function.prototype 등 기존에 있는 객체에 들어가므로, 특별히 네임 스페이스를 정의하지 않았다.

`이와 같이 라이브러리 코드가 처음 로드되어 초기화 할 때, 즉시 실행 함수 패턴이 많이 사용됨을 기억하자.`

### 내부 함수 ( Inner Function )

`Javascript 에서는 함수 코드 내부에서도 다시 함수 정의가 가능하다.`

이렇게 함수 내부에 정의된 함수를 “내부 함수” 정의한다.

내부 함수는 Javascript의 기능을 보다 강력하게 해주는 클로저를 생성하거나 부모 함수 코드에서 외부에서의 접근을 막고 독립적인 헬퍼 함수를 구현하는 용도 등으로 사용한다. ( 5장에서 자세히 설명한다. )

```jsx
function parent(){
    var a = 100;
    var b = 200;

    // child() 내부 함수 정의
    function child() {
        var b = 300;
        console.log(a); // 100
        console.log(b); // 300
    }
    child(); 
}
parent();
child(); //Uncaught ReferenceError: child is not defined
```

`내부 함수에서는 자신을 둘러싼 부모함수의 변수에 접근이 가능하다.`

이것이 가능한 이유는 Javascript의 스코프 체이닝 때문이다. (5장에서 설명한다.)

`내부 함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출이 가능하다.`

`기본적으로 함수 스코프 밖에서는 함수 스코프 안에 선언된 모든 변수나 함수에 접근이 불가능하다.`

하지만 함수 외부에서도 특정 함수 스코프 안에 선언된 내부 함수를 호출할 수 있다.

- 함수 스코프 외부에서 내부 함수 호출하는 코드

```jsx
function parent(){
    var a = 100;
    // child() 내부 함수
    var child = function () {
        console.log(a);
    }
    // child() 함수 반환
    return child;
}
var inner = parent();
inner(); // 100
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/915d8b7e-7ff8-464d-9904-ad15048507e2)

inner에는 child가 들어있다.

위와 같이 실행이 끝난 parent()와 같은 부모 함수 스코프의 변수를 참조하는 inner()와 같은 함수를 
”클로저” 라고 정의한다.

### 함수를 리턴하는 함수

Javascript에서는 함수도 일급 객체이므로 일반 값처럼 함수 자체를 리턴할 수도 있다.

이러한 특징은 다양한 활용이 가능해 진다.

함수를 호출함과 동시에 다른 함수로 바꾸거나.

자기 자신을 재정의하는 함수를 구현할 수 있다.

이러한 함수 유형 또한 Javascript의 언어적인 유연성을 보여주는 좋은 활용 예이다.

- 자신을 재정의하는 함수 코드

```jsx
// self() 함수
var self = function(){
    console.log('a');
    return function() {
        console.log('b');
    }
}
self = self(); // a
self(); // b
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/aa84928c-db87-42d4-bb96-98a8b34ce870)

`self = self(); 에서도 호출된다!`

### 함수 호출과 this

- arguments 객체

C와 같은 엄격한 언어와 달리, Javascript에서는 함수를 호출할 때 함수 형식에 맞춰 인자를 넘기지 않아도 에러가 발생하지 않는다.

- 함수 형식에 맞춰 인자를 넘기지 않더라도 함수 호출이 가능함을 보여주는 코드

```jsx
function func(arg1, arg2){
    console.log(arg1, arg2);
}

func(); // undefined undefined
func(1); // 1 undefined
func(1,2); // 1 2
func(1,2,3); // 1 2
```

`C언어에서는 에러를 내지만, Javascript는 인자를 어떻게 넘기더라도 함수를 호출할 때 에러가 발생하지 않는다.`

위의 예시처럼 넘겨지지 않은 인자에는 undefined 값이 할당된다.

Javascript의 이러한 특성 때문에 함수 코드를 작성할 때, 런타임 시에 호출된 인자의 개수를 확인하고 이에 따라 동작을 다르게 해줘야 할 경우가 있다.

이를 가능케 하는게 바로 arguments 객체다.

`Javascript에서는 함수를 호출할 때 인수들과 함께 암묵적으로 arguments 객체가 함수 내부로 전달되기 때문이다.`

arguments 객체는 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장된 객체를 의미한다.

특이한 점은 이 객체는 실제 배열이 아닌 유사 배열 객체이다.

```jsx
function add(a, b){
    // arguments 객체 출력
    console.dir(arguments);
    return a+b;
}

console.log(add(1));
console.log(add(1,2));
console.log(add(1,2,3));
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/1137e96a-c99a-415a-a12e-c4eccb4d7659)

위에서 볼 수 있다시피, 호출 시에 넘긴 인자를 배열 형태로 저장하고,

호출 시에 넘긴 인자의 개수가 length에 저장된다.

또한 arguments 객체는 세 부분으로 되어있다.

- 함수를 호출할 때 넘겨진 인자 ( 배열 형태 ) : 함수를 호출할 때 첫 번째 인자는 0번 인덱스, 두번째 인자는 1번 인덱스

- length 프로퍼티 : 호출할 때 넘겨진 인자의 개수를 의미
- callee 프로퍼티 : 현재 실행 중인 함수의 참조값( 예제에서는 add() 함수 )

앞서 얘기했듯이 arguments는 객체이지 배열이 아니다.
