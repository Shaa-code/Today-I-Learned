![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/12af0036-ac3f-42b3-8d51-2f653a38534e)# 데이터 타입과 연산자

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
