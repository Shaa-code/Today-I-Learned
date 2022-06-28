# DAY44

### Spring MVC에서의 예외처리

클라이언트쪽에서 구체적으로 어떤 예외가 발생했는지를 알리기위해서 사용함.

```java
@PostMapping
public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberDto) {
    Member member = mapper.memberPostDtoToMember(memberDto);
    Member response = memberService.createMember(member);
    return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),
            HttpStatus.CREATED);
}

@ExceptionHandler
public ResponseEntity handleException(MethodArgumentNotValidException e){
    final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
    return new ResponseEntity<> (fieldErrors, HttpStatus.BAD_REQUEST);
}
```

1. 클라이언트쪽에서 회원등록을 위해 MemberController의 postMember() 핸들러에 요청을 보낸다.
2. RequestBody에 유효하지 않은 요청 데이터가 포함되어있어 유효성 검증에 실패하고, MethodArgumentNotValidException이 발생한다.
3. MemberController에는 @ExceptionHandler애너테이션이 추가된 예외처리 메서드인, handleException이 있다.
4. 검증과정에서 내부적으로 던져진 MethodArgumentNotValidException을 handleException()메서드가 전달 받는다.
5. MethodArgumentNotValidException 객체에서 getBindingResult().getFieldErrors()를 통해 발생한 에러 정보를 확인할 수 있다.
6. ResponseEnitity를 통해 Response Body로 전달한다.

Request받은 값

```java
{
    "codes": [
        "Email.memberPostDto.email",
        "Email.email",
        "Email.java.lang.String",
        "Email"
    ],
    "arguments": [
        {
            "codes": [
                "memberPostDto.email",
                "email"
            ],
            "arguments": null,
            "defaultMessage": "email",
            "code": "email"
        },
        [],
        {
            "arguments": null,
            "codes": [
                ".*"
            ],
            "defaultMessage": ".*"
        }
    ],
    "defaultMessage": "올바른 형식의 이메일 주소여야 합니다",
    "objectName": "memberPostDto",
    "field": "email",
    "rejectedValue": "hgd0",
    "bindingFailure": false,
    "code": "Email"
}
```

너무 쓸데없는 정도까지 많이 보내기에 줄여야한다.

```java

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private List<FieldError> fieldErrors;

    @Getter
    @AllArgsConstructor
    public static class FieldError{
        private String field;
        private Object rejectedValue;
        private String reason;
    }
}
```

여러 오류가 발생할수 있어서 List로 받고 그중에서 field, rejectedValue, reason만 얻어온다.

```java
@ExceptionHandler
public ResponseEntity handleException(MethodArgumentNotValidException e){
    final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
    List<ErrorResponse.FieldError> errors =
            fieldErrors.stream()
                    .map(error -> new ErrorResponse.FieldError(
                            error.getField(),
                            error.getRejectedValue(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());

    return new ResponseEntity<>(new ErrorResponse(errors),HttpStatus.BAD_REQUEST);
}
```

```java
"fieldErrors": [
        {
            "field": "name",
            "rejectedValue": "",
            "reason": "이름은 공백이 아니어야 합니다."
        },
        {
            "field": "email",
            "rejectedValue": "hgd0",
            "reason": "올바른 형식의 이메일 주소여야 합니다"
        }
    ]
```

### ExceptionHandler의 단점

1. 각각의 Controller클래스에서 @ExceptionHandler 애너테이션을 사용하여 Request Body에 대한 유효성 검증 실패에 대한 에러처리를 해야되므로 각 Controller크래스마다 코드 중복이 발생한다.

2.Controller에서 처리해야되는 예외가 유효성 검증 실패에 대한 예외만 있는것이 아니기 때문에 하나의 Controller클래스네 내에서 @ExceptionHandler를 추가한 에러 처리 핸드러 메서드가 늘어난다.

```java
@RestController
@RequestMapping("/v7/members")
@Validated
@Slf4j
public class MemberController {
    ...
		...

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberDto) {
        Member member = mapper.memberPostDtoToMember(memberDto);

        Member response = memberService.createMember(member);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),
                HttpStatus.CREATED);
    }

		@PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);

        Member response =
                memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),
                HttpStatus.OK);
    }
		...
		...

    @ExceptionHandler
    public ResponseEntity handleException(MethodArgumentNotValidException e) {
				// (1)
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

				// (2)
        List<ErrorResponse.FieldError> errors =
                fieldErrors.stream()
                            .map(error -> new ErrorResponse.FieldError(
                                error.getField(),
                                error.getRejectedValue(),
                                error.getDefaultMessage()))
                            .collect(Collectors.toList());

        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
    }

		@ExceptionHandler
    public ResponseEntity handleException(ConstraintViolationException e) {
        /**
         * - ConstraintViolationException 클래스는 getBindingResult().getFieldErrors()
         * 와 같이 에러 정보를 얻을 수 없다.
         * - MethodArgumentNotValidException과 다르게 또 다른 방식으로 처리가 필요.
         */

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
```

보다시피 계속해서 ExceptionHandler를 추가해주어야함. 그래서 AOP가 필요하게됨.

### @RestControllerAdvice

Controller 클래스에서 발생하는 예외를 도맡아서 처리하게 된다.

예상하건데, @RestController 애너테이션이 붙은 모든 메서드에 자동으로 적용되는듯하다.

```java
package com.codestates.advice;

import com.codestates.member.controller.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler
    public ResponseEntity handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e){
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

        List<ErrorResponse.FieldError> errors =
                fieldErrors.stream()
                        .map(error -> new ErrorResponse.FieldError(
                                error.getField()
                                ,error.getRejectedValue()
                                ,error.getDefaultMessage()))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity handleConstranitViolationException(
            ConstraintViolationException e){
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
```

![Untitled](https://user-images.githubusercontent.com/70310271/176230586-1716e821-766b-457f-a9cd-440774977bcf.png)

![Untitled 1](https://user-images.githubusercontent.com/70310271/176230629-9c2b0c40-de21-41cd-89a8-c0323d8d596d.png)

AOP를 적용하니, 모든 Controller에 예외처리가 되었다.
