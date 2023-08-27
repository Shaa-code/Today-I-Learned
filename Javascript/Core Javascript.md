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
