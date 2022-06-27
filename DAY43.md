### Spring MVC 서비스 계층

Controller가 전달받은 클라이언트의 요청을 직접적으로 처리하는 계층.

- DI(Dependency Injection)를 사용해서 API 계층과 서비스 계층을 연동할 수 있다.
- API 계층의 DTO 클래스와 서비스 계층의 엔티티(Entity) 클래스를 매핑할 수 있다.

postMember(),patchMember(),getMember,getMembers,deleteMember()이 핸들러메서드가 전달받은 요청을 처리하는 메서드를 MemberService클래스에 작성한다.

### Member클래스의 역할

```java
package com.codestates.member;

import java.util.List;

public class MemberService {
    public Member saveMember(Member member){
        return null
    }

    public Member updateMember(Member member){
        return null;
    }

    public Member findMember(long memberId){
        return null
    }

    public List<Member> findMembers(){
        return null;
    }

    public void deleteMember(long memberId){
        
    }
}
```

DTO는 API계층에서 클라이언트의 RequestBody를 전달받고 클라이언트에게 되돌려 줄 응답데이터를 담는 역할을 한다.

Member클래스는 API계층에서 전달 받은 요청 데이터를 기반으로 서비스 계층에서 비즈니스 로직을 처리하기 위해 필요한 데이터를 전달 받고, 비즈니스 로직을 처리한 후에는 결과값을 다시 API계층으로 리턴해주는 역할을 한다.

Member클래스 처럼 서비스 계층에서 데이터 액세스 께층과 연동하면서 비즈니스 로직을 처리하기 위해 필요한 데이터를 담는 역할을 하는 클래스를 도메인 엔티티(Entity)클래스라고 부른다.

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private long memberId;
    private String email;
    private String name;
    private String phone;
}
```

### @Getter , @Setter

lombok이라는 라이브러리에서 제공하는 애너테이션,

우리가 DTO클래스를 작성하면서 각 멤버 변수에 해당하는 getter/setter를 일일이 작성하는 수고를 덜어주는 편리한 유틸리티성 라이브러리

### @AllArgsConstructor

현재 Member클래스에 추가된 모든 멤버 변수를 파라미터로 갖는 Member생성자를 자동으로 생성해 준다.

### @NoArgsConstructor

파라미터가 없는 기본 생성자를 자동으로 생성해준다.

이번챕터에서 중요한것은 서비스 계층의 서비스 클래스와 API계층의 Controller클래스를 어떻게 연결하느냐가 중요하다.

### MemberController의 문제점

- 첫 번째는 Controller 핸들러 메서드의 책임과 역할에 관한 문제입니다.
핸들러 메서드의 역할은 클라이언트로부터 전달 받은 요청 데이터를 Service 클래스로 전달하고, 응답 데이터를 클라이언트로 다시 전송해주는 단순한 역할만을 하는 것이 좋습니다.
그런데, 현재의 MemberController에서는 핸들러 메서드가 DTO 클래스를 엔티티(Entity) 객체로 변환하는 작업까지 도맡아서 하고 있습니다.

- 두 번째는 Service 계층에서 사용되는 엔티티(Entity) 객체를 클라이언트의 응답으로 전송하고 있는 것입니다.
DTO 클래스는 API 계층에서만 데이터를 처리하는 역할을 하고, **엔티티(Entity) 클래스**는 서비스 계층에서만 데이터를 처리하는 역할을 해야 하는데 엔티티(Entity) 클래스의 객체를 클라이언트의 응답으로 전송함으로써 계층 간의 역할 분리가 이루어지지 않았습니다.

### Mapper를 통한 개선

```java
@RestController
@RequestMapping("/v4/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper){
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberDto) {
        Member member = mapper.memberPostDtoToMember(memberDto);
        Member response = memberService.saveMember(member);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);

        Member response = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
        // No need Business logic

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        System.out.println("# memberId: " + memberId);
        Member response = MemberService.findMember(memberId);

        // not implementation
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers() {
        System.out.println("# get Members");

        // not implementation
        List<Member> members = memberService.findMembers();

        List<MemberResponseDto> response =
                members.stream()
                        .map(member -> mapper.memberToMemberResponseDto(member))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        System.out.println("# deleted memberId: " + memberId);
        // No need business logic
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

도메인 업무 기능이 늘어날때 마다 **개발자가 일일이 수작업으로 매퍼(Mapper) 클래스를 만드는 것은 비효율적입니다.**

### MapStruct

MapStruct는 DTO클래스처럼 Java Bean규약을 지키는 객체들간의 변환기능을 제공하는 매퍼(Mapper) 구현 클래스를 자동으로 생성해주는 코드 자동 생성기이다.

`@Mapper`
 애너테이션을 추가함으로써 해당 인터페이스는 MapStruct의 매퍼 인터페이스로 정의가 되는 것입니다.

```java
package com.codestates.member;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
}

```

componentModel = “spring”을 지정해주면 Spring의 Bean으로 등록된다.

자동으로 구현된 코드

```java
@Component
public class MemberMapperImpl implements MemberMapper {
    public MemberMapperImpl() {
    }

    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if (memberPostDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setEmail(memberPostDto.getEmail());
            member.setName(memberPostDto.getName());
            member.setPhone(memberPostDto.getPhone());
            return member;
        }
    }

    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if (memberPatchDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setMemberId(memberPatchDto.getMemberId());
            member.setName(memberPatchDto.getName());
            member.setPhone(memberPatchDto.getPhone());
            return member;
        }
    }

    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member == null) {
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String name = null;
            String phone = null;
            memberId = member.getMemberId();
            email = member.getEmail();
            name = member.getName();
            phone = member.getPhone();
            MemberResponseDto memberResponseDto = 
											     new MemberResponseDto(memberId, email, name, phone);
            return memberResponseDto;
        }
    }
}
```

왜 역할분리를 하는가?

1. 계층별 관심사 분리
2. 코드 구성은 단순화
3. RestAPI 스펙의 독립성 확보
