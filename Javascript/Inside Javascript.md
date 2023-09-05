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

```jsx
function sum(){
    var result = 0;
    for(var i = 0; i < arguments.length: i++){
        result += arguments[i];
    }
    return result;
}

console.log(sum(1,2,3)); // 6
console.log(sum(1,2,3,4,5,6,7,8,9)); // 45
```

// 다른 언어들과 다르게 arguments에서 객체 형태로 값을 저장하기 때문에, 시작부터, 그냥 가변인자다.

### 호출 패턴과 this 바인딩

`Javascript에서는 함수를 호출할 때 기존 매개변수로 전달되는 인자값에 더해, 앞서 설명한 arguments 객체 및 this 인자가 함수 내부로 암묵적으로 전달된다.`

`this인자는 고급 Javascript 개발자로 거듭나려면 확실히 이해해야 한다.`

this는 여러가지 함수가 호출되는 방식(호출 패턴)에 따라 this가 다른 객체를 참조하기(this 바인딩) 때문에 이해하기 어렵다.

### 객체의 메서드 호출 시, this 바인딩

객체의 프로퍼티가 함수일 경우, 이 함수를 메서드라고 부른다.

이러한 메서드를 호출할 때, 메서드 내부 코드에서 사용된 this는 해당 메서드를 호출한 객체로 바인딩 된다.

```jsx
var myObject = {
    name: 'foo',
    sayName: function (){
        console.log(this.name);
    }
};

var otherObject = {
    name: 'bar'
};

otherObject.sayName = myObject.sayName;

myObject.sayName();
otherObject.sayName();

//foo
//bar
```

내가 기존에 알던 것 처럼 this는 자신을 호출한 객체에 바인딩 된다.

### 함수를 호출할 시, this 바인딩

Javascript에서는 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this는 전역 객체에 바인딩 된다.

브라우저에서 Javascript를 실행하는 경우 전역 객체는 window 객체가 된다.

- 전역 객체란?
    
    브라우저 환경에서 Javascript를 실행하는 경우, 전역 객체는 window 객체가 된다.
    
    참고로 Node.js와 같은 Javascript 언어를 통해 서버 프로그래밍을 할 수 있게끔 해주는 Javascript 런타임 환경에서의 전역 객체는 global 객체가 된다.
    
    Node.js는 브라우저 기반의 프로그래밍을 넘어 서버 기반 프로그래밍 영역까지 개발을 가능하게끔 해주는 플랫폼이다.
    

`Javascript의 모든 전역 변수는 실제로는 이러한 객체의 프로퍼티들이다.`

- 전역 객체와 전역 변수의 관계를 보여주는 코드

```jsx
var foo = "I'm foo";

conosole.log(foo); //I'm foo
conosole.log(window.foo); //I'm foo
```

- 함수 호출 시, this 바인딩을 보여주는 코드

```jsx
var test = 'This is test';
console.log(window.test)

var sayFoo = function(){
    console.log(this.test); //sayFoo() 함수 호출 시 this는 전역 객체에 바인딩
}

sayFoo();
//This is test
//This is test
```

- 내부 함수의 this 바인딩 동작을 보여 주는 코드

```jsx
var value = 100;

var myObject = {
    value: 1,
    func1: function(){
        this.value += 1;
        console.log('func1() called. this.value : ' + this.value);
        
        //func2 내부 함수
        func2 = function() {
            this.value += 1;
            console.log('func2() called. this.value : ' + this.value);
            
            //func3() 내부 함수
            func3 = function(){
                this.value += 1;
                console.log('func3() called. this.value :' + this.value);
            }
            func3(); // func3() 내부 함수 호출
        }
        func2(); // func2() 내부 함수 호출
    }
};
myObject.func1();

//func1() called = this.value : 2
//func1() called = this.value : 101
//func1() called = this.value : 102
```

내 생각과 같다.  func2는 함수 표현식으로 this가 내부에 있다고 판단되지 않는다.

그래서 당연히 전역객체가 this로 지정될 것이라 생각했는데. 맞다.

일반적으로는 내부함수라서 출력값이 2,3,4로 나올것으로 기대한다고 한다.

Javascript에서 내부 함수 호출 패턴을 정의해 놓지 않았기 때문에 위와 같은 결과가 나온다.

`내부 함수도 결국 함수이므로 이를 호출할 때는 함수호출로 취급된다.`

따라서 함수 호출 패턴 규칙에 따라 내부 함수의 this는 전역 객체 (window)에 바인딩 된다.

이렇게 내부 함수가 this를 참조하는 Javascript의 한계를 극복하려면 부모 함수[func1 메서드]의 this 내부 함수가 접근 가능한 다른 변수에 저장하는 방법이 사용된다.

```jsx
var value = 100;

var myObject = {
    value: 1,
    func1: function () {
        var that = this;

        this.value += 1;
        console.log('func1() called. this.value : ' + this.value);
        
        func2 = function () {
            that.value += 1;
            console.log('func2() called. this.value : ' + that.value);

            func3 = function () {
                that.value += 1;
                console.log('func3 called. this.value : ' + that.value);
            }
            func3();
        }
        func2();
    }
};

myObject.func1(); // func1 메서드 호출
```

Javascript 이와 같은 this 바인딩의 한계를 극복하려고, this 바인딩을 명시적으로 할 수 있도록 call과 apply 메서드를 제공하는데,

jQuery, underscore.js 등과 같은 Javascript 라이브러리들의 경우 bind라는 이름의 메서드를 통해, 사용자가 원하는 객체를 this에 바인딩할 수 있는 기능을 제공하고 있다.

- 생성자 함수를 호출할 시, this 바인딩

Javascript 객체를 생성하는 방법은 크게 객체 리터럴 방식이나 생성자 함수를 이용하는 두 가지 방법이 있다.

Javascript의 생성자 함수는 말 그대로 Javascript의 객체를 생성하는 역할을 한다.

`C++이나, Java와 같은 객체지향 언어에서의 생성자 함수의 형식과는 다르게 그 형식이 정해져있는것이 아니라, 기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.`

이는 반대로 생각하면 일반함수에 new를 붙여 호출하면 원치 않는 생성자 함수처럼 동작할 수 있다.

따라서 대부분의 자바스크립트 스타일 가이드에서는 특정 함수가 생성자 함수로 정의되어 있음을 알리려고 함수 이름의 첫 문자를 대문자로 쓰기를 권하고 있다.

Javascript에서는 이러한 생성자 함수를 호출할 때, 생성자 함수 코드 내부에서 this는 앞서 알아본 메서드와 함수 호출 방식에서의 this 바인딩과는 다르게 동작한다.

- 생성자 함수가 동작하는 방식

new 연산자로 Javascript 함수를 생성자로 호출하면, 다음과 같은 순서로 동작한다.

1. 빈 객체 생성 및 this 바인딩

생성자 함수 코드가 실행되기 전 빈 객체가 생성된다.

바로 이 객체가 생성자 함수가 새로 생성하는 객체이며, 이 객체는 this로 바인딩된다.

따라서 이후 생성자 함수의 코드 내부에서 사용된 this는 이 빈 객체를 가리킨다.

하지만 여기서 생성된 객체는 엄밀히 말하면 빈 객체는 아니다.

앞서 설명했듯이 Javascript의 모든 객체는 자신의 부모인 프로토타입 객체와 연결되어 있으며, 이를 통해 부모 객체의 프로퍼티나 메서드를 마치 자신의 것처럼 사용할 수가 있기 때문이다.

뒷 부분에서 살펴보겠지만, 이렇게 생성자 함수가 생성한 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.

(이는 자바스크립트의 규칙이니 잘 기억해야 한다.)

1. this를 통한 프로퍼티 생성

이후에는 함수 코드 내부에서 this를 사용해서, 앞에서 생성된 빈 객체에 동적으로 프로퍼티나 메서드를 생성할 수 있다.

1. 생성된 객체 리턴

리턴문이 동작하는 방식은 경우에 따라 다르므로 주의해야 한다.

우선 가장 일반적인 경우로 특별하게 리턴문이 없을 경우, this로 바인딩된 새로 생성한 객체가 리턴된다.

이것은 명시적으로 this를 리턴해도 결과는 같다.

(주의 - 생성자 함수가 아닌 일반 함수를 호출할 때 리턴값이 명시되어 있지 않으면 undefined가 리턴된다.)

하지만 리턴값이 새로 생성한 객체(this)가 아닌 다른 객체를 반환하는 경우는 생성자 함수를 호출했다고 하더라도 this가 아닌 해당객체가 리턴된다.

하지만 리턴값이 새로 생성한 객체(this)가 아닌 다른 객체를 반환하는 경우는 생성자 함수를 호출했다고 하더라도 this가 아닌 해당 객체가 리턴된다.

이 부분은 “함수 리턴”에서 좀 더 자세히 설명한다.

- 생성자 함수의 동작 방식

```jsx
// Person() 생성자 함수
var Person = function (name) {
    // 함수 코드 실행 전
    this.name = name;
    // 함수 리턴
};

// foo 객체 생성
var foo = new Person('foo');
console.log(foo.name);
```

Person이라는 생성자 함수를 정의하고, 이를 통해 foo 객체를 만드는 예제이다.

Person() 함수를 new로 호출하면, Person()은 생성자 함수로 동작한다.

1. Person() 함수가 생성자로 호출되면, 함수 코드가 실행되기 전에 빈 객체가 생성된다.
2. 여기서 생성된 빈 객체는 Person() 생성자 함수의 prototype 프로퍼티가 가리키는 객체(Person.prototype 객체)를 [[Prototype]]링크로 연결해서 자신의 프로토타입으로 설정한다.
    
    그리고 이렇게 생성된 객체는 생성자 함수 코드에서 사용되는 this로 바인딩 된다.
    

1. this가 가리키는 빈 객체에 name이라는 동적 프로퍼티를 생성했다.

리턴값이 특별히 없으므로 this로 바인딩한 객체가 생성자 함수의 리턴값으로 반환돼서, foo 변수에 저장된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/971b8fa8-1d7a-47f9-895c-2dd9d4a39c82)

`매우 중요하다!` 처음부터 생성과정 그려서 설명해볼것.

### 객체 리터럴 방식과 생성자 함수를 통한 객체 생성 방식의 차이

가장 쉽게 생각할 수 있는 차이는 foo 객체와 같이 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성할 수 없다는 점이다.

이에 반해 Person() 생성자 함수를 사용해서 객체를 생성하면, 생성자 함수를 호출할 때 다른 인자를 넘김으로써 같은 형태의 서로 다른 객체 bar와 baz를 생성할 수 있다.

```jsx
// 객체 리터럴 방식으로 foo 객체 생성
var foo = {
    name: 'foo',
    age: 35,
    gender: 'man'
};
console.dir(foo);

// 생성자 함수
function Person(name, age, gender, position){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

var bar = new Person('bar', 33, 'woman');
console.dir(bar);

var baz = new Person('baz', 25, 'woman');
console.dir(baz);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/2a176ca6-f5de-4163-aab4-5f99c19ef6ba)

객체의 출력결과 또한 두 방식에 차이가 있다.

객체 리터럴 방식과 생성자 함수 방식의 차이가 프로토타입 객체에 있다.

객체 리터럴의 방식의 경우 프로토타입 객체가 Object이고. //ES6에서 바뀐것 같다.

생성자 함수 방식의 경우는 Person으로 서로 다르다.

이렇게 차이가 발생하는 이유는 Javascript 객체 생성 규칙 때문이다.

Javascript 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.

객체 리터럴 방식에서는 객체 생성자 함수는 Object()이다

생성자 함수 방식의 경우는 생성자 함수 자체 예제에서는 Person()이다.

이후 프로토타입 체이닝에서 자세히 살펴본다.

### 생성자 함수를 new를 붙이지 않고 호출할 경우

Javascript의 일반 함수와 생성자 함수의 별도의 차이가 없다.

new를 붙여서 함수를 호출하면 생성자 함수로 동작하는것이다.

때문에 객체 생성을 목적으로 작성한 생성자 함수를 new 없이 호출하거나

일반 함수에 new를 붙여서 호출할 경우 코드에서 오류가 발생할 수 있다.

그 이유는 일반 함수 호출과 생성자 함수를 호출할 때 this 바인딩 방식이 다르기 때문이다.

일반 함수 호출의 경우는 this가 window 전역 객체에 바인딩된다.

생성자 함수 호출의 경우는 this는 새로 생성되는 빈 객체에 바인딩 되기 때문이다.

- new를 붙이지 않고 생성자 함수 호출 시 오류

```jsx
var qux = Person('qux', 20, 'man');
console.log(qux); // undefined
console.log(window.name); // qux
console.log(window.age); // 20
console.log(window.gender); // man
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/59d774e0-ebdf-4698-b3f7-8255dfd7dc36)

위에서 확인할 수 있다시피, Person()을 new 없이 일반 함수 형태로 호출할 경우, this는 함수 호출이므로 전역 객체인 window 객체로 바인딩 된다.

따라서 이 코드는 Person 객체를 생성해서 이를 qux 변수에 저장하려는 원래 의도와는 다르게 this가 바인딩된 window 객체에 동적으로 name, age, gender 프로퍼티가 생성된다.

Person() 함수는 리턴값이 특별히 없다. 생성자 함수는 별도의 리턴값이 정해져 있지 않은 경우에 새로 생성된 객체가 리턴되지만, 일반 함수를 호출할 때는 undefined가 리턴된다.

따라서 undefined 값이 출력된 것이다.

함수 리턴은 다음 절에서 자세히 알아볼 것이다.

`이렇게 Javascript에서는 일반 함수와 생성자 함수를 구분이 별도로 없으므로, 일반적으로 생성자 함수로 사용할 함수는 첫 글자를 대문자로 표기하는 네이밍 규칙을 권장한다.`

이러한 규칙을 사용하더라도 결국 new를 사용해서 호출하지 않을 경우 코드의 에러가 발생할 수 있으므로, 더글러스 크락포드와 같은 Javascript 전문가들은 객체를 생성하는 다음과 같은 별도의 코드 패턴을 사용하기도 한다.

- 강제로 인스턴스 생성하기

위에서 설명한 위험성을 피하기 위해서 널리 사용되는 패턴이 있다.

```jsx
function A(arg){
    if(!(this instaceof A))
        return new A(arg);
    this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);      // 100
console.log(b.value);      // 10
console.log(global.value); // undefined
```

함수 A에서는 A가 호출될 때, this가 A의 인스턴스인지를 확인하는 분기문이 추가되었다.

`this가 A의 instance가 아니라면, new로 호출된 것이 아님을 의미하고, 이 경우 new로 A를 호출하여 반환하게 하였다.`

이렇게 하면 var b = A(10); 과 같이 사용자가 사용했다고 하더라도, 전역 객체에 접근하지 않고, 새 인스턴스가 생성되어 b에 반환될 것이다.

참고) 어떤 코드에서는 앞과 같이 함수의 이름을 그대로 쓰지 않고, 다음과 같은 표현식을 쓰곤한다.

```jsx
if (!(this instanceof arguments.callee))
```

arguments.callee가 곧 호출된 함수를 가리킨다.

이와 같이 하면, 특정 함수의 이름과 상관없이 이 패턴을 공통으로 사용하는 모듈을 작성할 수 있는 장점이 있다.

이 패턴으로 함수 사용자가 함수 작성자의 의도와는 다르게 함수를 호출할 때에도 문제가 발생하지 않게 한다.

그리고 함수 작성자 역시, 사용자가 new로 반환된 인스턴스를 사용하게 될 것을 확신하고 자신의 코드를 작성할 수 있다.

이 패턴은 매우 광범위하게 사용된다.

우리가 알고있는 대부분의 Javascript 라이브러리에 이 패턴이 들어가 있음을 확인할 수 있다.

### call과 apply 메서드를 이용한 명시적인 this 바인딩

지금까지 Javascript에서 함수 호출이 발생할 때 각각의 상황에 따라 this가 정해진 객체에 자동으로 바인딩된다는 것을 확인했다.

Javascript는 이러한 내부적인 this 바인딩 이외에도 this를 특정 객체에 명시적으로 바인딩시키는 방법도 제공한다.

이를 가능하게 하는 것이 바로 함수 객체의 기본 프로퍼티에서 설명한 apply()와 call() 메서드이다.

이 메서드들은 모든 함수의 부모 객체인 Function.prototype 객체의 메서드이므로, 모든 함수는 다음과 같은 형식으로 apply() 메서드를 호출하는 것이 가능하다.

```jsx
function.apply(thisArg, argArray)
```

call() 메서드는 apply() 메서드와는 기능이 같고 단지 넘겨받는 인자의 형식만 다르다.

기억해야 할 것

1. apply() 메서드를 호출하는 주체는 함수다.
2. apply() 메서드도 this를 특정 객체에 바인딩할 뿐 결국 본질적인 기능은 “함수 호출”이다.

ex) Person()이라는 함수가 있고, Person.apply() 이렇게 호출한다면 이것의 기본적인 기능은 Person() 함수를 호출하는 것이다.

이제 apply()메서드에 대해 살펴보면 첫번째 인자 thisArg는 apply() 메서드를 호출한 함수 내부에서 사용한 this에 바인딩할 객체를 가리킨다.

즉, 첫번째 인자로 넘긴 객체가 this로 명시적으로 바인딩되는 것이다.

두번째 argArray 인자는 함수를 호출할 때 넘길 인자들의 배열을 가리킨다.

apply() 메서드의 기능도 결국 함수를 호출하는 것이므로,

함수에 넘길 인자를 argArray 배열로 넘긴다.

정리하자면, 두번째 인자인 argArray 배열을 자신을 호출한 함수의 인자로 사용하되, 이 함수 내부에서 사용된 this는 첫번째 인자인 thisArg 객체로 바인딩해서 함수를 호출하는 기능을 하는 것이다.

- apply() 메서드를 이용한 명시적인 this 바인딩

```jsx
// 생성자 함수
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// foo 빈 객체 생성
var foo = {};

// apply() 메서드 호출
Person.apply(foo, ['foo', 30, 'man']);
console.dir(foo);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/efef0cb0-3650-47ef-b5d3-0612a496ed41)

foo는 객체 리터럴 방식으로 생성된 빈 객체이다.

Person.apply()의 첫번째 인자로 넘긴 foo가 this로 바인딩 된다.

Person.apply()의 두번째 인자로 넘긴 배열 [’foo’, 30, ‘man’]은 호출하려는 Person() 함수의 인자 name, age, gender로 각각 전달된다.

이 코드는 결국 Person(’foo’, 30 ‘man’) 함수를 호출하면서 this를 foo 객체에 명시적으로 바인딩하는 것을 의미하는 것이다.

코드 결과를 살펴보면, foo 객체에 제대로 프로퍼티가 생성되어 있음을 확인할 수 있다.

call() 메서드의 경우는 apply()와 기능은 같지만, apply()의 두번째 인자에서 배열 형태로 넘긴것을 각각 하나의 인자로 넘긴다.

```jsx
Person.call(foo, 'foo', 30, 'man');
```

이러한 apply()나 call() 메서드는 this를 원하는 값으로 명시적으로 매핑해서 특정 함수나 메서드를 호출할 수 있다는 장점이 있다.

그리고 이들의 대표적인 용도가 바로 arguments 객체에서 설명한 arguments 객체와 같은 유사 배열 객체에서 배열 메서드를 사용하는 경우이다.

`arguments 객체는 실제 배열이 아니므로 pop(), shift() 같은 표준 배열 메서드를 사용할 수 없다. 하지만 apply() 메서드를 이용하면 가능하다.`

- apply() 메서드를 활용한 arguments 객체의 배열 표준 메서드 slice() 활용코드

```jsx
function myFunction(){
    console.dir(arguments);
        // arguments.shift(); 에러 발생
        // arguments 객체를 배열로 변환
        var args = Array.prototype.slice.apply(arguments);
        console.dir(args);
}
myFunction(1,2,3);
```

myFunction() 함수에 최초로 전달된 인자에서 첫 번째 요소를 삭제하고 나머지 인자를 다시 내부 함수 inner()로 전달하는 코드이다.

배열에서는 shift() 메서드를 사용해 첫 번째 원소를 쉽게 삭제할 수 있지만, arguments 객체는 length 프로퍼티만을 가진 유사 객체 배열이므로, 앞 코드에서 주석을 제거하고 arguments.shift()와 같이 표준 배열 메서드를 호출하면 에러가 발생하며 프로그램이 종료된다.

이러한 경우 apply() 메서드로 arguments 객체에 마치 배열 메서드가 있는것처럼 처리할 수 있다.

Array.prototype.slice.apply(arguments)

Array.prototype.slice() 메서드를 호출해라. 이때 this는 arguments 객체로 바인딩해라.

이말은, arguments 객체가 Array.prototype.slice()메서드를 마치 자신의 메서드인 양 arguments.slice()와 같은 형태로 메서드를 호출하라는 말이다.

Array.prototype은 모든 배열 객체의 부모 역할을 하는 Javascript의 기본 프로토타입 객체이다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/03a0c960-5013-4e65-a847-48e4b593c2e4)

arguments를 객체이므로 프로토타입이 Object이다.

반면에 args는 배열이므로 Array.prototype이 프로토타입이 것을 확인할 수 있다.

// apply를 사용하면 해당하는 Object로 변한다는 사실을 잊지말자.

- slice() 메서드 사용 코드

```jsx
var arrA = [1, 2, 3];
var arrB = arrA.slice(0) // [1,2,3]
var arrC = arrA.slice() // [1,2,3]
var arrD = arrA.slice(1) // [2,3]
var arrE = arrA.slice(1,2) // [2]
```

slice()는 start index에서 end-1 index까지 복사한 배열을 리턴한다.

### 함수 리턴

`Javascript 함수는 항상 return 값을 반환한다.`

return 문을 사용하지 않았더라도 다음의 규칙으로 항상 리턴값을 전달한다.

1. 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.

```jsx
// noReturnFunc() 함수
var noReturnFunc = function(){
    console.log('This function has no return statement.');
};

var result = noReturnFunc();
console.log(result);

// This function has no return statement.
// undefined
```

noReturnFunc()와 같이 return 문이 없는 함수의 경우, 함수를 호출할 때 undefined 값이 리턴된다.

1. 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.

생성자 함수에서 별도의 리턴값을 지정하지 않을 경우 this로 바인딩된 새로 생성된 객체가 리턴된다.

때문에 생성자 함수에서는 일반적으로 리턴 값을 지정하지 않는다.

생성자 함수의 경우는 리턴 값을 처리하는 몇 가지 예외 상황이 있다.

만약 다음 코드와 같이 생성자 함수에서 this로 바인딩되는 생성된 객체가 아닌 다른 객체를 리턴한다면 어떻게 될까?

- 생성자 함수에서 명시적으로 객체를 리턴했을 경우

```jsx
//Person() 생성자 함수
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    
    //명시적으로 다른 객체 변환
    return { name : 'bar', age : 20, gender : 'woman' };
}

var foo = new Person('foo', 30, 'man');
console.dir(foo);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/c6858444-a2b2-4605-9d73-e4d00f95fee1)

생성자 함수의 리턴값을 새로 생성한 객체가 아니라, 객체 리터럴 방식의 특정 객체로 지정한 경우 new 연산자로 Person() 생성자 함수를 호출해서 새로운 객체를 생성하더라도, 리턴 값에서 명시적으로 넘긴 객체나 배열이 리턴된다.

앞 예제에서 return {name : ‘bar’ …} 부분이 없다면, foo 객체가 리턴된다.

`만약 생성자 함수의 리턴값으로 넘긴 값이 객체가 아니라, Boolean, Number, String인 경우에는 이러한 리턴 값을 무시하고 this로 바인딩된 객체가 리턴된다.`

- 생성자 함수에서 명시적으로 기본 타입(Boolean, Number, String) 값을 리턴했을 경우

```jsx
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;

    return 100;
}

var foo = new Person('foo', 30, 'man');
console.log(foo);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/29de96c1-3e06-45ef-966e-2002f260c1dd)

실제로 100이라는 값이 return 되는게 아니라, 객체가 리턴되는것을 볼수 있다.

## 프로토타입 체이닝

### 프로토타입의 두 가지 의미

Javascript은 기존 C++이나 Java와 같은 객체지향 프로그래밍 언어와는 다른 프로토타입 기반의 객체지향 프로그래밍을 지원한다.

따라서 Javascript의 동작 과정을 제대로 이해하려면 Prototype의 개념도 잘 이해하고 있어야 한다.

6장에서는 Javascript가 어떻게 OOP 기능을 제공하는지 자세히 살펴본다.

이번에는 Javascript에서 OOP 상속에 근간이 되는 프로토타입과 프로토타입 체이닝의 기본 개념에 대해 알아본다.

Java와 같은 객체지향 프로그래밍에서는 클래스를 정의하고 이를 통해 객체를 생성하지만, Javascript에서는 이러한 클래스 개념이 없다.

대신에 객체 리터럴이나 앞서 설명한 생성자 함수로 객체를 생성한다.

이렇게 생성된 객체의 부모 객체가 바로 ‘프로토타입’ 객체다.

앞서 강조했듯이, Javascript의 모든 객체는 자신의 부모인 프로토타입 객체를 가리키는 참조 링크 형태의 숨겨진 프로퍼티가 있다.

ECMAScript에서는 이러한 링크를 “암묵적 프로토타입 링크”(Implicit Prototype Link) 라고 정의한다.

그리고 이러한 링크는 모든 객체의 [[Prototype]] 프로퍼티에 저장된다.

이 책에서는 이러한 링크를 [[Prototype]] 링크라고 명명한다.

함수객체의 prototype 프로퍼티와 객체의 숨은 프로퍼티인 [[Prototype]] 링크를 구분해야 한다.

Javascript를 잘 이해하지 못하는 초급 개발자들은 이 둘을 정확하게 구분하지 못하는 경우가 많다.

우선 이 둘의 차이점을 알려면 다음과 같은 Javascript 객체 생성 규칙을 알아야 한다.

Javascript에서 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체를 자신의 부모 객체로 설정하는 [[Prototype]] 링크로 연결한다.

- prototype 프로퍼티와 [[Prototype]] 링크 구분

```jsx
// Person 생성자 함수
function Person(name) {
    this.name = name;
}

// foo 객체 생성
var foo = new Person('foo');

console.dir(Person);
console.dir(foo);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/2d903f74-0f45-4393-a271-a0b1cd24f570)

Person() 생성자 함수는 prototype 프로퍼티로 자신과 링크된 프로토타입 객체를 가리킨다.

그리고 앞서 언급한 Javascript의 생성 규칙에 의해 Person() 생성자 함수로 생성된 foo 객체는 Person() 함수의 프로토타입 객체를 [[Prototype]] 링크로 연결한다.

결국, prototype 프로퍼티나 [[Prototype]] 링크는 같은 프로토타입 객체를 가리키고 있다.

prototype 프로퍼티는 함수의 입장에서 자신과 링크된 프로토타입 객체를 가리키고 있으며,

이에 반해 [[Prototype]] 링크는 같은 프로토타입 객체를 가리키고 있다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/658197ec-8cb1-43ae-9c3e-9d180bf7c649)

__ proto __ 프로퍼티는 모든 객체에 존재하는 숨겨진 프로퍼티로 객체 자신의 프로토타입 객체를 가리키는 참조 링크정보다.

ECMAScript 에서는 이것을 [[Prototype]] 프로퍼티로 정하고, 내부적으로만 사용된다고 명시하고 있지만, 크롬이나 파이어폭스 같은 브라우저에서는 __ proto __프로퍼티로 명시적으로 제공하고 있다.

따라서 __ proto __ 프로퍼티나 [[Prototype]] 프로퍼티는 같다고 간주하면 된다.

### 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝

Javascript에서 객체는 자기 자신의 프로퍼티 뿐만이 아니라, 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티 또한 마치 자신의 것처럼 접근하는게 가능하다.

`이것을 가능케 하는게 바로 프로토타입 체이닝이다.`

- 객체 리터럴 방식에서의 프로토타입 체이닝

```jsx
var myObject = {
    name: 'foo',
    sayName: function () {
         console.log('My Name is ' + this.name);
    }
}

myObject.sayName(); // My Name is foo
console.log(myOjbect.hasOwnProperty('name')); // true
console.log(myOjbect.hasOwnProperty('nickName')); // false
myObject.sayNickName(); // Uncaught TypeError: Object <#Object> has no method 'sayNickName'
```

myObject 객체에 hasOwnProperty() 메서드가 없음에도 결과가 정상적으로 출력됐다.

왜 myObject 객체가 hasOwnProperty() 메서드를 호출할 때는 에러가 발생하지 않았을까?

우선 이를 이해하려면 객체 리터럴 방식으로 생성한 객체와 프로토타입 체이닝의 개념을 살펴봐야 한다.

객체 생성에서 설명했듯이 객체 리터럴로 생성한 객체는 Object()라는 내장 생성함수로 생성된 것이다.

Object() 생성자 함수도 함수 객체이므로 prototype이라는 프로퍼티 속성이 있다.

따라서 앞서 설명한 Javascript의 규칙으로 생성한 객체 리터럴 형태의 myObject는 다음 그림처럼 Object() 함수의 prototype 프로퍼티가 가리키는 Object.prototype 객체를 자신의 프로토타입 객체로 연결한다.

이제 프로토타입 체이닝 이라는 개념을 살펴보자.

`Javascript에서 특정 객체의 프로퍼티나 메서드에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 [[Prototype]] 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티를 차례대로 검색하는 것을 프로토타입 체이닝이라고 정의한다.`

hasOwnProperty() 메서드를 호출하는 동작 과정은 조금 다르다.

myObject.hasOwnProperty() 메서드를 호출했지만, myObject 객체는 hasOwnProperty() 메서드가 없다.

그렇다면 이후에는 myObject 객체의 [[Prototype]] 링크를 따라 그것의 부모 역할을 하는 Object.prototype 객체 내에 hasOwnProperty() 메서드가 있는지를 검색한다.

앞서 설명했듯이 hasOwnProperty() 메서드는 Javascript 표준 API로 Object.prototype 객체에 포함되어 있다.

따라서 hasOwnProperty() 메서드가 없어서 에러가 나지 않고 정상적으로 코드가 수행된다.

### 생성자 함수로 생성된 객체의 프로토타입 체이닝

생성자 함수로 객체를 생성하는 경우는 객체 리터럴 방식과 약간 다른 프로토타입 체이닝이 이뤄진다.

하지만 두가지 방식 모두 다음과 같은 기본 원칙을 잘 지키고 있다.

Javascript에서 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체 (부모 객체)로 취급한다

```jsx
//Person() 생성자 함수
function Person(name, age, hobby){
    this.name = name;
    this.age = age;
    this.hobby = hobby;
}

// foo 객체 생성
var foo = new Person('foo', 30, 'tennis');

//프로토타입 체이닝
console.dir(foo.hasOwnProperty('name')); //true

// Person.prototype 객체 출력
console.dir(Person.prototype);
```

foo 객체의 생성자는 Person() 함수이다.

따라서 Javascript의 룰에 따르면 foo 객체의 prototype 객체는 자신을 생성한 Perosn 생성자 함수 객체의 prototype 프로퍼티가 가리키는 객체(Person.prototype)가 된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/39b301ec-f8ab-46d8-9949-1cdd8973bd44)

foo.hasOwnProperty() 메서드를 호출했지만, foo 객체는 hasOwnProperty() 메서드가 없어서 프로토타입 체이닝으로 foo의 부모객체인 Person.prototype 객체에서 hasOwnProperty() 메서드를 찾는다.

그러나 prototype 프로퍼티에서 알아봤듯이 함수에 연결된 프로토타입 객체는 디폴트로 constructor 프로퍼티만을 가진 객체이므로 hasOwnProperty() 메서드는 없다.

그렇다면 이대로 프로토타입 체이닝이 끝나는 것일까?

아니다.

Person.prototype 역시 Javascript 객체이므로 앞 절에서 설명했던 것처럼 Object.prototype을 프로토타입 객체로 가진다.

따라서 프로토타입 체이닝은 Object.prototype 객체로 계속 이어진다.

그리고 Object.prototype 객체의 hasOwnProperty() 메서드가 실행되므로 에러가 발생하지 않고 true가 출력된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/acbc44be-a631-4653-808e-e46de6072004)

이렇듯 객체 리터럴 방식과 생성자 함수로 객체를 생성하는 방식이 프로토타입 체이닝 방법에서도 차이가 있음을 알 수 있다.

### 프로토타입 체이닝의 종점

Javscript에서 Object.prototype 객체는 프로토타입 체이닝의 종점이다.

객체 리터럴 방식이나 생성자 함수를 이용한 방식이나 결국엔 Object.prototype에서 프로토타입 체이닝이 끝나는 것을 알 수 있다.

`이것을 달리 해석하면, 다음 그림과 같이 객체 리터럴 방식이나 생성자 함수 방식에 상관없이 모든 Javascript 객체는 프로토타입 체이닝으로 Object.prototype 객체가 가진 프로퍼티와 메서드에 접근하고, 서로 공유가 가능하다는 것을 알 수 있다.`

떄문에 Javascript 표준 빌트인 객체인 Object.prototype에는 hasOwnProperty()나 isPrototypeOf() 등과 같이 모든 객체가 호출 가능한 표준 메서드들이 정의되어 있다.

### 기본 데이터 타입 확장

앞서 Javascript의 모든 객체가 프로토타입 체이닝으로 Object.prototype에 정의한 메서드를 사용 가능하다는 것을 살펴봤다.

즉, Object.prototype에 정의된 메서드들은 Javascript의 모든 객체의 표준 메서드라고 볼 수 있다.

Javascript 모든 객체에서 호출 가능한 hasOwnProperty()나 isPrototypeOf() 등과 같은 표준 메서드들은 Object.prototype에 정의되어 있다.

이와 같은 방식으로 Javascript의 숫자, 문자열, 배열 등에서 사용되는 표준 메서드들의 경우, 이들의 프로토타입인 Number.prototype, String.prototype, Array.prototype 등에 정의되어 있다.

물론 이러한 기본 내장 프로토타입 객체 또한 Object.prototype을 자신의 프로토타입으로 가지고 있어서 프로토타입 체이닝으로 연결된다.

ECMAScript 명세서를 보면 Javascript의 각 네이티브 객체별로 공통으로 제공해야 하는 메서드들을 각각의 프로토타입 객체 내에 메서드로 정의해야 한다고 기술하고 있다.

Javascript는 Object.prototype, String.prototype 등과 같이 표준 빌트인 프로토타입 객체에도 사용자가 직접 정의한 메서드들을 추가하는 것을 허용한다.

ex) 다음 예제처럼 String.prototype 객체에 testMethod() 메서드를 추가하면 이 메서드는 일반 문자열 표준 메서드처럼, 모든 문자열에서 접근 가능하다.

### String 기본 타입에 메서드 추가

```jsx
String.prototype.testMethod = function () {
    console.log('This is the String.prototype.testMethod()');
}

var str = "this is test";
str.testMethod();

console.dir(String.prototype);
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7bc1bf11-c308-444b-932f-2e5672858f72)

이렇게 prototype에 메서드를 추가해두면, 이후 문자열에서는 testMethod()를 문자열 API처럼 사용할 수 있다.

// 여기서 기억할 점은 var str = “this is test”를 호출할 때, String() 생성자 함수가 호출되고, 이 함수의 prototype이 str의 [[Prototype]]으로 링크된다는 점이다. (링크된다. == 설정된다.)

### 프로토타입도 Javascript 객체다.

함수가 생성될 때, 자신의 prototype프로퍼티에 연결되는 프로토타입 객체는 constructor 프로퍼티 만을 가진 객체이다.

당연히 프로토타입 역시 Javascript 객체이므로 일반 객체처럼 동적 프로퍼티를 추가/삭제 하는 것이 가능하다.

그리고 이렇게 변경된 프로퍼티는 실시간으로 프로토타입 체이닝에 반영된다.

- 프로토타입 객체의 동적 메서드 생성 예제 코드

```jsx
// Person() 생성자 함수
function Person(name) {
   this.name = name;
}

var foo = new Person('foo');

// foo.sayHello(); // 주석 제거시, 메서드가 정의되어있지 않아 오류 발생

// 프로토타입 객체에 sayHello() 메서드 정의
Person.prototype.sayHello = function() {
    console.log('Hello');
}

foo.sayHello(); // Hello
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/ba4ef89f-b955-4f8a-8c52-cd1f357043db)

### 프로토타입 메서드와 this 바인딩

프로토타입 객체는 메서드를 가질 수 있다.

만약 프로토타입 메서드 내부에서 this를 사용한다면 이는 어디에 바인딩 될 것인가?

이에 대한 해답은 앞서 설명한 this 바인딩 규칙을 그대로 적용하면 된다.

결국, 메서드 호출 패턴에서의 this는 그 메서드를 호출한 객체에 바인딩 된다는것을 기억하자.

- 프로토타입 메서드와 this 바인딩

```jsx
// Person() 생성자 함수
function Person(name) {
    this.name = name;
}

// getName() 프로토타입 메서드
Person.prototype.getName = function () {
    return this.name;
};

// foo 객체 생성
var foo = new Person('foo');
console.log(foo.getName()); // foo

//Person.prototype 객체에 name 프로퍼티 동적 추가
Person.prototype.name = 'person';
console.log(Person.prototype.getName()); //person
```

1. Person.prototype 객체에 getName() 메서드를 작성한다.

이 메서드 코드 내부는 this를 포함하고 있다.

1. foo 객체에서 getName() 메서드를 호출하면, getName()메서드는 foo 객체에서 찾을 수 없으므로 프로토타입 체이닝이 발생한다.

foo 객체의 프로토타입 객체인 Person.prototype에서 getName() 메서드가 있으므로, 이 메서드가 호출된다.

이때 getName() 메서드를 호출한 객체는 foo이므로, this는 foo 객체에 바인딩 된다.

따라서 foo.getName()의 결과값으로 foo가 출력된다.

Person.prototype.getName() 메서드와 같이 프로토타입 체이닝이 아니라, 바로 Person.prototype 객체에 접근해서 getName() 메서드를 호출하면 어떻게 될까?

이때는 getName() 메서드를 호출한 객체가 Person.prototype이므로 this도 여기에 바인딩된다.

그리고 Person.prototype 객체에 name 프로퍼티를 동적으로 추가하고 person을 저장했으므로 this.name 은 ‘person’이 출력된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/261c96b3-4351-4fea-b40a-c79f1212607a)

foo 객체는 Person함수의 prototype객체를 Link하고 있다.
Person.prototype 객체의 constructor는 생성자 함수를 Link하고 있다.

### 디폴트 플로토타입은 다른 객체로 변경이 가능하다.

디폴트 프로토타입 객체는 함수가 생성될 때 같이 생성되며, 함수의 prototype 프로퍼티에 연결된다.

`Javascript에서는 이렇게 함수를 생성할 때 해당 함수와 연결되는 디폴트 프로토타입 객체를 다른 일반 객체로 변경하는 것이 가능하다.`

이러한 특징을 이용해서 객체지향의 상속을 구현한다. ( 6장에서 자세히 살펴봄)

- 매우 중요 !

`주의점으로, 생성자 함수의 프로토타입 객체가 변경되면, 변경된 시점 이후에 생성된 객체들은 변경된 프로토타입 객체로 [[Prototype]] 링크를 연결한다는 점을 기억해야 한다.`

이에 반해 생성자 함수의 프로토타입이 변경되기 이전에 생성된 객체들은 기존 프로토타입 객체로의 [[Prototype]] 링크를 그대로 유지한다.

- 프로토타입 객체 변경

```jsx
//Person()
function Person(name){
    this.name = name;
}
console.log(Person.prototype.constructor); // Person(name)

// foo 객체 생성
var foo = new Person('foo');
console.log(foo.country); // undefined

//디폴트 프로토타입 객체 변경
Person.prototype = {
    country: 'korea',
}
console.log(Person.prototype.constructor); // Object()

//bar 객체 생성
var bar = new Person('bar');
console.log(foo.country); // undefined
console.log(bar.country); // korea
console.log(foo.constructor); // Person(name)
console.log(bar.constructor); // Object()
```

// 여기서 알아야 할 점이, Person 함수를 constructor로 가지고 있었는데, 프로토타입 객체를 변경하면, constructor가 Object()로 변한다는 사실이다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/cdf7f4d9-924d-4271-9da1-362c89a3bd38)

- 동작구조

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/4e5413ce-4a00-4deb-903b-83aa5e977ba5)

1. `Person() 함수를 생성할 때 디폴트로 같이 생성되는 Person.prototype 객체는 자신과 연결된 Person() 생성 함수를 가리키는 constructor 프로퍼티만을 가진다.`

때문에 Person.prototype.constrcutor는 Person() 생성자 함수를 가리킨다.

// 여기서 Person()과 생성자 함수는 동치이다.

1. foo 객체를 생성했다. 객체 생성 규칙에 따라 foo 객체는 Person.prototype 객체를 자신의 프로토타입으로 연결한다.

그러나 foo 객체는 country 프로퍼티가 없고 또한 디폴트 프로토타입 객체 Person.prototype도 coutnry프로퍼티가 없으므로 프로토타입 체이닝이 일어나도 결국 undefined 값이 출력된다.

1. 앞서 설명했듯이 Javascript에서는 디폴트 프로토타입 객체 또한 변경이 가능하다.

여기서는 객체 리터럴 방식으로 생성한 country 프로퍼티를 가진 객체로 프로토타입 객체(Person.prototype)을 변경했다.

그렇다면 1과 같이 Person.prototype.constructor는 어떤 값일까?

변경한 프로토타입 객체는 단지 country 프로퍼티가 있으므로, 디폴트 프로토타입 객체처럼 constructor 프로퍼티가 없다. (객체 리터럴 방식으로 country만 넣어줬기 때문임)

이 경우도 똑같이 프로토타입 체이닝이 발생한다.

변경한 프로토타입 객체는 객체 리터럴 방식으로 생성했으므로 Object.prototype을 [[Prototype]] 링크로 연결한다.

따라서 Object.protoype 객체로 프로토타입 체이닝이 발생한다.

Object.prototype 역시 Object() 생성자 함수와 연결된 빌트인 프로토타입 객체여서, 

Object() 생성자 함수를 constructor 프로퍼티에 연결하고 있다.

따라서 Person.prototype.constrcutor 값은 Object() 생성자 함수가 출력된다.

1. 이제 다시 bar 객체를 생성했다.

이때 Person() 생성자 함수의 prototype 프로퍼티는 디폴트 프로토타입 객체가 아닌 새로 변경된 프로토타입 객체를 가리키고 있다.

따라서 bar 객체는 새로 변경된 프로토타입 객체를 [[Prototype]]링크로 가리키게된다.

foo 객체는 디폴트 프로토 타입 객체를, bar 객체는 새로 변경된 프로토타입 객체를 각각 [[Prototype]] 링크로 가리키게 된다.

1. foo 객체는 디폴트 프로토타입 객체를, bar 객체는 새로 변경된 프로토타입 객체를 각각 [[Prototype]] 링크로 연결한다.

// 이때 각각의 Prototype가 덮어씌워지는줄 알았는데, 따로 살아있는것 같다.

프로토타입이 달라서 foo 객체와 bar 객체는 프로토타입 체이닝이 서로 다른 결과값을 만들어 버린다. 즉, foo.country는 undefined인 반면 bar객체는 프로토타입 체이닝으로 korea라는 결과값을 출력하게 된다.

또한, foo.constructor도 Person() 생성자 함수를 가리키지만, bar.constructor는 Object()를 가리킨다.

### 객체의 프로퍼티 읽기나 메서드를 실행할 때만 프로토타입 체이닝이 동작한다.

객체의 특정 프로퍼티를 읽으려고 할 때, 프로퍼티가 해당 객체에 없는 경우 프로토타입 체이닝이 발생한다.

반대로 객체에 있는 특정 프로퍼티에 값을 쓰려고 한다면 이때는 프로토타입 체이닝이 일어나지 않는다. (당연한 얘기임)

Javascript는 객체에 없는 프로퍼티에 값을 쓰려고 할 경우 동적으로 객체에 프로퍼티를 추가하기 때문이다.

- 프로토타입 체이닝과 동적 프로퍼티 생성

```jsx
// Person() 생성자 함수
function Person(name) {
    this.name = name;
}

Person.prototype.country = 'Korea';

var foo = new Person('foo');
var bar = new Person('bar');

console.log(foo.country); // Korea
console.log(bar.country); // Korea
foo.country = 'USA';

console.log(foo.country); // USA
console.log(bar.country); // Korea
```

1. foo.country에 접근하려고 했을 때, foo 객체는 name 프로퍼티 밖에 없으므로 프로토타입 체이닝이 이뤄지면서 foo의 프로토타입 객체인 Person.prototype의 country 프로퍼티 값인 Korea가 출력된다.

1. 1과 반대로 foo.country 값에 ‘USA’라는 값을 저장하면, 프로토타입 체이닝이 동작하는 것이 아니라, foo 객체에 country 프로퍼티 값이 동적으로 생성된다.

1. 그러므로 foo.country는 프로토타입 체이닝 없이 바로 ‘USA’ 값이 출력되는 반면, bar 객체는 프로토타입 체이닝을 거쳐 ‘Korea’가 출력된다.

# 실행 컨텍스트와 클로저

Javascript가 실행될 때 생성되는 하나의 실행 단위인 실행 컨텍스트, 변수의 유효 범위, 그리고 클로저를 설명한다.

이는 Javascript 에서 매우 중요한 개념으로서, 이들을 정확히 이해하지 못하면, 다른 사람이 작성한 Javascript 코드를 이해하기 얼렵고, 활용하기 불편할 뿐만 아니라 디버깅도 굉장히 어려울 것이다.

1. 실행 컨텍스트(Execution Context)의 개념
2. 활성 객체(Activation Object)와 변수 객체(Variable Object)
3. 스코프 체인(Scope Chain)
4. 클로저(Closure)

## 실행 컨텍스트 개념

실행 컨텍스트는 콜 스택에 들어가는 실행 정보 하나와 비슷하다.

ECMAScript에서는 실행 컨텍스트를 “실행 가능한 코드를 형상화하고 구분하는 추상적인 개념”으로 기술한다.

이를 앞에서 설명한 콜 스택과 연관하여 정의하면 “실행 가능한 Javascript 코드 블록이 실행되는 환경”이라고 할 수 있고, 이 컨텍스트 안에 실행에 필요한 여러가지 정보를 담고 있다.

여기서 말하는 실행 가능한 코드 블록은 대부분의 경우 함수가 된다.

ECMAScript에서는 실행 컨텍스트가 형성되는 경우를 세가지로 규정하고 있다.

1. 전역 코드
2. eval() 함수로 실행되는 코드
3. 함수 안의 코드를 실행할 때,

대부분 프로그래머는 함수로 실행 컨텍스트를 만든다.

그리고 이 코드 블록안에 변수 및 객체, 실행 가능한 코드가 들어있다.

이 코드가 실행되면 실행 컨텍스트가 생성되고, 실행 컨텍스트는 스택안에 하나씩 차곡차곡 쌓이고, 제일 위 top에 위치하는 실행 컨텍스트가 현재 실행되고 있는 컨텍스트다.

ECMAScript에서는 실행 컨텍스트의 생성을 다음 처럼 설명한다.

“현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 실행 코드가 실행되면, 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이동한다.”

```jsx
console.log("This is global context"); //"This is global context"

function ExContext1(){
    console.log("This is ExContext1");
};

function ExContext2(){
    ExContext1(); // "This is global ExContext1"
    console.log("This is ExContext2"); //"This is ExContext2"
};

ExContext2();
```

전역 실행 컨텍스트가 가장 먼저 실행된다. (전역 실행 컨텍스트라는 말에 현혹되지 말자. 가장 먼저 실행되는 실행 컨텍스트일 뿐이다.)

다른 실행 컨텍스트와 다른 점은 이후에 설명한다.

## 실행 컨텍스트 생성 과정

실행 컨텍스트의 생성과정을 설명한텐데, 이 과정에서 다음과 같은 중요 개념을 설명한다.

- 활성 객체와 변수 객체
- 스코프 체인

```jsx
function execute(param1, param2){
    var a = 1, b = 2;
    function func() {
        return a+b;
    }
    return param1 + param2 + func();
}

execute(3, 4);
```

### 활성 객체 생성

실행 컨텍스트가 생성되면 Javascript 엔진은 해당 컨텍스트에서 실행에 필요한 여러가지 정보를 담을 객체를 생성하는데, 이를 “활성 객체”라고 정의한다.

이 객체에 앞으로 매개변수나 사용자가 정의한 변수 및 객체를 저장하고, 새로 만들어진 컨텍스트로 접근 가능하게 되어 있다.

이는 엔진 내부에서 접근할 수 있다는 것이지 사용자가 접근할 수 있다는 것은 아니다.

### arguments 객체 생성

다음 단계에서는 arguments 객체를 생성한다.

앞서 만들어진 활성 객체는 arguments 프로퍼티로 이 arguments 객체를 참조한다.

그림에서는 execute() 함수의 param1과 param2가 들어왔을 경우의 활성 객체의 상태를 표현한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/2851ff6d-49e2-4e13-ae78-1f527ba8bd14)


### 스코프 정보 생성

현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성한다.

이 스코프 정보는 현재 실행중인 실행 컨텍스트 안에서 연결 리스트와 유사한 형식으로 만들어 진다.

현재 컨텍스트에서 특정 변수에 접근해야 할 경우, 이 리스트를 활용한다.

이 리스트로 현재 컨텍스트의 변수뿐 아니라, 상위 실행 컨텍스트의 변수도 접근이 가능하다.

이 리스트에서 찾지 못한 변수는 결국 정의되지 않은 변수에 접근하는 것으로 판단하여 에러를 검출한다.

이 리스트를 스코프 체인이라고 하는데, [[scope]] 프로퍼티로 참조된다.

이것이 왜 리스트의 형태를 띠고 있고, 이 체인이 어떻게 형성되며, 리스트의 구성 요소가 무엇인지는 이후에 좀 더 자세히 살펴본다.

여기서는 현재 생성된 활성객체가 스코프 체인의 제일 앞에 추가되며, execute() 함수의 인자나 지역 변수등에 접근할 수 있다는것만 알고 넘어가자.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/e5cd846a-1fb6-4b57-8e92-a58e816963df)

### 변수 생성

현재 실행 컨텍스트 내부에서 사용되는 지역 변수의 생성이 이루어진다.

ECMAScript 에서는 생성되는 변수를 저장하는 변수 객체를 언급하는데, 실제적으로 앞서 생성된 활성 객체가 변수 객체로 사용된다.

`우리가 Javascript 관련 문서를 읽다 보면 어떤곳에서는 활성 객체, 어떤 곳에서는 변수 객체라고 사용되어 혼란스러운 경우가 있는데, 두 객체가 같은 객체이므로 혼동하는 일이 없기를 바란다.`

변수 객체 안에서 호출된 함수 인자는 각각의 프로퍼티가 만들어지고 그 값이 할당된다.

만약 값이 넘겨지지 않았다면 undefined가 할당된다. ( Javascript는 굳이 인자를 선언한 대로 넘길 필요는 없음)

execute() 함수 안에 정의된 변수 a,b와 func가 생성된다.

여기서 주의할 점은 이 과정에서는 변수나 내부 함수를 단지 메모리에 생성(Instantiation)하고, 초기화(initialization)는 각 변수나 함수에 해당하는 표현식이 실행되기 전까지는 이루어지지 않는다는 점이다.

따라서 변수 a와 b에는 먼저 undefined가 할당된다.

표현식의 실행은 변수 객체 생성이 다 이루어진 후 시작된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/4c6574d8-5178-477f-ae11-f6558fd73225)

### this 바인딩

마지막 단계에서는 this 키워드를 사용하는 값이 할당된다.

이 값에 어떤 객체가 들어갈지는 앞에서 배운 규칙에 따른다.

여기서 this가 참조하는 객체가 없으면 전역 객체를 참조한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/8984f7d2-a81d-429f-b1ed-d5d04415c8fc)

### 코드 실행

이렇게 하나의 실행 컨텍스트가 생성되고, 변수 객체가 만들어진 후에, 코드에 있는 여러가지 표현식 실행이 이루어진다.

이렇게 실행되면서 변수의 초기화 및 연산, 또 다른 함수 실행등이 이루어 진다.

그림에서 undefined가 할당된 변수 a와 b에도 이 과정에서 1, 2의 값이 할당 된다.

참고로 전역 실행 컨텍스트는 일반적인 실행 컨텍스트와는 약간 다른데, arguments 객체가 없으며, 전역 객체 하나만을 포함하는 스코프 체인이 있다.

`ECMAScript에서 언급된 바에 의하면 실행 컨텍스트가 형성되는 세 가지 중 하나로서 전역 코드가 있는데, 이 전역 코드가 실행될 때 생성되는 컨텍스트가 전역 실행 컨텍스트다.`

전역 실행 컨텍스트는 변수를 초기화하고 이것의 내부 함수는 일반적인 탑레벨의 함수로 선언된다.

`그리고 전역 실행 컨텍스트의 변수 객체가 전역 객체로 사용된다.`

`즉, 전역 실행 컨텍스트에서는 변수 객체가 곧 전역 객체이다.`

따라서 전역적으로 선언된 함수와 변수가 전역 객체의 프로퍼티가 된다.

전역 실행 컨텍스트 역시, this를 전역 객체의 참조로 사용한다.

- 참고

브라우저에서는 최상위 코드가 곧 전역 코드지만, Node.js에서는 다르다.

```jsx
var a = 10;
b = 15;

console.log(window.a); // 10
console.log(window.b); // 15
```

브라우저에서 위 코드는 잘 실행된다.

var a로 정의한 변수가 전역 객체인 window의 한 프로퍼티로 들어갔다.

하지만 Node.js에서는 다르다.

```jsx
var a = 10;
b = 15;
console.log(global.a); // undefined
console.log(global.b) // 15
```

`Node.js에서는 최상위 코드가 브라우저와는 달리 전역 코드가 아니다.`

따라서 var a로 정의된 변수가 전역 객체에 들어가지 않는다.

`Node.js에서는 일반적으로 Javascript 파일, 예를들어 filename.js가 하나의 모듈로 동작하고 이 파일의 최상위에 변수를 선언해도 그 모듈의 지역 변수가 된다.`

하지만 var를 사용하지 않을 경우 전역 객체인 global에 들어가고, 이는 전역 객체를 오염시키는 원인이 되므로 주의해야 한다.

## 스코프 체인

Javascript 코드를 이해하려면 스코프 체인의 이해는 필수적이다.

이를 알아야, 변수에 대한 인식(Identifier Resolution) 메커니즘을 알 수 있고, 현재 사용되는 변수가 어디에서 선언된 변수인지 정확히 알 수 있기 때문이다.

3장에서 설명한 프로토타입 체인과 거의 비슷한 메커니즘이므로 이해하기 어렵지는 않을 것이다.

Javascript도 다른 언어와 마찬가지로 스코프, 즉 유효 범위가 있다.

이 유효 범위안에서 변수와 함수가 존재한다.

- C언어에서의 유효범위를 확인할 수 있는 코드

```jsx
void example_scope(){
    int i = 0;
    int value = 1;
    for (i = 0; i < 10; i++){
        int a = 10;
    }
    printf("a : %d", a); // 컴파일 에러

    if(i == 10){
        int b = 20;
    }
    printf("b : %d", b); // 컴파일 에러
    printf("value : %d", value); // 1
}
```

C코드를 예로 들면, {}로 묶여 있는 범위안에서 선언된 변수는 블록이 끝나는 순간 사라지므로, 밖에서는 접근할 수 없다.

특히, 함수의 {} 뿐만 아니라, if, for문의 {}로 한 블록으로 묶여, 그 안에서 선언된 변수가 밖에서는 접근이 불가능하다.

`하지만 Javascript에서는 함수 내의 {} 블록은, 이를 테면 for() {} if {}와 같은 구문은 유효범위가 없다.`

오직 함수만이 유효 범위의 한 단위가 된다.

이 유효 범위를 나타내는 스코프가 [[scope]] 프로퍼티로 각 함수 객체 내에서 연결 리스트 형식으로 관리되는데, 이를 “스코프 체인”이라고 정의한다.

이러한 스코프 체인은 다음 그림과 같이 각 실행 컨텍스트의 변수 객체가 구성 요소인 리스트와 같다.

- 스코프 체인

| 3 | …. |
| --- | --- |
| 2 | 변수 객체 2 |
| 1 | 변수 객체 1 |
| 0 | 변수 객체 0 |

각각의 함수는 [[scope]] 프로퍼티로 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조한다.

함수가 실행되는 순간 실행 컨텍스트가 만들어지고, 이 실행 컨텍스트는 실행된 함수의 [[scope]] 프로퍼티를 기반으로 새로운 스코프 체인을 만든다.

### 전역 실행 컨텍스트의 스코프 체인

```jsx
var var1 = 1;
var var2 = 2;
console.log(var1); // 1
console.log(var2); // 2
```

위의 코드는 전역코드이다.

함수가 선언되지 않아 함수 호출이 없고, 실행 가능한 코드들만 나열되어 있다.

이 Javascript 코드를 실행하면, 먼저 전역 실행 컨텍스트가 생성되고 변수 객체가 만들어진다.

이 변수 객체의 스코프 체인은 어떻게 될까?

현재 전역 실행 컨텍스트 단하나만 실행되고 있어 참조할 상위 컨텍스트가 없다.

자신이 최상위에 위치하는 변수 객체인 것이다.

따라서, 이 변수 객체의 스코프 체인은 자기 자신만을 가진다.

다시 말해서, 변수 객체의 [[scope]]는 변수 객체 자신을 가리킨다.

그 후, var1, var2 변수들이 생성되고 변수 객체에 의해 참조된다.

“실행 컨텍스트 생성과정”에서 언급한 대로 이 변수 객체가 곧 전역 객체가 된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/f6e36d7d-b28c-445e-96ca-6f8344443c97)

### 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인

```jsx
var var1 = 1;
var var2 = 2;
functoin func() {
    var var1 = 10;
    var var2 = 20;
    console.log(var1); // 10
    console.log(var2); // 20
}
func();
console.log(var1); // 1
console.log(var2); // 2
```

위 코드를 실행하면 전역 실행 컨텍스트가 생성되고, func() 함수 객체가 만들어진다.

이 함수 객체의 [[scope]]는 어떻게 될까?

`함수 객체가 생성될 때, 그 함수 객체의 [[scope]]는 현재 실행되는 컨텍스트의 변수 객체에 있는 [[scope]]를 그대로 가진다.`

따라서 func 함수 객체의 [[scope]]는 전역 변수 객체가 된다.

func()을 실행 시켰을 때의 과정을 알아보자.

함수를 실행하였으므로 새로운 컨텍스트가 만들어진다. 이 컨텍스트를 편의상 func 컨텍스트라고 한다.

`func 컨텍스트의 스코프 체인은 실행된 함수의 [[scope]] 프로퍼티를 그대로 복사한 후, 현재 생성된 변수 객체를 복사한 스코프 체인의 맨 앞에 추가한다.` 

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/19044069-4cb0-451d-9a39-a3d5e10a7ea1)

// 지금보니, Scope Chain은 List 형식으로 구현한 Stack이다.

스코프 체인에서 var1과 var2는 func 변수 객체를 먼저 탐색하고 없으면, 전역 객체를 탐색한다.

func() 함수 객체의 [[scope]] 프로퍼티가 전역 객체 하나만을 가지고 있었으므로, func 실행 컨텍스트의 스코프 체인은 그림과 같이 func 변수 객체 → 전역 객체가 된다.

- 스코프 체인 정리
1. 각 함수 객체는 [[scope]] 프로퍼티로 현재 컨텍스트의 스코프 체인을 참조한다.
2. 한 함수가 실행되면 새로운 실행 컨텍스트가 만들어지는데, 이 새로운 실행 컨텍스트는 자신이 사용할 스코프 체인을 다음과 같은 방법으로 만든다.

`현재 실행되는 함수 객체의 [[scope]] 프로퍼티를 복사하고, 새롭게 생성된 변수 객체를 해당 체인의 제일 앞에 추가한다.`

1. 스코프 체인 = 현재 실행 컨텍스트의 변수 객체 + 상위 컨텍스트의 스코프 체인

// 한마디로 정리해서 스코프 체인은 변수나 메서드를 사용할 수 있는 유효 범위를 알려준다. 이때, 유효 범위는 Activation Object이다.

ex) 브라우저에서 최상위 객체인 window(Activation Object)에서 func() 함수를 실행하면,

func() Execution Context가 만들어지는데, 이 함수 내에서 사용할 수 있는 유효 범위가 또 func의 Activation Object(아래 사진에 보이는 func객체 자체가 Activation Object이다.)가 유효 범위로 지정된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/bf09dfc9-89d0-42ce-af5e-29728669ddcc)

```jsx
var value = "value1";

function printFunc() {
    var value = "value2";

    function printValue() {
        return value;
    }

    console.log(printValue());
}

printFunc();
```

이 코드도 위에 그린 그림처럼 처리된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/579335aa-9dc2-4450-b31c-098ea1a63a4e)

// 이때 value는 printFunc 변수 객체에서 찾는데, 없으므로, 스코프 체이닝을 통해 상위 컨텍스트에 있는 value2를 결과 값으로 반환하게 된다.

```jsx
var value = "value1";

function printValue() {
    return value;
}

function printFunc(func) {
    var value = "value2";
    console.log(func());
}

printFunc(printValue);
```

- `// 내 생각과 다르게 동작한다.`
    
    value2가 결과값으로 출력될거라고 생각했다.
    
    그 이유가 스코프 체인이 그대로 쌓일 줄 알았는데, 그렇지 않다.
    
    func(printValue)를 호출할 때,  printFunc()에서 호출하기 때문에 printFunc에 있는 value를 사용할 것이라고 생각했지만, 사실 코드를 보면 전역 활성 객체에 printValue와 printFunc()이 있다.
    
    그래서 printFunc(printValue())을 호출할 때, printValue()의 스코프 체인은 
    
    전역객체 → printValue 변수 객체의 순서이다.
    
    그래서 value 값을 찾을 때, printValue에 없으면, 전역객체에서 값을 찾게 된다.
    
    `그래서 반환값은 결국 value 1이된다.`
    

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/36eae4a4-a03f-463d-a169-2c653806bbba)

- 식별자 인식 (Identifier Resolution)

이렇게 만들어진 스코프 체인으로 식별자 인식이 이루어진다.

식별자 인식은 스코프 체인의 첫 번째 변수 객체부터 시작한다.

`식별자와 대응되는 이름을 가진 프로퍼티가 있는지를 확인한다.`

함수를 호출할 때 스코프 체인의 가장 앞에 있는 객체가 변수 객체이므로, 이 객체에 있는 공식 인자, 내부 함수, 지역 변수에 대응되는지 먼저 확인한다.

첫번째 객체에 대응되는 프로퍼티를 발견하지 못하면, 다음 객체로 이동하여 찾는다.

이런식으로 대응되는 이름의 프로퍼티를 찾을 때까지 계속된다.

여기서 this는 식별자가 아닌 키워드로 분류되므로, 스코프 체인의 참조 없이 접근할 수 있음을 기억하자.

참고) Javascript에는 스코프 체인을 사용자가 임의로 수정하는 키워드가 있는데, 이것이 with이다.

with는 eval과 함께, 성능을 높이고자 하는 Javascript 프로그래머에게는 사용하지 말아야 할 키워드이다.

Javascript 성능 최적화를 집피한 니콜라스 자카스는 with 구문을 두고 “pure javascript evil”이라고까지 하였다.

with 구문은 표현식을 실행하는데, 표현식이 객체이면 객체는 현재 실행 컨텍스트의 스코프 체인에 추가된다. (활성화 객체의 바로 앞에)

with 구문은 다른 구문(블록 구문일 수도 있음)을 실행하고 실행 컨텍스트의 스코프 체인을 전에 있던 곳에 저장한다.

```jsx
var y = { x : 5 };

function withExamFunc() {
    var x = 10;
    var z;

    with(y) {
        z = function(){
            console.log(x); // 5 // y객체의 x가 출력된다.
        }
    }
    z();
}
withExamFunc();
```

withExamFunc() 함수가 호출되면 실행 컨텍스트는 전역 변수 객체와 현재 실행 컨텍스트의 변수 객체를 포함하는 스코프 체인이 있다.

여기에, with 구문의 실행으로 전역 변수 y에 의해 참조되는 객체를 함수 표현식이 실행되는 동안 스코프 체인의 맨 앞에 추가한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/f6a73ea1-0379-4367-a8af-7a26d315dfea)

- 호이스팅

여기까지 이해했으면 함수 호이스팅에서 소개된 호이스팅의 원인을 이해할 수 있어야 한다.

```jsx
foo();
bar();

var foo = function() {
    console.log("foo and x = " + x);
};

function bar() {
    console.log("bar and x = " + x);
}

var x = 1;
```

위 코드는 아래와 같다.

```jsx
var foo;

function bar() {
    console.log("bar and x = " + x);
}

var x ;

foo(); // TypeError
bar();

foo = function() {
    console.log("foo and x = " + x);
};

x = 1;
```

함수 생성과정에서 변수 foo. 함수 객체 bar, 변수 x를 차례로 생성한다.

foo와 x에는 undefined가 할당된다.

실행이 시작되면 foo(), bar()를 연속해서 호출하고 foo에 함수 객체의 참조가 할당되며, 변수 x에 1이 할당된다.

결국, foo()에서 “TypeError” 에러가 발생한다.

foo가 선언되어 있기는 하지만 함수가 아니기 때문이다.

foo()를 커멘트 처리한 후 실행하면 bar()에서는 “bar and x=undefined”가 출력된다.

x에 1이 할당되기 전에 실행했기 때문이다.

// 쉽게 생각해서 호이스팅은 할당이 일어나지 않았기 때문이다.

## 클로저

### 클로저의 개념

```jsx
function outerFunc() {
    var x = 10;
    var innerFunc = function() { console.log(x) }
    return innerFunc;
}

var inner = outerFunc();
inner(); // 10
```

![image-83.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8262f71f-01dc-40d7-9a7a-6e823fd3259b/image-83.jpg)

앞서 배운 그림과 크게 다르지 않다.

innerFunc()의 [[scope]]은 outerFunc 변수 객체와 전역 객체를 가진다.

그런데 여기서 혼란스러운 부분이 있다.

위 코드에서 innerFunc()은 outerFunc()의 실행이 끝난 후 실행된다.

그렇다면 outerFunc 실행 컨텍스트가 사라진 이후에 innerFunc 실행 컨텍스트가 생성되는 것인데, innerFunc()의 스코프 체인은 outerFunc 변수 객체를 여전히 참조할 수 있을까?

outerFunc 실행 컨텍스트는 사라졌지만, outerFunc 변수 객체는 여전히 남아있고, innerFunc의 스코프 체인으로 참조되고 있다.

`이것이 바로 Javascript에서 구현한 클로저 라는 개념이다.`

앞서 보았듯이 Javascript에서 함수는 일급 객체로 취급된다.

이는 함수를 다른 함수의 인자로 넘길 수 있고, return으로 함수를 통째로 반환 받을 수도 있음을 의미한다.

이러한 기능으로 앞에서 본 것과 같은 코드가 가능하다.

여기서 최종 반환되는 함수가 외부 함수의 지역변수에 접근하고 있다는 것이 중요하다.

이 지역변수에 접근하려면, 함수가 종료되어 외부 함수의 컨텍스트가 반환되더라도 변수 객체는 반환되는 내부 함수의 스코프 체인에 그대로 남아있어야만 접근할 수 있다.

이것이 바로 클로저다.

클로저는 이미 많은곳에서 정의 내리고 있지만, 그 정의만 보고는 쉽게 이해하기 어렵다.

그 정의만 보고는 쉽게 이해하기 어렵다.

여기서는 조금 쉽게 풀어서 정의하겠다.

`이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수를 클로저라고 한다.`

따라서 앞의 코드에서는 outerFunc에서 선언된 x를 참조하는 innerFunc가 클로저가 된다.

그리고 클로저로 참조되는 외부 변수 즉, outerFunc의 x와 같은 변수를 자유 변수(Free Variable)라고 한다.

Closure라는 이름은 “함수가 자유변수에 대해 닫혀있다.(closed, bound)”는 의미다.

우리말로 의역하면, 자유 변수에 엮여있는 함수 라는 표현이 맞을 듯 하다.

```jsx
function oterFunc(){
    var x = 1; //Free Variable
    return function() { // Closure
        // x와 arguments를 활용한 로직 
    }
}

var new_func = outerFunc();

new_func();
```

위 코드는 Javascript로 클로저를 구현하는 전형적인 패턴이다.

코드에서 보이듯이 외부함수의 호출이 이루어지고, 이 외부함수에서 새로운 함수가 반환된다.

반환된 함수가 클로저이고 이 클로저는 자유변수를 묶고 있다.

반환된 클로저는 새로운 함수로 사용된다.

대부분의 클로저를 활용하는 코드가 이와 같은 형식을 유지한다.

이러한 특성을 바탕으로 Javascript를 이용한 함수형 프로그래밍이 가능하다.

참고)

클로저는 Javascript에만 있는 개념은 아니고, 여러 언어에서 차용되고 있는 특성이다.

특히 함수를 일급 객체로 취급하는 언어 (보통 이를 함수형 언어 Functional Language 라고 한다.)에서 주요하게 사용되는 특성이다.

Javascript 뿐만 아니라, 여러가지 함수형 언어를 배워보고자하는 독자라면 이 클로저라는 개념을 반드시 이해해야 한다.

```jsx
function outerFunc(arg1, arg2){
    var local = 8;
    function innerFunc(innerArg){
        console.log((arg1 + arg2) / (innerArg + local));
    }
    return innerFunc();
}

var exam1 = outerFunc(2, 4);
exam1(2);
```

outerFunc() 함수를 호출하고 반환되는 함수 객체인 innerFunc()가 exam1으로 참조된다.

이것은 exam1(n)의 형태로 실행될 수 있다.

여기서 outerFunc()가 실행되면서 생성되는 변수 객체가 스코프 체인에 들어가게 되고 이 스코프 체인은 innerFunc의 스코프 체인으로 참조된다.

`즉, outerFunc() 함수가 종료되었지만, 여전히 내부 함수(innerFunc())의 [[scope]]로 참조되므로 가비지 컬렉션의 대상이 되지 않고, 여전히 접근 가능하게 살아있다.`

따라서 이후에 exam1(n)을 호출하여도, innerFunc()에서 참조하고자 하는 변수 local에 접근할 수 있다.

클로저는 이렇게 만들어진다.

이 outerFunc 변수 객체의 프로퍼티 값은 여전히 (심지어 실행 컨텍스트가 끝났음에도) 읽기 및 쓰기까지 가능하다.

![image-85.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3cd7f2fb-b0b7-4503-8210-9d7c528a1ed7/image-85.jpg)

따라서 exam1(2)를 호출하면, arg1, arg2, local 값은 outerFunc 변수 객체에서 찾고, innerArg는 innerFunc 변수 객체에서 찾는다.

결과는 ((2 + 4) / (2 + 8))가 된다.

innerFunc()에서 접근하는 변수 대두분이 스코프 체인의 첫번째 객체가 아닌 그 이후의 객체에 존재한다.

이는 성능 문제를 유발시킬 수 있는 여지가 있다. 대부분의 클로저에서는 스코프 체인에서 뒤쪽에 있는 객체에 자주 접근하므로, 성능을 저하시키는 이유로 지목되기도 한다.

게다가 앞에서 알아본 대로 클로저를 사용한 코드가 그렇지 않은 코드보다 메모리 부담이 많아진다.

그렇다고 클로저를 쓰지 않는 것은 Javascript의 강력한 기능 하나를 무시하고 사용하는 것과 다름이 없다.

따라서 클로저를 영리하게 사용하는 지혜가 필요하며, 이를 위해선 많은 프로그래밍 경험을 쌓아야 한다.

### 클로저의 활용

클로저는 성능적인 면과 자원적인 면에서 약간 손해를 볼 수 있으므로 무차별적으로 사용해서는 안된다.

사실 클로저를 잘 활용하려면 경험이 가장 중요하게 작용한다.

여기서 아주 전형적인 클로저의 예제 코드를 소개한다.

어느 정도 클로저의 감각만이라도 얻어갈 수 있기를 바란다.

그리고 이후에 “함수형 프로그래밍 (7장)” 에서 소개할 대부분의 예제가 클로저를 활용한 것이므로 참고하길 바란다.

하지만 진정 좋은 Javascript 프로그래머가 되려면 많은 개발 경험을 쌓는 것이 가장 좋은 방법이다.

- 특정 함수에 사용자가 정의한 객체의 메서드 연결하기

```jsx
function HelloFunc(func) {
    this.greeting = "hello";
}

HelloFunc.prototype.call = function(func) {
    func ? func(this.greeting) : this.func(this.greeting);
    //함수가 있으면 실행을 시키고, 없으면 HelloFunc 객체의 function을 실행시키는 것이다.
}

var userFunc = function(greeting) {
    console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call(); // hello
```

`//아무리 봐도 뭐하는건지 모르겠다..`

- 왜 이해를 못했는가?
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ad2aa0f9-537e-4b9e-a7c2-db0580e5eea6/Untitled.png)
    
    내가 생각한 코드는 위 처럼 전개 된다.
    
    그런데 위에서 보여준 예시는 삼항 연산자의 false 부분에 값이 들어가는 경우가 값으로 반환되는 상황을 보여주고 있었다.
    
    ```jsx
    HelloFunc.prototype.call = function(func) {
        func ? func(this.greeting) : userFunc(this.greeting);
        // 위의 코드에서 보면 책에서 제시하는 삼항연산자의 
        // false에 해당하는 함수가 userFunc으로 해석되는거다.
    }
    ```
    

함수 HelloFunc는 greeting 변수가 있고, func 프로퍼티로 참조되는 함수를 call() 함수로 호출한다.

사용자는 func 프로퍼티에 자신이 정의한 함수를 참조시켜 호출할 수 있다.

다만, HelloFunc.prototype.call()을 보면 알 수 있듯이 자신의 지역변수인 greeting만을 인자로 사용자가 정의한 함수에 넘긴다.

앞 예제에서 사용자는 userFunc() 함수를 정의하여 HelloFunc.func()에 참조시킨 뒤, HelloFunc()의 지역변수인 greeting을 화면에 출력 시킨다.

이 예제에서 HelloFunc()은 greeting만을 인자로 넣어 사용자가 인자로 넘긴 함수를 실행시킨다.

그래서 사용자가 정의한 함수도 한 개의 인자를 받는 함수를 정의할 수 밖에 없다.

사용자가 원하는 인자를 더 넣어서 HelloFunc()을 이용하여 호출하려면 어떻게 해야 할까?

```jsx
function saySomething(obj, methodName, name) {
    return (function(greeting) {
        return obj[methodName](greeting, name);
    });
}

function newObj(obj, name) {
    obj.func = saySomething(this, "who", name);
    return obj;
}

newObj.prototype.who = function(greeting, name){
    console.log(greeting + " " + (name || "everyone") );
}
```

newObj() 함수는 HelloFunc()의 객체를 좀 더 자유롭게 활용하려고 정의한 함수이다.

첫 번째 인자로 받는 obj는 HelloFunc()의 객체가 되고, 두 번째 인자는 사용자가 출력을 원하는 사람 이름이 된다.

```jsx
var obj1 = new newObj(objHello, "zzoon");
// 실행 결과

objHello.func = saySomething(this, "who", "zzoon");
return objHello;
// 실행결과

return (function(greeting) {
    return objHello["who"](greeting, "zzoon");
});

```

첫번째 인자 obj의 func 프로퍼티에 saySomething() 함수에서 반환되는 함수를 참조하고, 반환한다.

결국 obj1은 인자로 넘겼던 objHello 객체에서 func 프로퍼티에 참조된 함수만 바뀐 객체가 된다.

따라서 다음과 같이 호출할 수 있다.

```jsx
obj1.call();
```

이 코드의 실행결과, newObj.prototype.who 함수가 호출되어 사용자가 원하는 결과인 “hello zzoon”을 출력한다.

```jsx
function HelloFunc(func) {
    this.greeting = "hello";
}

HelloFunc.prototype.call = function(func) {
    func ? func(this.greeting) : this.func(this.greeting);
}

var userFunc = function(greeting) {
    console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call();

function saySomething(obj, methodName, name) {
    return (function(greeting) {
        return obj[methodName](greeting, name);
    });// 이게 클로저가 된다.
}

function newObj(obj, name) {
    obj.func = saySomething(this, "who", name);
    return obj;
}

newObj.prototype.who = function(greeting, name) {
    console.log(greeting + " " + (name || "everyone"));
}

var obj1 = new newObj(objHello, "zzoon");
obj1.call() // hello zzoon
```

이렇게 반환되는 함수가 HelloFunc이 원하는 function(greeting) {} 형식의 함수가 되는데, 이것이 HelloFunc 객체의 func로 참조된다.

obj1.call()로 실행되는 것은 실질적으로 newFunc.prototype.who()가 된다.

이와 같은 방식으로 사용자는 자신의 객체 메서드인 who 함수를 HelloFunc에 연결시킬 수 있다.

여기서 클로저는 saySomething()에서 반환되는 function(greeting){}이 되고,

이 클로저는 자유 변수 obj, methodName, name을 참조한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17404372-4306-4fea-993b-7732d4311e2a/Untitled.png)

new newObj(objHello, “zzoon”) 생성자 함수를 호출할 때,

생성자 함수에 있는 property 객체가 obj1의 [[Prototype]]에 링크 된다.

이 property에는 위에서 본 코드처럼, newObj.prototype.who에 함수를 넣어줘서 함수가 들어가 있는 상태이다.

이때,obj1.call()을 호출하면 objHello[”who”](greeting, name);

// 코드를 이해하기 어려운 이유가, 이전에 내가 배워온 모든 언어들과 해석방식이 달라서 그렇다.

// 함수형 프로그래밍 형식으로, 함수에 다른 함수를 제어하는 함수를 또 넣는다는게, 너무 어색하게 느껴진다.

`//내가 이해하지 못했던, event의 전달방식`

앞 예제는 정해진 형식의 함수를 콜백해주는 라이브러리가 있을 경우, 그 정해진 형식과는 다른 형식의 사용자 정의 함수를 호출할 떄 유용하게 사용된다.

ex) 브라우저에서는 onclick, onmouseover와 같은 프로퍼티에 해당 이벤트 핸들러를 사용자가 정의해 놓을수가 있는데, 이 이벤트 핸들러의 형식은 function(event) {} 이다.

이를 통해 브라우저는 발생한 이벤트를 event 인자로 사용자에게 넘겨주는 방식이다.

여기에 event외의 원하는 인자를 더 추가한 이벤트 핸들러를 사용하고 싶을 때, 앞과 같은 방식으로 클로저를 적절히 활용해 줄 수 있다.

### 함수의 캡슐화

I am XXX, I live in XXX, I’m XX Years old라는 문장을 출력하는데, XX 부분은 사용자에게 인자로 입력받아 출력하는 함수라고한다면,

가장 먼저 생각할 수 있는 것은 앞 문장 템플릿을 전역 변수에 저장하고, 사용자의 입력을 받은 후 , 이 전역 변수에 접근하여 완성된 문장을 출력하는 방식으로 함수를 작성하는 것이다.

```jsx
var buffAr = [
    'I am ',
    '',
    '. I live in ',
    '',
    '. I\'am ',
    ' years old.',
];

function getCompletedStr(name, city, age) {
    buffAr[1] = name;
    buffAr[3] = city;
    buffAr[5] = age;
    return buffAr.join('');
}

var str = getCompletedStr('zzoon', 'seoul', 16);
console.log(str);
```

이 방법에는 단점이 있다.

buffAr이라는 배열은 전역 변수로서, 외부에 노출되어 있다는 점이다.

이는 다른 함수에서 이 배열에 쉽게 접근하여 값을 바꿀 수도 있고, 실수로 같은 이름의 변수를 만들어 버그가 생길 수도 있다.

이는 특히 다른 코드와의 통합 혹은 이 코드를 라이브러리로 만들려고 할 때, 까다로운 문제를 발생시킬 가능성이 있다.

실제로 다른 사람이 사용할 라이브러리를 만들려고하는 개발자는 이러한 충돌 가능성을 충분히 대비해서 라이브러리를 작성해야만 한다.

클로저를 활용해여 bufffAr을 추가적인 스코프에 넣고 사용하게 되면, 이 문제를 해결할 수 있다.

```jsx
var getCompletedStr = (function () {
    var buffAr = [
    'I am ',
    '',
    '. I live in ',
    '',
    '. I\'am ',
    ' years old.',
    ];

    return (function(name, city, age) {
        buffAr[1] = name;
        buffAr[3] = city;
        buffAr[5] = age;
        return buffAr.join('');
    });
})();

var str = getCompletedStr('zzoon', 'seoul', 16);
console.log(str);
```

가장 먼저 주의해서 봐야할 점은 변수 getCompletedStr에 익명의 함수를 즉시 실행시켜 반환되는 함수를 할당하는 것이다.

이 반환되는 함수가 클로저가 되고, 이 클로저는 자유변수 buffAr을 스코프 체인에서 참조할 수 있다.

`// 변수 이름의 충돌 가능성이 있을 때, 클로저를 사용해서 한번에 처리한다.`

![image-86.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4cbabed4-5904-49a7-9104-825787811033/image-86.jpg)

### setTimeout()에 지정되는 함수의 사용자 정의

setTimeout 함수는 웹 브라우저에서 제공하는 함수인데, 첫번째 인자로 넘겨지는 함수 실행의 스케쥴링을 할 수 있다.

setTimeout()으로 자신의 코드를 호출하고 싶다면 첫 번째 인자로 해당 함수 객체의 참조를 넘겨주면 되지만, 이것으로는 실제 실행될 때 함수에 인자를 줄 수 없다.

그렇다면 자신이 정의한 함수에 인자를 넣어줄 수 있게 하려면 어떻게 해야할까?

```jsx
function callLater(obj, a, b) {
    return (function) {
        obj["sum"] = a + b;
            console.log(obj["sum"]);
    }
}

var sumObj = {
    sum : 0
}

var func = callLater(sumObj, 1, 2);
setTimeout(func, 500);
```

사용자가 정의한 함수 callLater를 setTimeout 함수로 호출하려면, 변수 func에 함수를 반환받아 setTimeout() 함수의 첫 번째 인자로 넣어주면 된다.

`// setTimeout()을 사용할 때, 내가 만든 함수에 인자를 넣어 줄 수 있는 방법으로 클로저를 사용한다.`

### 클로저를 활용할 때 주의사항

클로저는 Javascript의 강력한 기능이지만, 너무 남발하여 사용하면 안된다.

- 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의해야 한다.

```jsx
function outerFunc(argNum) {
    var num = argNum;
    return function(x) {
        num += x;
        console.log('num : ' + num);
    }
}

var exam = outerFunc(40);
exam(5); // num : 45
exam(-10); // num : 35
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d47b7e27-18e6-42a6-9778-884e74ac3f16/Untitled.png)

`// 내 예상과 다르게 동작한다.`

`자유 변수 num의 값은 계속해서 남아있어서, 계속해서 변화한다.`

약간, static 으로 남아있는 느낌이다.

- 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다.

```jsx
function func() {
    var x = 1;
    return {
        func1 : function() { console.log( ++x ); },
        func2 : function() { console.log( -x ); }
    };
};

var exam = func();
exam.func1(); // 2
exam.func2(); // -2
```

사실상 위에서 본 예제와 같은 주의사항이다.

반환되는 객체에는 두 개의 함수가 정의되어 있는데, 두 함수 모두 자유변수 x를 참조하고
각각의 함수가 호출 될 때 마다 x 값이 변화하므로 유의해야 한다.

- 루프 안에서 클로저를 활용할 때는 주의하자.

```jsx
function countSeconds(howMany) {
    for( var i = 1; i <= howMany ; i++ ) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
};

countSeconds(3);
```

`// 내 생각과 다르게 동작한다.`

`// 이유는 setTimeout 함수를 몰라서 였다.`

setTimeout 함수는 for문 안에서 바로 실행되지 않고 지정된 시간 이후에 실행된다.

즉, for문이 모두 반복된 후에 setTimeout에 지정해둔 함수가 실행되는데, for문이 다 돌면 지정된 함수가 자신의 상위 스코프의 i변수를 살펴볼 때, 이미 값은 4가 되어있기 때문에 4가 출력된다.

1,2,3을 1초 간격으로 출력한다.

하지만 결과는 4가 연속으로 3번 1초 간격으로 출력된다.

setTimeout 함수의 인자로 들어가는 함수는 자유 변수 i를 참조한다.

하지만 setTimeout이 실행되는 시점은 countSeconds() 함수의 실행이 종료된 이후이고, i 값은 이미 4가된 상태이다.

```jsx
function countSeconds(howMany) {
    for (var i = 1; i <= howMany; i++) {
        (function (currentI) {
            setTimeout(function () {
                console.log(currentI);
            }, currentI * 1000);
            }(i));
        }
    }
};

countSeconds(3);
```

i가 돌 때마다, 즉시 실행함수를 실행시켜서, 오류를 방지하게끔 만들어 두었다.

`우리가 Javascript 라이브러리를 만들고자 할 때 이에 대한 지식 없이 만든다면 이름 충돌, 성능 저하, 비효율적 자원 활용 등의 문제가 틀림없이 발생할 것이고, 이는 좋은 라이브러리라고 할 수 없다.`

`반드시 지식을 갖춘 후 개발하자.`

# 객체지향 프로그래밍

`// 난이도가 너무 높다. 특히 상속 부분 나중에 필요하면 다시배우자.`

Java, C++과 같은 언어는 모든 인스턴스가 클래스에 정의된 대로 같은 구조이고 보통 런타임에 바꿀 수 없다.

반면에 플로토타입 기반의 언어는 객체의 자료구조, 메서드 등을 동적으로 바꿀 수 있다.

이는 마치 정적 타입의 언어와 동적 타입의 언어의 차이와 거의 비슷하게 보인다.

마찬가지로 장단점도 명확하다.

정확성, 안전성, 예측성 등의 관점에서 클래스 기반 언어는 프로토타입 기반의 언어보다 좀 더 나은 결과를 보장한다.

하지만 프로토타입 기반의 언어는 동적으로 자유롭게 객체의 구조와 동작 방식을 바꿀 수 있다는 장점이 있다.

Javascript는 프로토타입 기반의 언어이다.

프로토타입은 Javascript로 객체지향적인 구현을 하는 필수 요소이므로 확실히 이해한 후 이번 장을 읽어보자.

## 클래스, 생성자, 메서드

C++ 이나 Java와 같은 경우 class라는 키워드를 제공하여 프로그래머는 클래스를 만들 수 있다.

클래스와 같은 이름의 메서드로 생성자를 구현해 낸다.

하지만 Javascript에는 이러한 개념이 없다.

계속해서 강조했듯이, Javascript는 거의 모든것이 객체이고, 특히 함수 객체로 많은 것을 구현해낸다.

클래스, 생성자, 메서드도 모두 함수로 구현이 가능하다.

```jsx
function Person(arg) {
    this.name = arg;

    this.getName = function(){
        return this.name;
    }

    this.setName = function(value){
        this.name = value;
    }
}

var me = new Person("zzoon");
console.log(me.getName()); // zzoon

me.setName("iamhjoo");
console.log(me.getName()); // iamhjoo
```

Javascript 기반의 객체지향 프로그래밍은 기본적인 형태가 이와 같다.

클래스 및 생성자의 역할을 하는 함수가 있고, 사용자는 new 키워드로 인스턴스를 생성하여 사용할 수 있다.

예제에서 생성된 me는 Person의 인스턴스로서 name 변수가 있고, getName()과 setName()함수가 있다.

위 코드는 문제가 많다. 정확히는 이 코드의 Person 함수의 구현이 바람직하지 못하다.

```jsx
var me = new Person("me");
var you = new Person("you");
var him = new Person("him");
```

이와 같이 객체를 생성하여 사용하면 겉으로는 별 문제 업이 동작하는걸 볼 수 있다.

하지만 각 객체는 자기 영역에서 공통적으로 사용할 수 있는 setName()함수와, getName()

함수를 따로 생성하고 있다.

이는 불필요하게 중복되는 영역을 메모리에 올려놓고 사용함을 의미하고 자원 낭비를 가져온다.

```jsx
function Person(arg) {
    this.name = arg;
}

Person.prototype.getName = function() {
    return this.name;
}

Person.prototype.setName = function(value) {
    this.name = value;
}

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());
```

이와 같이 Javascript에서 클래스 안의 메서드를 정의할 때는 프로토타입 객체에 정의한 후, new로 생성한 객체에서 접근할ㄹ 수 있게 하는 방법이 좋다.

더글라스 크락포드는 다음과 같은 함수를 제시하면서 메서드를 정의하는 방법을 소개한다.

```jsx
Function.prototype.method = function(name, func) {
    if( !this.prototype[name]){
        this.prototype[name] = 
    }
}
```

```jsx
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
}

function Person(arg) {
    this.name = arg;
}

Person.method("setName", function(value) {
    this.name = value;
});

Person.method("getName", function() {
    return this.name;
});

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());
```

// 큰 차이는 없는것 같은데, method라고 명시적으로 이름을 알리는 역할을 하는것 같다.

여기까지 객체지향 프로그래밍에서 제시하는 개념 중에서 클래스, 생성자, 메서드를 Javascript에서는 어떻게 구현할 수 있는지 살펴보았다.

참고)

더글라스 크락포드는 함수를 생성자로 사용하여 프로그래밍하는 것을 추천하지 않는다.

그 이유는 생성된 함수는 new로 호출될 수 있을 뿐만 아니라, 직접 호출도 가능하기 때문이다.

여기서 문제는 new로 호출될 때와 직접 호출될 떄의 this에 바인딩되는 객체가 달라진다는 것이다. (앞에서 이를 해결하는 법을 배우긴했음.)

하지만 이 장에서는 함수 생성자를 사용하지 않고, 객체지향 프로그래밍을 하는데 집중할 것임.

## 상속

Javascript는 클래스를 기반으로하는 전통적인 상속을 지원하지는 않는다.

하지만 Javascript 특성중 객체 프로토타입 체인을 이용하여 상속을 구현해 낼 수 있다.

이러한 상속의 구현 방식은 크게 두 가지로 구분할 수 있는데,

하나는 클래스 기반 전통적인 상속 방식을 흉내 내는 것이고,

다른 하나는 클래스 개념 없이 객체의 프로토타입으로 상속을 구현하는 방식이다.

`이를 프로토타입을 이용한 상속(Prototypal Inheritance)라고 정의한다.`

Java나 C++에 익숙한 개발자는 전통적인 상속의 형태가 익숙할 것이다.

클래스와 생성자 등의 개념이 들어가 있기 때문이다.

하지만 프로토타입을 이용한 상속은 객체 리터럴을 중심으로 철저히 프로토타입을 이용하여 상속을 구현해낸다.

이 책에서는 프로토타입을 이용한 상속을 먼저 소개하고, 클래스 기반의 상속을 소개하겠다.

### 프로토 타입을 이용한 상속

```jsx
function create_object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```

이 코드는 더글라스 크락포드가 Javascript 객체를 상속하는 방법으로 오래전에 소개한 코드이다.

조금 과장해서 말하면 이 세 줄의 코드를 이해하면 Javascript에서의 프로토타입 기반의 상속을 다 배운것이나 다름없다.

이 세 줄의 코드는 언뜻 보면 쉬워보이지만 이해하기 쉬운 코드는 아니다.

create_object()함수는 인자로 들어온 객체를 부모로 하는 자식 객체를 생성하여 반환한다.

이렇게 반환된 객체는 부모 객체의 프로퍼티에 접근할 수 있고, 자신만의 프로퍼티를 만들수도 있다.

이렇게 프로토타입의 특성을 활용하여 상속을 구현하는 것이 프로토타입 기반의 상속이다.

```jsx
var person = {
    name : "zzoon",
    getName : function() {
        return this.name;
    },
    setName : function(arg) {
        this.name = arg;
    }
};

function create_object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

var student = create_object(person);

student.setName("me");
console.log(student.getName()); // me
```

// create_object(person)을 호출하면, function F객체가 만들어진다. 그리고, F의 프로토타입에 내가 만들었던, person 객체가 그대로 들어가게 된다.

그리고 new 연산자로 F() 생성자 함수를 호출한다.

그렇게 되면 student 객체의 [[Prototype]]에 F 생성자 함수의 prototype 객체를 링크하면서 자연스럽게 상속받게 되는것이다. 

person 객체를 상속하여 student 객체를 만들었다.

클래스에 해당하는 생성자 함수를 만들지도 않았고, 그 클래스의 인스턴스를 따로 생성하지도 않았다.

단지 부모 객체에 해당하는 person 객체와 이 객체를 프로토타입 체인으로 참조할 수 있는 자식 객체 student를 만들어서 사용하였다.

이와 같은 방식으로 상속의 개념을 구현해낸 것이다.

![image-90.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91246557-ab8a-405f-aa56-b05fe8849cf2/image-90.jpg)

위는 부모 객체의 메서드를 그대로 상속받아 사용하는 방법을 살펴보았다.

여기에서 자식은 자신의 메서드를 재정의 혹은 추가로 기능을 더 확장시킬 수 있어야 한다.

단순히 앞과 같이 기능을 더 확장시킬 수는 있다.

하지만 이렇게 구현하면 코드가 지저분해지기 십상이다.

Javascript에서는 범용적으로 extend()라는 이름의 함수로 객체에 자신이 원하는 객체 혹은 함수를 추가시킨다.

- jQuery에서 extend() 구현을 살펴보자.

`// 이해가 안된다.` → 해결

// 내가 이해하지 못하는 이유는 obj, prop이 정확히 무슨 인자인지 모르기 때문이다. 아래에 구체적인 코드가 나온다.

```jsx
jQuery.extend = jQuery.fn.extend = function(obj, prop) {

    if( !prop ) {
        prop = obj;
        obj = this;
    }
    
    for ( var i in prop ) {
        obj[i] = prop[i];
    }
    
    return obj;
};
```

```jsx
jQuery.extend = jQuery.fn.extend = function(obj, prop) {...}
```

jQuery.fn은 jQuery.prototype이다.

따라서 앞 코드가 의미하는 바는 jQuery 함수 객체와 jQuery 함수 객체의 인스턴스 모두 extend 함수가 있겠다는 말이다.

즉, jQuery.extend()로 호출할 수도 있고,

var elem = new jQuery(); elem.extend();의 형태로도 호출할 수 있음을 뜻한다.

```jsx
if ( !prop ) { prop = obj; obj = this; }
```

이는 extend 함수의 인자가 하나만 들어오는 경우에는

현재 객체(this)에 인자로 들어오는 객체의 프로퍼티를 복사함을 의미하고,

두개가 들어오는 경우에는 첫번째 객체에 두번째 객체의 프로퍼티를 복사하겠다는 것을 뜻한다.

```jsx
for ( var i in prop ) obj[i] = prop[i];
```

루프를 돌면서 prop의 프로퍼티를 obj로 복사한다.

![image-91.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7dc2e47-6755-46e9-848e-ba9f49713cde/image-91.jpg)

이 코드에는 약점이 있다.

obj[i] = prop[i];는 얕은 복사를 의미한다.

문자 혹은 숫자 리터럴 등이 아닌 객체(배열, 함수객체 포함)인 경우 해당 객체를 복사하지 않고 참조한다.

이는 두 번째 객체의 프로퍼티가 변경되면 첫 번째 객체의 프로퍼티도 같이 변경됨을 의미한다.

이것을 의도해서 작성한 경우가 아니라면, 작성자가 의도하지 않은 결과가 나오고 이를 디버깅하는 것은 그렇게 쉬운일이 아니다.

그러므로 보통 extend 함수를 구현하는 경우 대상이 객체일 때는 깊은 복사를 하는것이 일반적이다.

참고 ) 깊은 복사를 하려면 복사하려는 대상이 객체인 경우 빈 객체를 만들어 extend 함수를 재귀적으로 다시 호출하는 방법을 쓴다.

또 한가지 주의할 점은 함수 객체인 경우는 그대로 얕은 복사를 진행한다는 것도 잊지 말자.

```jsx
for ( ; i< length; i++ ) {
// Only deal with non-null/undefined values

if( (options = arguments[i]) != null ) {
    // Extend the base object
    for( name in options ) {
        src = target[ name ];
        copy = options [ name ];
    }
    // Prevent never-ending loop
    if( target === copy) {
        continue;
    }
    
    // Recurse if we're merging plain objects or arrays
    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy) ) ) ) {
    if (copyIsArray) {
        copyIsArray = false;
        clone = src && jQuery.isArray(src) ? src : [];
        } else {
        clone = src && jQuery.isPlainObject(src) ? src : {} ;
        }
        // Never move original objects, clone them
        target[ name ] = jQuery.extend(deep, clone, copy);

    // Don't bring in undefined values
    } else if (copy !== undefined ) {
            target[ name ] = copy;
        }
    }
}
}
//Return the modified Objects;
return target;
}
```

extend()는 중요한 함수이다.

- 적용시킨 코드

```jsx
var person = {
    name : "zzoon",
    getName : function() {
        return this.name;
    },
    setName : function(arg) {
        this.name = arg;
    }
}

function create_object(o) {
    function F() {};
    F.property = o;
    return new F();
}

function extend(obj, prop) {
    if ( !prop ) { prop = obj ; obj = this; }
    for (var i in prop ) obj[i] = prop[i];
    return obj;
};

var student = create_object(person);
var added = {
    setAge : function(age) {
        this.age = age;
    },
    getAge : function() {
        return this.age;
    }
};

extend(student, added);

student.setAge(25);
console.log(student.getAge());
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e15e68b9-007c-4ac9-bf61-8389cd5277ff/Untitled.png)

// 우선에 이 코드를 이해하기 이전에, i에는 숫자만 들어갈 수 있다는 익숙함을 내려놓을 필요가 있다.

Javascript는 Python처럼 i에 변수명이 들어갈 수도 있다.

- 인자를 넣지 않은 경우.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46693c64-62e0-4885-94a0-cc505a88df82/Untitled.png)

person이 window객체에 들어가 있음을 확인할 수 있다.

window[property] = student[property]의 값으로 person 객체가 전달된 것이다.

### 클래스 기반의 상속

사실 클래스 기반의 상속이라고는하지만, 원리는 프로토타입을 이용한 상속에서 소개한 내용과 거의 같다.

앞 절처럼 함수의 프로토타입을 적절히 엮어서 상속을 구현해낸다.

앞에서는 객체 리터럴로 생성된 객체의 상속을 소개했지만, 여기서는 클래스의 역할을 하는 함수로 상속을 구현한다.

```jsx
function Person(arg) {
    this.name = arg;
}

Person.prototype.setName = function(value) {
    this.name = value;
};

Person.prototype.getName = function() {
    return this.name;
}

function Student(arg) {}

var you = new Person("iamhjoo");
Student.prototype = you;

var me = new Student("zzoon");
me.setName("zzoon");
console.log(me.getName());
```

앞 예제에서 Student 함수 객체를 만들어서, 이 함수 객체의 프로토타입으로 하여금 Person 함수 객체의 인스턴스를 참조하게 만들었다.

이렇게하면 Student 함수 객체로 생성된 객체 me의 [[Prototype]]링크가 생성자의 프로토타입 프로퍼티인 Student.prototype을 가리키고, new Person()으로 만들어진 객체의 [[Prototype]] 링크는 Person.prototype을 가리키는 프로토타입 체인이 형성된다.

따라서 객체 me는 Person.prototype 프로퍼티에 접근할 수 있고, setName()과 getName()을 호출할 수 있다.

![image-93.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ae3af2e1-b503-406e-bdaf-ff0da0eba8c2/image-93.jpg)

// 프로토타입 체이닝을 두 번 타고 들어가서 메서드에 접근한다.

그러나 위의 코드는 문제가 있다. 먼저 me 인스턴스를 생성할 떄 부모 클래스인 Person의 생성자를 호출하지 않는다.

```jsx
var me = new Student("zzoon");
```

이 코드로 me 인스턴스를 생성할 때 “zzoon”을 인자로 넘겼으나, 이를ㄹ 반영하는 코드는 어디에도 없다.

결국 생성된 me 객체는 빈 객체이다.

setName() 메서드가 호출되고 나서야 me 객체에 name 프로퍼티가 만들어진다.

이렇게 부모 생성자가 호출되지 않으면, 인스턴스의 초기화가 제대로 이루어지지 않아 문제가 발생할 수 있다.

이를 해결하려면 Student 함수에 다음 코드를 추가하여 부모 클래스의 생성자를 호출해야 한다.

```jsx
function Student(arg) {
    Person.apply(this, arguments);
}
```

Student 함수 안에서 새롭게 생성된 객체를 apply 함수의 첫 번째 인자로 넘겨 Person 함수를 실행시킨다.

이런 방식으로 자식 클래스의 인스턴스에 대해서도 부모 클래스의 생성자를 실행시킬 수 있다.

클래스 간의 상속에서 하위 클래스의 인스턴스를 생성할 때, 부모 클래스의 생성자를 호출해야 하는데, 이 경우에 필요한 방식이다.

여기서 조금만 더 발전시켜 보자. 현재는 자식 클래스의 객체가 부모 클래스의 객체를 프로토타입 체인으로 직접 접근한다.

하지만 부모 클래스의 인스턴스와 자식 클래스의 인스턴스는 서로 독립적일 필요가 있다.

![image-94.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/094d3d8e-b064-42dc-b895-0499f706da71/image-94.jpg)

두 클래스의 프로토 타입사이에 중개자를 하나 만들어보자.

```jsx
function Person(arg) {
    this.name = arg;
}

Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
}

Person.method("setName", function(value) {
    this.name = value;
});

Person.method("getName", function() {
    return this.name;
});

function Student(arg) {}

function F() {};
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;
Student.super = Person.prototype;

var me = new Student();
me.setName("zzoon");
console.log(me.getName());
```

위 코드의 프로토타입 체인 형성과정은 앞에서본 프로토타입을 이용한 상속 방식과 매우 유사하다.

어차피 함수의 프로토타입을 이요한 것이니 비슷할 수 밖에 없다.

여기에서도 빈 F()를 생성하고, 이 F()의 인스턴스를 Person.prototype과 Student 사이에 두었다.

그리고 이 인스턴스를 Student.prototype에 참조되게 한다.

![image-95.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3778dbcd-ab74-41c6-aa31-53db37cf5ab3/image-95.jpg)

그림에서 보는 바와 같이 빈 함수의 객체를 중간에 두어 Person의 인스턴스와 Student의 인스턴스를 서로 독립적으로 만들었다.

이제 Person 함수 객체에서 this에 바인딩 되는것은 Student의 인스턴스가 적급할 수 없다.

이 상속이 앞서 소개된 상속보다 좀 더 나은 코드이다.

Javascript Patterns의 저자 스토얀 스테파노프는 상속 관계를 즉시 실행함수와 클로저를 활용하여 최적화된 함수로 소개하였는데, 그 코드는 다음과 같다.

```jsx
var inherit = function(Parent, Child) {
    var F = function() {};
    return function(Parent, Child) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.super = Parent.prototype;
    };
}();
```

앞 코드에서 클러저는 F()함수를 지속적으로 참조하므로, F()는 가비지 컬렉션의 대상이 되지 않고 계속 남아있다.

이를 이요해 함수 F()의 생성은 단 한 번 이루어지고 inherit 함수가 계속해서 호출되어도 함수 F()의 생성을 새로 할 필요가 없다.

지금까지 Javascript로 구현하는 상속을 살펴보았다.

함수 생성자를 이용해 상속하는 방법이나, 객체 리터럴을 그대로 상속하는 방법은 프로토 타입 체인을 이용하는 원리는 같다.

이러한 원리만 제대로 파악하고 있다면 앞에서 소개된 방식 말고도 다른 여러가지 방법으로 상속을 구현할 수 있다.

## 캡슐화

C++ 이나, Java에서는 public, private 멤버를 선언함으로써 해당 정보를 외부로 노출시킬지 여부를 결정한다.

하지만 Javascript는 이러한 키워드 자체를 지원하지 않는다.

그렇다고 해서 Javascript에서 정보 은닉이 불가능한 것은 아니다.

```jsx
var Person = function(arg) {
    var name = arg ? arg : "zzoon";
    this.getName = function() {
        return name;
    }
    this.setName = function(arg) {
        name = arg;
    }
};

var me = new Person();
console.log(me.getName());
me.setName("iamhjoo");
console.log(me.getName());
console.log(me,name) // undefined
```

private 멤버로 name을 선언하고, public 메서드로 getName()과 setName()을 선언하였다.

앞서 배운 것 처럼 this 객체의 프로퍼티로 선언하면 외부에서 new 키워드로 생성한 객체로 접근할 수 있다.

하지만 var로 선언된 멤버들은 외부에서는 접근이 들가능하다.

그리고 public 메서드가 클로저 역할을 하면서 private 멤버인 name에 접근할 수 있다.

이것이 Javascript에서 할 수 있는 기본적인 정보은닉 방법이다.

```jsx
var Person = function(arg) {
    var name = arg ? arg : "zzoon";

    return {
        getName : function() {
            return name;
        }
        setName : function(arg) {
            name = arg;
        }
    };
}

var me = Person(); /* or var me = new Person(); */
console.log(me.getName());
```

위 코드는 Person 함수를 호출하여 객체를 반환받는다.

이 객체에 Person 함수의 private 멤버에 접근할 수 있는 메서드들이 담겨있다.

사용자는 반환받는 객체로 메서드를 호출할 수 있고, private 멤버에 접근할 수 있다.

이렇게 메서드가 담겨있는 객체를 반환하는 함수는 여러 유명 Javascript 라이브러리에서 쉽게 볼 수 있는 구조이다.

다만 주의할 점이 있다.

접근하는 private 멤버가 객체나 배열이면 얕은 복사로 참조만을 반환하므로 사용자가 이후 이를 쉽게 변경할 수 있다.

```jsx
var ArrCreate = function(arg) {
    var arr = [1,2,3];

    return {
        getArr : function() {
            return arr;
        }
    };
}

var obj = ArrCreate(); //or var me = new Person();
var arr = new obj.getArr();
arr.push(5);
console.log(obj.getArr()); // [1,2,3,5]
```

이와 같은 문제가 있으므로 프로그래머는 객체를 반환하는 경우 신중해야 한다.

보통의 경우, 객체를 반환하지 않고 객체의 주요 정보를 새로운 객체에 담아서 반환하는 방법을 많이 사용한다.

하지만 꼭 객체가 반환되어야 하는 경우에는 깊은 복사로 복사본을 만들어서 반환하는 방법을 사용하는 것이 좋다.

`다시 코드로 돌아가서 이 코드에서 사용자가 반환받은 객체는 Person 함수 객체의 프로토타입에는 접근할 수 없다는 단점이 있다.`

`이는 Person을 부모로 하는 프로토타입을 이용한 상속을 구현하기가 용이하지 않다는것을 의미한다.`

이를 보완하려면 객체를 반환하는 것이 아닌, 함수를 반환하는 것이 좋다.

```jsx
var Person = function(arg) {
    var name = arg ? arg : "zzoon";

    var Func = function() {}
    Func.prototype = {
        getName : function() {
            return name;
        },
        setName : function(arg) {
            name = arg;
        }
    };

    return Func;
}();

var me = new Person();
console.log(me.getName());
```

위 코드에서도 클로저를 활용하여 name에 접근할 수 없게 했다.

즉시 실행 함수에서 반환되는 Func이 클로저가 되고 이 함수가 참조하는 name 프로퍼티가 자유변수가 된다.

따라서 사용자는 name에 대한 접근이 불가능하다.

이와 같이 Javascript에서 캡슐화를 구현하는 방법 역시 다양하다.

실제로 여기서 소개된 패턴은 많은 Javascript 라이브러리에서 사용되고 있으므로, 이들을 잘 분석하고 장단점을 잘 구분할 수 있다면 본인이 작성하는 코드를 보다 더 효율적으로 만들 수 있다.

캡슐화에서 소개한 2번째에 해당하는 코드는 모듈 패턴이라고 불리는데, 꽤 유용한 패턴이다.

## 객체지향 프로그래밍 응용 예제

### 클래스의 기능을 가진 subClass 함수

프로토타입을 이용한 상속과 클래스 기반의 상속에서 소개한 내용을 바탕으로 기존 클래스와 같은 기능을 하는 Javascript 함수를 만들어보자

이 함수에서는 앞서 소개한 3가지를 활용해서 구현한다.

- 함수의 프로토타입 체인
- extend 함수
- 인스턴스를 생성할 때 생성자 호출(여기서는 생성자를 _init 함수로 정한다.)

- subClass 함수 구조

subClass는 상속받을 클래스에 넣을 변수 및 메서드가 담긴 객체를 인자로 받아 부모함수를 상속받는 자식 클래스를 만든다.

여기서 부모 함수 subClass() 함수를 호출할 때 this객체를 의미한다.

subClass는 상속받을 크래스에 넣을 변수 및 메서드가 담긴 객체를 인자로 받아 부모함수를 상속받는 자식 클래스를 만든다.

여기서 부모 함수는 subClass() 함수를 호출할 때 this 객체를 의미한다.

```jsx
var SuperClass = subClass(obj);
var SubClass = SuperClass.subClass(obj);
```

이처럼 SuperClass를 상속받는 subClass를 만들고자 할 때, SuperClass.subClass()의 형식으로 호출하게 구현한다.

참고로 최상위 클래스인 SuperClass는 Javascript의 Function을 상속받게 한다.

```jsx
function subClass(obj) {
    /* (1) 자식 클래스 (함수 객체) 생성 */
    /* (2) 생성자 호출 */
    /* (3) 프로토타입 체인을 활용한 상속 구현 */
    /* (4) obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가 */
    /* (5) 자식 함수 객체 반환 */
}
```

### 자식 클래스 생성 및 상속

```jsx
function subClass(obj) {
    ...
    var parent = this;
    var F = function() {};

    var child = function() {};

    /* 프로토타입 체이닝. */
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;
    ...
    return child;
}
```

자식 클래스는 child라는 이름의 함수 객체를 생성함으로써 만들어 졌다.

부모 클래스를 가리키는 parent는 this를 그대로 ㅊ마조한다ㅏ.

그리고 프로토타입 체인 구성은 클래스 기반 상속에서 서명된 방식을 그대로 사용하였으므로 설명을 생략하고 그림으로 대체한다.

![image-96.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/5dcb33b3-a7f9-45d1-81a5-867aeae230c2/image-96.jpg)

앞의 예제와 다른점은, child.parent_constructor에 부모의 생서자를 참조시켰다는 점이다.

### 자식 클래스 확장

이제 사용자가 인자로 넣은 객체를 자식 클래스에 넣어 자식 클래스를 확장할 차례이다.

```jsx
for ( var i in obj ) {
    if (obj.hasOwnProperty(i)) {
        child.prototype[i] = obj[i];
    }
}
```

앞 코드에서 살펴본 extend() 함수의 역할을 하는 코드를 넣었다.

여기서는 간단히 얕은 복사로 객체의 프로퍼티를 복사하는 방식을 택했다.

- hasOwnProperty() 에 대해서

`hasOwnProperty()는 프로퍼티를 찾을 때, 다음 예제와 같이 프로토타입 체인을 타고 올라가지 않고 객체 내에서만 찾는다는것에 유의해야 한다.`

```jsx
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop'); // true;
o.hasOwnProperty('toString');  // false
o.hasOwnProperty('hasOwnProperty'); // false
```

### 생성자 호출

클래스의 인스턴스가 생성될 때, 클래스 내에 정의된 생성자가 호출돼야 한다.

물론 부모 클래스의 생성자 역시 호출되어야 한다.

이를 자식 클래스 안에 구현하자.

이 역시 클래스 기반의 상속에서 언급되었으므로 설명은 코드로 대체한다.

```jsx
var child = function() {
    if (parent._init) {
        parent._init.apply(this, arguments);
    }
    if (child.prototype._init) {
        child.prototype._init.apply(this, arguments);
    }
}
```

이제 생성자 호출이 완성된 듯 보인다.

하지만 안타깝게도 한가지를 더 고려해야 한다.

앞 코드는 단순히 부모와 자식이 한 쌍을 이루었을 때만 제대로 동작한다.

자식을 또 다른 함수가 다시 상속받았을 때는 어떻게 될 것인가?

`// 전혀 이해가 안된다. 상속은 현재 중요하지 않으므로 우선 그냥 넘어간다.`

```jsx
var SuperClass = subClass();
var SubClass = SuperClass.subClass();
var Sub_SubClass = SubClass.subClass();

var instance = new Sub_SubClass();
```

이 코드에서 instance를 생성할 때, 그 상위 클래스의 상위 클래스인 SuperClass의 생성자가 호출이 되지 않는다.

따라서 부모 클래스의 생성자를 호출하는 코드는 재귀적으로 구현할 필요가 있다.

이미 child.parent_construcotr에 부모의 생성자 함수를 참조 시켜 놓았으므로 구현에 문제가 없다.

```jsx
var child = function() {
    var _parent = child.parent_constructor;
    
    if (_parent && _parent !== Function) {
        //현재 클래스의 부모 생성자가 있으면 그 함수를 호출한다.
        //다만 부모가 Function인 경우는 최상위 클래스에 도달했으므로
        //실행하지 않는다.
        _parent.apply(this, arguments); //부모 함수의 재귀적 호출
    }

    if (child.prototype.hasOwnProperty("_init")) {
        child.prototype._init.apply(this, arguments);
    }
};
```

### subClass 보완

parent를 단순히 this.prototype으로 지정해서는 안된다.

우리는 처음에 최상위 클래스를 Fucntion을 상속받는 것으로 정했는데,
현재 코드에는 이를 처리하는 코드가 없다.

따라서 parent = this;를 다음과 같이 바꿔야한다.

```jsx
if (this === window) {
    var parent = Function;
} else {
    var parent = this;
}
// 더 짧게 표현하면 아래와 같이 만들 수 있다.

var parent = this === window ? Function : this;
//Node.js는 global을 사용한다.
```

또하나 빠진 부분이 있다.

subClass 안에서 생성하는 자식 클래스의 역할을 하는 함수는 subClass함수가 있어야 한다.

```jsx
child.subClass = arguments.callee;
```

arguments.callee는 현재 호출된 함수를 의미하는데, 현재 호출된 함수가 subClass이므로 child.subClass는 subClass 함수를 참조한다.

```jsx
function subClass(obj) {
    var parent = this === window ? Function : this;
    var F = function() {};

    var child = function() {
        var _parent = child.parent;
        
        if (_parent && _parent !== Function) {
            _parent.apply(this, arguments);
        }

        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    }

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent;
    child.subClass = arguments.callee;

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            child.prototype[i] = obj[i];
        }
    }
    return child;
}
```

### subClass 활용

구체적인 예제를 만들어보자.

```jsx
var person_obj = {
    _init : function() {
        console.log("person init");
    },
    getName : function() {
        return this.name;
    },
    setName : function(name) {
        this.name = name;
    }
};

var student_obj = {
    _init : function() {
        console.log("student init");  
    },
    getName : function() {
        return "Student Name: " + this.name;
    }
};

var Person = subClass(person_obj); //Person 클래스 정의
var person = new Person();
person.setName("zzoon");
console.log(person.getName()); // zzoon

var Student = Person.subClass(student_obj); //Student 클래스 정의
var student = new Student(); // person init, student init 출력
student.setName("iamhjoo");
console.log(student.getName()); //Student Name : iamhjoo
console.log(Person.toString()); //Person이 Function을 상속받는지 확인
```

이 부분을 주의깊게 보자.

- 생성자 함수가 호출되는가?
- 부모의 메서드가 자식 인스턴스에서 호출되는가?
- 자식 클래스가 확장 가능한가?
- 최상위 클래스인 Person은 Function을 상속받는가?

### subClass 함수에 클로저 적용

마지막으로 subClass 함수에 클로저를 적용해보자.

subClass 함수에서 왠지 눈에 거슬리는 코드가 있다.

그것은 프로토타입 체이닝하려고 만든 임시 함수 객체 F이다.

```jsx
var F = function() {};
```

이 함수 객체는 subClass함수가 호출될 때마다 생성된다.

클로저로 단 한번만 생성되게 수정해보자.

```jsx
var subClass = function() {
    var F = function() {};
    var subClass = function(obj) {
        ...
    }

    return subClass;
}();
```

즉시 실행함수로 새로운 컨텍스트를 만들어서 F() 함수 객체를 생성하였다.

그리고 이 F() 함수 객체를 참조하는 안쪽의 subClass()함수를 반환받는다. 이렇게하면 F()함수 객체는 클로저에 엮여서 가비지 컬렉션의 대상이 되지않고, subClass()함수를 호출할 때마다 사용된다.

### subClass 함수와 모듈 패턴을 이용한 객체지향 프로그래밍

모듈패턴은 객체지향 프로그래밍과 큰 관계가 없어 보인다.

하지만 캡슐화의 중요한 개념인 정보은닉을 하려면 모듈 패턴은 상당히 유용하다.

이 절에서는 모듈 패턴으로 캡슐화를 구현하여, 앞 절에서 소개한 subClass() 함수로 상속을 구현하는 방법을 설명한다.

```jsx
var person = function(arg) {
    var name = undefined;
    return {
        _init : function(arg) {
            name = arg ? arg : "zzoon";
        },
        getName : function() {
            return name;
        },
        setName : function() {
            name = arg
        }
    };
}

Person = subClass(person());
var iamhjoo = new Person("iamhjoo");
console.log("iamhjoo.getName()");

Student = Person.subClass();
var student = new Student("student");
console.log(student.getName());
```

person 함수 객체는 name의 정보를 캡슐화시킨 객체를 반환받는 역할을 한다.

이렇게 반환받은 객체는 subClass()함수의 인자로 들어가 클래스의 역할을 하는 Person 함수 객체를 완성시킬 수 있다.

이제 Person 함수 객체를 활용하여 상속을 구현할 룻 있다.

지금까지 Javascript를 이용하여 객체지향적인 프로그래밍을 할 수 있는 여가지 방법을 살펴보았다.

사실 Javascript의 객체지향적인 구현을 기존의 전통적인 방식에 맞추는 건 잘못된 판단이다.

객체지향 프로그래밍 자체가 재사용성 및 유지보수의 용이성을 높이려고 끊임없이 연구되어 왔다.

Javascript 역시 이러한 목적을 달성하려는 Javascript만의 특성이 있으므로 이를 잘 활용하여 기존의 틀에 얽매이지 않는다면 보다 효율적인 프로그래밍을 할 수 있다.

# 함수형 프로그래밍

함수형 프로그래밍은 오랫동안 학문적으로 연구되었고 함수형 프로그래밍 언어 역시 역사가 깊다.

Javascript로 함수형 프로그래밍에서 제시하는 방법론 중 일부는 구현 가능하지만 순수한 함수형 프로그래밍 언어라고 말하지는 않는다. (Haskell 이나 Lisp 같은 언어를 찾아보자.)

## 함수형 프로그래밍의 개념

함수형 프로그래밍은 함수의 조합으로 작업을 수행함을 의미한다.

중요한 것은 이 작업이 이루어지는 동안 작업에 필요한 데이터와 상태는 변하지 않는다는 점이다.

변할 수 있는건 오로지 함수 뿐이다.

이 함수가 바로 연산의 대상이 된다.

기존 프로그래밍 방식에 익숙한 독자라면 이를 이해하기란 쉽지 않다.

ex)

```jsx
f1 = encrypt1;
f2 = encrypt2;
f3 = encrypt3;

```

여기서 f1, f2, f3는 입력값이 정해지지 않고, 서로 다른 암호화 알고리즘만 있다.

```jsx
pure_value = 'zzoon';
encrypted_value = get_encrypted(x);
```

pure_value는 암호화할 문자열이고, encrypted_value는 암호화된 문자열이다.

get_encrypted()는 암호화 함수를 받아서 입력받은 함수로 pure_value를 암호화한 후 반환한다.

```jsx
encrypted_value = get_encrypted(f1);
encrypted_value = get_encrypted(f2);
encrypted_value = get_encrypted(f3);
```

![image-97.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/0075b6ee-ab3e-4b03-b64d-91e29137f1e6/image-97.jpg)

여기서 pure_value는 작업에 필요한 데이터고 작업이 수행되는 동안 변하지 않는다.

get_encrypted()가 작업하는 동안 변할 수 있는 것은 오로지 입력으로 들어오는 함수 뿐이다.

이를 반대로 이야기하면 f1, f2, f3는 외부에 (여기서는 zzoon이라는 변수)에 아무런 영향을 미치지 않는 함수라고 할 수 있다.

`이를 순수 함수 Pure function라고 정의한다.`

외부에 영향을 미치지 않으므로 이미 작성된 순수 함수로 다른 작업에 활용해도 문제가 없다.

또, get_encrypted() 함수도 주목해야 한다.

get_encrypted 함수는 인자로서 f1, f2, f3함수를 받는다. 

그리고 이 예에서는 결과값이 encrypted_value라는 값이지만 결과 값을 또 다른 형태의 함수로서 반환할 수도 있다.

`이렇게 함수를 또 하나의 값으로 간주하여 함수의 인자 혹은 반환 값으로 사용할 수 있는 함수를 고계함수(Higher-order Function)이라고 정의한다.`

이 예시에서 프로그래머는 입력으로 넣을 암호화 함수를 새롭게 만드는 방식으로 암호화 방법을 개선할 수 있다.

이와 같이 내부 데이터 및 상태는 그대로 둔 채 제어할 함수를 변경 및 조합함으로써 원하는 결과를 얻어내는 것이 함수형 프로그래밍의 중요한 특성이다.

`이 특성은 높은 수준의 모듈화가 가능하다는 점에서 큰 장점이 된다.`

`순수 함수의 조건을 충족하는 함수구현으로 모듈 집약적인 프로그래밍이 가능하다.`

참고)

함수형 프로그래밍의 반대되는 개념을 명령형 프로그래밍(Imperative Programming) 이라고 한다.

우리가 C등의 언어로 구현했던 방식이 대부분 이 프로그래밍 방식이다.

명령형 프로그래밍의 함수는 함수형 프로그래밍 언어 함수 처럼 입력값을 받고 출력값을 계산하는 순수한 의미의 함수도 있지만, 특정 작업을 수행하는 여러가지 명령이 기술되어 있는 함수도 있다.

이러한 종류의 함수를 프로시저(Procedure)라고 정의한다.

프로시저는 함수형 프로그래밍의 순수 함수와는 목적 자체가 다르다.

ex)

```jsx
int ret = printf("print this to screen \n");
```

printf 함수 역시 입력값과 결과값(반환값)이 있다.

`하지만 중요한 것은 결과값이 아니라, printf 함수가 실행되면서 입력값을 화면에 출력하는 동작이 중요하다.`

결과값은 이 동작이 제대로 수행되었는지를 알려주는 보조적인 역할을 한다.

`실제로 printf 결과값을 받아서 처리하는 코드 자체가 없는 경우도 많다.`

명령형 프로그래밍 함수는 이처럼 특정 작업의 순차적인 명령을 기술하는 데 중점을 둔다.

이러한 개념은 함수형 프로그래밍에서 말하는 순수 함수와는 거리가 멀다.

앞서 설명한 대로 `함수형 프로그래밍 함수는 순수 함수로서 외부에 아무런 영향을 주지 않는 선에서 자신의 로직을 처리하여 결과를 반환하는 역할을 한다.`

`이 결과값을 얻는 것이 이 함수를 호출한 목적이고, 결과값으로 또 다른 작업을 처리하게 된다.`

## Javascript에서의 함수형 프로그래밍

Javascript에서도 함수형 프로그래밍이 가능하다.

그 이유는 Javascript가 일급 객체로서의 함수와 클로저를 지원하기 때문이다.

```jsx
var f1 = function(input) {
    var result;
    /* 암호화 작업 수행 */
    result = 1;
    return result;
}

var f2 = function(input) {
    var result;
    /* 암호화 작업 수행 */
    result = 2;
    return result;
}

var f3 = function(input) {
    var result;
    reuslt = 3;
    return result;
}

var get_encrypted = function(func) {
    var str = 'zzoon';
    return function() {
        return func.call(null, str);
    }
}

var encrypted_value = get_encrypted(f1)();
console.log(encrypted_value);

var encrytped_value = get_encrypted(f2)();
console.log(encrypted_value);

var encrytped_value = get_encrypted(f2)();
console.log(encrypted_value);
```

pseudo 코드를 구현할 수 있다.

이것이 가능한 이유는 앞서 언급한 대로 함수가 일급 객체로 취급되기 때문이다.

그래서 함수의 인자로 함수를 넘기고, 결과로 함수를 반환할 수도 있다.

게다가 변수 str 값이 영향을 받지 않게 하려고 클로저를 사용하였다.

위 코드에서 get_encrypted() 함수에서 반환하는 익명함수가 클로저이다.

`이 클로저에서 접근하는 변수 str은 외부에서는 접근할 수 없으므로 클로저로 함수형 프로그래밍의 개념을 정확히 구현해낼 수 있다.`

Javascript를 이용해서 간단한 수학 문제를 함수형 프로그래밍 방식으로 코드를 작성하는 방법을 알아보자.

### 배열의 각 원소 총합 구하기

```jsx
function sum(arr) {
    var len = arr.length;
    var i = 0, sum = 0;
    for (; i < len; i++){
        sum += arr[i];
    }

    return sum;
}

var arr = [1,2,3,4];
console.log(sum(arr));
```

곱하기를 하고 싶다면?

```jsx
function multiply(arr) {
    var len = arr.length;
    var i = 0, result = 1;

    for (; i < len ; i++) {
        result *= arr[i];
    }

    return result;
}

var arr = [1, 2, 3, 4];

console.log(multiply(arr)); // 24
```

위는 Javascript 명령형 프로그래밍 방식으로 작성된 코드이다.

문제 하나하나를 각각의 함수를 구현하여 문제를 풀고 있다.

배열의 각 원소를 또 다른 방식으로 산술하여 결과값을 얻으려면 새로운 함수를 다시 구현해야 한다.

하지만 함수형 프로그래밍을 이용하면 이러한 수고를 덜 수 있다.

```jsx
function reduce(func, arr, memo) {
    var len = arr.length,
        i = 0,
        accum = memo;

    for (; i < len; i++) {
        accum = func(accum, arr[i])
    }

    return accum;
}
```

reduce() 함수는 함수와 배열을 인자로 넘겨받고 루프를 돌면서 함수를 실행시킨다.

함수를 실행시킨 후 얻은 결과값은 변수 accum에 계속해서 저장한다.

이 작업을 배열의 원소 개수만큼 루프를 돌면서 수행한다.

사용자는 reduce() 함수의 인자로 들어가는 함수를 직접 정의할 수 있다.

```jsx
var arr = [1,2,3,4];

var sum = function(x, y) {
    return x+y;
};

var mulitply = function(x, y) {
    return x*y;
};

console.log(reduce(sum, arr, 0));
console.log(reduce(multiply, arr, 1));
```

![image-98.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/1c9833e7-9581-41c6-94fa-8a37e47cd9b7/image-98.jpg)

위에서 보는 바와 같이 함수형 프로그래밍을 이용하여 코드를 훨씬 간결하게 작성할 수 있다.

또한 다른 문제가 나오더라도 사용자가 해당 연산을 하는 함수를 작성하여 reduce() 함수로 결과를 얻을 수도 있다. 

앞에 소개된 reduce()함수는 Javascript에서 범용적으로 사용되는 함수로서 각 배열ㄹ의 요소를 처음부터 하나씩 뽑아서 연산에 사용하여 최종 결과값을 도출하는 함수이다.

- 팩토리얼

- 명령형 프로그래밍 방식

```jsx
function fact(num) {
    var val = 1;
    for (var i = 2; i <= num; i++)
        val = val * i;
    return val;
}

console.log(fact(100));
```

- 재귀 호출 방식

```jsx
function fact(num) {
    if ( num == 0 ) return 1;
    else return num * fact(num - 1);
}

console.log(fact(100));
```

```jsx
var fact = function() {
    var cache = {'0' : 1};
    var func = function(n) {
        var result = 0;

        if (typeof(cache[n])  === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = n * func(n-1);
        }

        return result;
    }

    return func;
}();

console.log(fact(10));
console.log(fact(20));
```

fact는 cache에 접근할 수 있는 클로저를 반환받는다.

클로저로 숨겨지는 cache에는 팩토리얼을 연산한 값을 저장하고 있다.

연산을 수행하는 과정에서 캐시에 저장된 값이 있으면 곧바로 그 값을 반환하는 방식이다.

이렇게 하면 한 번 연산된 값을 캐시에 저장하고 있으므로, 중복된 연산을 피하여 보다 나은 성능의 함수를 구현할 수 있다.

### 메모이제이션 패턴

```jsx
function Calculate(key, input, func) {
    Calculate.data = Calculate.data || {};
    if (!Calculate.data[key]) {
        var result;
        result = func(input);
        Calculate.data[key] = result;
    }

    return Calculate.data[key];
}

var result = Calculate(1, 5, function(input) {
    return input * input;
});

console.log(result);

result = Calculate(2, 5, function(input) {
    return input * input / 4;
});

console.log(result);

console.log(Calculate(1));
console.log(Calculate(2));
```

예제에서 보는 바와 같이 함수 Calculate() 프로퍼티에 data 프로퍼티를 만들어 객체를 할당하였다.

이곳에 사용자는 자신이 원하는 값을 원하는 키로 저장해 놓을 수 있다.

일단 한번 계산이 된 값이 들어가면 그 이후에는 해당 키로 저장해놓을 수 있다.

일단 한 번 계산된 값이 들어가면 그 이후에는 해당 키로 저장해 놓은 값을 받아서 사용할 수 있다.

일종의 캐시 역할을 한다.

jQuery에서는 data()라는 메서드로 이 메모이제이션 패턴을 사용하였다.

```jsx
data : function( elem, name, data ) {
    var id = elem[expando];
}

if ( name && !jQuery.cache[id])
    jQuery.cache[id] = {};
if ( data != undefined )
    jQuery.cache[id][name] = data;
    return name ? jQuery.cache[id][name] : id;
},
```

```jsx
Function.prototype.memoization = function(key) {
    var arg = Array.prototype.slice.call( arguments, 1);
    this.data = this.data || {};

    return this.data[key] !== undefined ?
        this.data[key] : this.data[key] = this.apply(this, arg);
}

function myCalculate1(input) {
    return input * input;
}

function myCalcualte2(input) {
    return input * input / 4;
}

myCalculate1.memoization(1, 5);
myCalculate1.memoization(2, 4);
myCalculate2.memoization(1, 6);
myCalculate2.memoization(2, 7);

console.log(myCalculate1.memoization(1)); // equal to
console.log(myCalculate1.data[1]);

console.log(myCalculate1.memoization(2)); // equal to
console.log(myCalculate1.data[2]);

console.log(myCalculate1.memoization(2)); // equal to
console.log(myCalculate1.data[2]);

console.log(myCalculate1.memoization(2)); // equal to
console.log(myCalculate1.data[2]);
```

Functino.prototype에 메서드를 정의해 놓으면 특정 값을 리턴하는 모든 함수에서 유용하게 사용될 수 있다.

주의할 점은 한번 값이 들어간 경우 계속 유지되므로 이를 초기화하는 방법 역시 제공돼야 한다는 것이다.

jQuery에서는 cleanData라는 메서드를 제공하여 이 같은 작업을 수행한다.

### 피보나치 수열

```jsx
var fibo = function() {
    var cache = {'0' : 0, '1' : 1};

    var func = function(n) {
        if (typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n-1) + func(n-2);
        }
        
        return result;
    }

    return func;
}();

console.log(fibo(10));
```

클로저를 이용하여 cache를 캐시로 활용한다는 것이 똑같다.

다른 점은 cache의 초깃값과 함수를 재귀 호출할 때 산술식이 다르다는 것이다.

```jsx
var cacher = function(cache, func) {
    var calculate = function(n) {
        if (typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n-1) + func(n-2);
        }

        return result;
    }

    return calculate;
};
```

```jsx
var fact = cacher({'0': 1}, function(func, n) {
    return n * func(n-1);
});

var fibo = cacher({'0':0, '1':1}, function(func, n){
    return func(n-1) + func(n-2);
});

console.log(fact(10));
console.log(fibo(10));
```

함수형 프로그래밍이 수학에서 출발한 문제 해결 방법론이므로 이러한 수학 문제를 프로그래밍으로 해결하는데 있어서 상당한 이득을 볼 수 있다.

## Javascript에서 함수형 프로그래밍을 활용한 주요 함수.

함수형 프로그래밍 언어로 개발한다고 하더라도, 함수형 프로그래밍의 장점을 극대화하는 구현을 해내기는 쉽지 않다.

그것은 이미 기존 프로그래밍 방식에 물들어져 있기 때문 일 것이다.

### 함수 적용

앞서 Function.prototype.apply 함수로 함수 호출을 수행할 수 있음을 배웠다.

그런데 왜 이름이 apply일까?

함수를 호출할 때 call이라는 용어만을 주로 사용해 온 개발자에겐 다소 생소하게 느껴질 수 있다.

함수 적용 Applying Functions는 함수형 프로그래밍에서 사용되는 용어다.

함수형 프로그래밍에서는 특정 데이터를 여러가지 함수를 적용시키는 방식으로 작업을 수행한다.

`여기서 함수는 단순히 입력을 넣고 출력을 받는 기능을 수행하는 것 뿐만 아니라, 인자 혹은 반환값으로 전달된 함수를 특정 데이터에 적용시키는 개념으로 이해해야 한다.`

그래서 Javascript에서도 함수를 호출하는 역할을 하는 메서드를 Apply라고 이름 짓게 된 것이다.

`따라서 func.apply(Obj, Args)와 같은 함수 호출을 func 함수를 “Obj객체와 Args에 적용시킨다”라고 표현할 수 있다.`

### 커링

커링이란 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 나머지를 인자로 받는 새로운 함수를 만드는 것을 의미한다.

```jsx
function calculate(a, b, c) {
    return a * b + c;
}

function curry(func) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

var new_func1 = curry(calculate, 1);
console.log(new_func1(2,3)); // 5 // 1 * 2 + 3 = 5
var new_func2 = curry(calculate, 1, 3);
console.log(new_func2(3)); // 6
```

![image-99.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/52958453-666b-46dd-8c04-d535f8c1c472/image-99.jpg)

- 커링 활용 예제
    
    ```jsx
    function add(num1, num2) {
        console.log(num1 + num2);
    }
    
    add(5, 8); // 13
    ```
    
    ```jsx
    function add(num1, num2) {
        return num1 + num2;
    }
    
    // add() 함수를 return 하는 또 다른 함수를 return
    function addPlus(num1) {
        return function(num2) {
            console.log(add(num1, num2))
        }
    }
    ```
    
    ```jsx
    // 화살표 함수로 표현
    addPlus = num1 => num2 => console.log(add(num1, num2));
    
    // 출력 (파라미터를 하나씩)
    addPlus(5)(4);
    ```
    
    ```jsx
    function phoneNum(first, tel) {
        console.log(first + tel);
    }
    
    phoneNum(01001230505); // 01001230505
    phoneNum(01005253433); // 01005253433
    ```
    
    ```jsx
    function phoneNum(first, tel) {
        console.log(first + tel);
    }
    
    const phoneNumber = first => number => phoneNum(first, number);
    const phoneNumber010 = phoneNumber('010');
    
    phoneNumber010(01230505); // 01001230505
    phoneNumber010(05253433); // 01005253433
    ```
    

- 첫번째 인자와 세번째 인자를 고정하고 싶다면?

```jsx
function calculate(a, b, c) {
    return a * b + c;
}

function curry2(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function() {
        var arg_idx = 0;
        for(var i = 0; i < args.length && arg_idx < arguments.length; i++)
            if( args[i] === undefined )
                args[i] = arguments[arg_idx++];
        return func.apply(null, args);
    }
}

var new_func = curry2(calculate, 1, undefined, 4);
console.log(new_func(3));
```

주의점은 curry2를 호출할 때 calculate() 함수가 원하는 인자를 전부 넣어야 한다.

그중에서 고정시키지 않을 인자를 undefined로 넘기면 된다.

curry2()에서는 curry2()를 호출할 때 넘어온 인자로 루프를 돌면서 undefined인 요소를 새로운 함수를 호출할 때 넘어온 인자로 대체한다.

이와 같이 함수를 부분적으로 적용하여 새로운 함수를 반환받는 방식을 함수의 부분 적용(Partially Applying Functions) 라고 한다.

그리고 함수의 부분 적용을 가장 잘 구현한 예제가 curry() 메서드이다.

### bind

```jsx
Function.prototype.bind = function(thisArg) {
    var fn = this,
    slice = Array.prototype.slice,
    args = slice.call(arguments, 1);
    return function () {
        return fn.apply(thisArg, args.concat(slice.call(arguments)));
    };
}
```

//인자도 모두 옮겨지는 함수이다.

bind 함수 또한 커링 기법을 활용한 함수이다.

커링을 이해했다면, bind() 함수역시 이해하기 쉬울 것이다.

커링과 같이 사용자가 고정시키고자 하는 인자를 bind() 함수를 호출할 때 인자로 넘겨주고 반환받은 함수를 호출흐면서 나머지 가변인자를 넣어줄 수 있다.

curry() 함수와 다른 점은 함수를 호출할 때 this에 바인딩 시킬 객체를 사용자가 넣어줄 수 있다는 점이다.

curry() 함수가 Javascript 엔진에 내장되지 않은 것도 이 bind() 함수로 충분히 커버가능하기 떄문일 것이다.

```jsx
var print_all = function(arg) {
    for (var i in this) console.log(i + " : " + this[i]);
    for (var i in arguments) console.log(i + " : " + arguments[i]);
}

var myobj = { name : "zzoon"};

var myfunc = print_all.bind(myobj);
myfunc(); // "name : zzoon"

var myfunc1 = print_all.bind(myobj, "iamhjoo", "others");
myfunc1("insidejs");

/*
name : zzoon
```

![image-101.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/b12cb5a8-adba-40b1-8ec6-c052a93876da/image-101.jpg)

myfunc() 함수는 myobj 객체를 this에 바인딩시켜 print_all() 함수를 실행하는 새로운 함수이다.

한발 더 나아가서 my-func1()을 실행하면 인자도 bind() 함수에 모두 넘겨진다.

`bind() 함수로 반환받은 함수는 바인딩한 함수를 상속하는 기능까지 제공한다.`

자세한건 Function.prototype.bind함수를 찾아보자.

### 래퍼 (Wrapper)

특정 함수를 자신의 함수로 덮어쓰는 것을 말한다.

사용자는 원래 함수 기능을 잃어버리지 않은 상태로 자신의 로직을 수행할 수 있어야 한다.

객체지향 프로그래밍에서 다형성의 특성을 살리려면 오버라이드를 지원하는데, 이와 상당히 유사하다고 보면 된다.

```jsx
function wrap(object, method, wrapper) {
    var fn = object[method];
    return object[method] = function() {
        return wrapper.apply(this, [fn].concat(Array.prototype.slice.call(arguments)));
    };
}

Function.prototype.original = function(value) {
    this.value = value;
    console.log("value : " + this.value);
}

var mywrap = wrap(Function.prototype, "original",function(orig_func, value) {
    this.value = 20;
    orig.func(value);
    console.log("wrapper value :  " + this.value);
});

mywrap("zzoon");
```

//뭐라는지 모르겠다. 나중에 다시오자. [fn]이 클로저를 절묘하게 사용한거라는데, 그냥 fn을 해도되지 않나 생각이든다. 뭐라는지 잘 모르겠다. 나중에 다시오자.

래퍼는 기존에 제공되는 함수에서 사용자가 원하는 로직을 추가하고 싶다거나, 기존에 있는 버그를 피해가고자 할 때 많이 사용된다.

특히, 특정 플랫폼에서 버그를 발생시키는 함수가 있을 경우 이를 컨트롤 할 수 있으므로 상당히 용이하다.

### 반복함수

Javascript에서는 함수형 프로그래밍 특성을 활용하여 매우 유용하게 사용될 수 있으므로 잘 기억해두자.

each()함수는 배열의 각 요소 혹은 객체의 각 프로퍼티를 하나씩 꺼내서 차례대로 특정 함수에 인자로 넣어 실행시키는 역할을 한다.

대부분 라이브러리에 기본적으로 구현되어 있는 함수이다.

보통 each, forEach라는 이름으로 제공된다.

```jsx
function each( obj, fn , arg ) {
    if (obj.length == undefined)
        for ( var i in obj )
            fn.apply( obj[i], args || [i, obj[i]]);
    else
        for ( var i = 0; i < obj.length; i++ )
            fn.apply( obj[i], args || [i, obj[i]]);
    return obj;
};

each([1,2,3], function(idx, num) {
    console.log(idx + " : " + num)
});

var zzoon = {
    name : "zzoon",
    age : 30,
    sex : "Male"
};

each(zzoon, function(idx, value) {
    console.log(idx + " : " + value);
});
```

obj에 length가 있는 경우(보통 배열)와 없는 경우(보통의 경우 객체)로 나누어서, 루프를 돌면서 요소를 인자로하여 차례대로 함수를 호출한다.

Javascript에서도 앞과 같은 방법으로 정의하여 사용될 수 있음을 알아두자.

다만, each() 함수에서 사용자 함수를 호출할 때 넘기는 인자의 순서나 구성이 라이브러리에 따라 다를 수 있으므로 이점만 주의하자.

### map

map()은 주로 배열에 많이 사용되는 함수이다.

배열의 각 요소를 꺼내서 사용자 정의 함수를 적용시켜 새로운 값을 얻은 후, 새로운 배열에 넣는다.

```jsx
Array.prototype.map = function(callback) {
    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for( var i = 0; i < obj.length ; i++ ) {
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }

    return A;
}

var arr = [1,2,3];
var new_arr = arr.map(function(value) {
    return value * value;
}
```

### reduce

reduce()는 배열의 각 요소를 하나씩 꺼내서 사용자의 함수를 적용시킨 뒤, 그값을 계속해서 누적시키는 함수이다.

```jsx
Array.prototype.reduce = function(callback, memo) {
    var obj = this;
    var value, accumulated_value = 0;

    for( var i = 0; i < obj.length; i++ ) {
        value = obj[i];
        accumulated_value = callback.call(null, accumulated_value, value);
    }

    return accumulated_value;
    };

var arr = [1,2,3];
var accmulated_val = arr.reduce(function(a, b)) {
    return a + b * b;
});
}

console.log(accumulated_val); // 1*1 + 2*2 + 3*3 = 14

```

# jQuery 소스 코드 분석

오픈소스를 제대로 분석하려면 무엇보다 전체적인 구조를 잘 파악할 필요가 있다.

그래서 대략적인 모듈과 모듈 간 인터페이스 등을 어느 정도 파악하는 것이 결국엔 소스의 정확한 소스 동작 원리를 파악할 수 있게 하는 밑거름이 된다.

## jQuery 함수 객체

```jsx
function jQuery(a, c) {
    if ( a && a.constructor == Function && jQuery.fn.ready )
        return jQuery(document).ready(a);

    a = a || jQuery.context || document;

    if ( a.jquery )
        return $( jQuery.merge( a, [] ) );

    if ( c && c.jquery )
        return $( c ).find(a);

    if (window == this )
        return new jQuery(a,c);

    var m = /^[^<]&(<.+>)[^>]*$/.exec(a);
    if ( m ) a = jQuery.clean( [ m[1] ] );
    
    this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
    jQuery.merge(a, []  :
    jQuery. find(a, c) );

    var fn = arguments[arguments.length - 1];

    if (fn && fn.constructor == Function )
        this.each(fn);
}
```

### 변수 $를 jQuery() 함수로 매핑

일반적으로 개발자들이 jQuery를 사용할 때 jQuery() 함수를 직접 호출하기보다는

$()와 같은 형태로 jQuery의 기능을 호출하는 것이 대부분이다.

이것이 가능한 이유가 다음과 같이 바로 jQuery 함수를 $ 변수에 매핑시켰기 때문이다.

```jsx
var $ = jQuery;
```

### jQuery.prototype 객체 변경

prototype 프로퍼티에서 설명했든 모든 함수 객체는 prototype 프로퍼티가 있다.

특히, prototype 프로퍼티가 가리키는 프로토타입 객체는 함수가 생성자로 동작할 때, 이를 통해 새로 생성된 객체의 부모 역할을 한다.

![1.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/bf58a0ed-b2ea-493e-b9c5-0d0dc80834ab/1.jpg)

그림과 같이 new 연산자로 jQuery()생성자 함수를 호출할 경우 생성된 jQuery객체는 [[Prototype]] 링크로 자신의 프로토타입인 jQuery.rptotype 객체에 접근 가능하다.

때문에 모든 jQuery 객체 인스턴스는 자신의 프로토타입인 jQuery.prototype 객체의 프로퍼티를 공유할 수 있다.

jQuery는 함수 정의 후 다음 예제처럼 jQuery.prototype 디폴트 객체를 객체 리터럴 형식의 다른 객체로 변경하고 이 변경된 jQuery의 프로토타입을 jQuery.fn 프로퍼티가 참조하게 한다.

이제 이후에 생성된 jQuery 객체 인스턴스는 변경된 프로토타입 객체에 정의된 다양한 메서드를 프로토타입 체이닝으로 사용할 수 있다.

이러한 프로토타입 객체 변경은  앞의 “디폴트 프로토타입은 다른 객체로 변경이 가능하다.”에서 알아보았다.

```jsx
jQuery.fn = jQuery.prototype = {
    jquery: "$Rev$",
    size: function() {
        return this.length;
    },
    ...
}
```

![2.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/438855aa-f237-41ad-ba2e-eec9a89209f6/2.jpg)

### 객체 확장 - extend() 메서드

jQuery 소스코드에서는 다음의 코드와 같이 다른 객체의 프로퍼티나 메서드 복사등으로 객체의 기능을 추가하는데 사용 가능한 extend() 메서드를 제공한다.

jQuery 소스코드에서는 이 메서드로 jQuery 객체 및 jQuery.rprototype 객체를 확장하는 부분을 jQuery 소스 코드 곳곳에서 볼 수 있다.

이 exnted() 메서드는 객체지향 프래그래밍에서 상속받은 객체를 확장시키는 개념을 설명할 때 이미 소개한 바 있으니 참고 바란다.

```jsx
jQuery.extend = jQuery.fn.extend = function(obj, prop) {
    if ( !prop ) { prop = obj; obj = this; }
    for ( var i in prop ) obj[i] = prop[i];
    return obj; 
}
```

![3.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/9a0e498f-c75a-46b0-87f3-6727d68495f6/3.jpg)

여기서 함수 호출 패턴에 따라, 함수 호출 extend() 메서드가 어디서 호출되는지에 따라서 다르게 바인딩된다.

이전 코드처럼 jQuery 함수 객체에서 extend()메서드가 호출될 경우 this는 jQuery 함수 객체로 바인딩

바로 위 코드 처럼 jQuery.prototype 객체에서 extend() 메서드가 호출될 경우 this는 jQuery.prototype 객체로 바인딩된다.

for in 문으로 prop 인자의 모든 프로퍼티를 obj 인자로 복사하는 코드다.

결국 obj 객체에 prop 객체의 프로퍼티가 추가된다.

`정리하면 extend() 메서드는 extend라는 함수명 그대로 객체의 기능을 추가하는 것이다.`

obj, prop 두 개의 인자를 받는 경우, 첫번째 인자로 전달된 obj 객체에 두번째 인자로 전달된 prop 객체의 모든 프로퍼티를 추가한다.

여기서 주의 할 것은 이 메서드가 obj 인자 하나만으로 호출될 경우다.

이때는 위에서 살펴봤듯 if문 이하가 실행되며 이 메서드를 호출한 객체의 this가 obj가 된다.

그리고 prop 인자가 원래 obj로 전달한 객체를 가리킨다.

결국, 메서드를 호출한 객체(this)에다 obj 인자로 넘긴 객체를 복사하는 결과가 된다.

이해를 돕기 위해 실제로 extend() 메서드가 호출된 부분을 살펴보자.

다음은 jQuery.extend() 메서드를 호출하는 jQuery 소스코드다.

이 코드에서는 extend() 메서드를 호출할 때 객체 리터럴 방식으로 생성한 객체 하나만을 obj 인자로 넘겼다.

따라서 앞서 설명한 것처럼 이 코드의 기능은 이 메서드를 호출한 jQuery 함수 객체(this)에 obj 인자로 넘긴 객체의 프로퍼티를 복사하는것이다.

```jsx
jQuery.extend({
    init: function(){
        jQuery.initDone = true;

    ...
    },

    each: function( obj, fn, args ) {
        if ( obj.length == undefined )
            for ( var i in obj )
                fn.apply( obj[i], args || [i, obj[i]]);
        else
            for ( var i = 0; i < obj.length; i++ )
                fn.apply( obj[i], args || [i, obj[i]]);
        return obj;
    },
    ...
});
```

위 코드는 jQuery.fn.extend() 메서드를 호출하는 jQuery 코드다.

앞에서 살펴본 jQuery.extend() 메서드 호출 예제와 같이 이 코드에서도 jQuery.fn.extend() 메서드를 하나의 객체 인자만으로 호출했다ㅏ.

이것은 이 메서드를 호출한 jQuery.fn 객체에 obj 인자로 넘겨진 객체의 프로퍼티를 복사하는 코드가 된다.

```jsx
jQuery.fn.extend({
    _toggle: jQuery.fn.toggle,
    toggle: function(a, b) {
        ...
    }
));
```

![4.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/a5a794d5-eab0-473c-bca7-b2fd3e228949/4.jpg)

이를 정리하면 위의 그림과 같다.

### jQuery 소스코드의 기본 구성 요소

- jQuery 함수 객체
- jQuery.prototype 객체
- jQuery 객체 인스턴스

![5.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/0c887581-67a2-4cf9-b176-a1fc7e6194b6/5.jpg)

jQuery() 함수의 가장 기본적인 역할은 new 연산자로 jQuery 객체를 생성하는 것이다.

이렇게 생성된 jQuery 객체는 프로토타입 체이닝으로 jQuery.prototype 객체에 포함된 프로토타입 메서드를 호출할 수 있다.

또한, 여기서 주목할 점은 jQuery 함수 객체 자신이 메서드를 포함하고 있다는 것이다.

이러한 jQuery 함수 객체의 메서드는 각각 생성된 jQuery 인스턴스 객체에 특화ㅏ되지 않고 범용적으로 사용되는 jQuery 코어 메서드로 구성된다.

## jQuery의 id 셀렉터 동작 분석

Javascript에서 /는 정규표현식 리터럴을 만드는 기호다.

/로 둘러싸인 부분은 정규표현식 객체로 생성된다.

딱히, 적을 필요는 없어보인다.

## jQuery 이벤트 핸들러 분석

```jsx
new function() {
    var e = ("blur, focus, load, resize, scroll, unload, click, dblclick," +
        "mousedown, mouseup, mousemove, mouseover, mouseout, change, reset" + "select, submit, keydown, keypress, keyup, error").split(",");

for ( var i = 0 ; i < e.length; i++ ) new function() { 
        var o = e[i];
        jQuery.fn[o] = function(f) {
            return f ? this.bind(o, f) : this.trigger(o);
        };
    };
};
```

![15.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/440c756f-5c3e-4b05-8781-a86f52e8c1c0/29542c44-0118-4ebe-8b92-52c2ca350ba5/15.jpg)
