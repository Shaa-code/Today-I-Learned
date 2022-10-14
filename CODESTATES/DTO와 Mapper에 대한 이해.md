DTO는 별것 없다. 말그대로 Data Transfer Object이다.

```java
public class MemberController{
    public String PostMember(@RequestParam Long id,
                                     @RequestParam String name,
                                     @RequestParam String phone){

    Map<String, String> map = new HashMap<>();
    map.put("email",email);
    map.put("name",name);
    map.put("phone",phone);

    return new ResponseEntity<Map>(map,HttpStatus.CREATED);
}
```

만약 파라미터에 값을 추가하면 계속해서 메서드, 본문에 새로 추가된 내용을 넣어줘야한다.

그렇기 때문에, 파라미터 값들을 한번에 관리하기 위해서 DTO를 사용한다.

```java
public class MemberController{
    public ResponseEntity PostMember(MemberDto memberDto){
        return new ResponseEntity<MemberDto>(memberDto, HttpStatus.CREATED);
}
```

```java
@Getter
public class MemberDto{
    private String name;
    private String phone;
}
```

```java
public ResponseEntity postMember(@Valid @RequestBody memberDto){

Member member = new Member();
member.setEmail(memberDto.getEmail());
member.setName(memberDto.getName());
member.setPhone(memberDto.getPhone());

Member response = memberService.createMember(member);
return new ResponseEntity<>(response, HttpStatus.CREATED);
```

자 생각을 해보자.

Dto는 데이터를 파라미터로 옮기는걸 한번에 묶어서 전송하는 용도일 뿐이다.

데이터베이스에 저장하기 위해서는 데이터가 아니라 Entity로 받을 수 있어야한다.

즉, 위에 코드에서 보다시피 member객체를 새로 생성해주고, setEmail, setName, setPhone처럼 Dto에 저장된 값들을 하나씩 받아서 멤버객체에 또 하나씩 저장을 해줘야한다.

이는 너무 불편하다.

그리고 컨트롤러가 DTO 클래스를 Entity로 변환하는 역할을 하고 있는데, 이는 관심사 분리가 되지 않았음을 의미한다.

이를 가능케하는 Mapper를 구현해 보자.

```java
public class MemberMapper{
    public Member memberDtoToMember(MemberDto memberDto){
        return new Member(0L,
            memberDto.getEmail(),
            memberDto.getName(),
            memberDto.getPhone());
```

간단하다. Dto에 들어있는 데이터들을 get으로 받아 MemberEntity의 파라미터의 순서에 맞게 넣어주면 끝이다.

이를 귀찮게 하나씩 해주지 말고 자동으로 등록시켜주자

연관관계는 매핑되어있고 List로 받는 경우 Mapper

작동하는 경우

```
default Order orderPostDtoToOrder(OrderPostDto orderPostDto) {
    Order order = new Order();
    Member member = new Member();
    member.setMemberId(orderPostDto.getMemberId());

List<OrderCoffee> orderCoffees = orderPostDto.getOrderCoffees().stream()
                .map(orderCoffeeDto -> {
                    OrderCoffee orderCoffee = new OrderCoffee();
                    Coffee coffee = new Coffee();
                    coffee.setCoffeeId(orderCoffeeDto.getCoffeeId());
                    orderCoffee.addOrder(order);
                    orderCoffee.addCoffee(coffee);
                    orderCoffee.setQuantity(orderCoffeeDto.getQuantity());
                    return orderCoffee;
                }).collect(Collectors.toList());

    order.setMember(member);
    order.setOrderCoffees(orderCoffees);

    return order;
}
```

작동하지 않는경우 (Coffee를 orderCoffee 객체에서 뽑아 썻음.)

```
default Order orderPostDtoToOrder(OrderPostDto orderPostDto) {
    Order order = new Order();
    Member member = new Member();
    member.setMemberId(orderPostDto.getMemberId());

    List<OrderCoffee> orderCoffees = orderPostDto.getOrderCoffees().stream()
                    .map(orderCoffeeDto -> {
                        OrderCoffee orderCoffee = new OrderCoffee();
                        orderCoffee.getCoffee().setCoffeeId(orderCoffeeDto.getCoffeeId());
                        orderCoffee.addOrder(order);
                        orderCoffee.addCoffee(orderCoffee.getCoffee());
                        orderCoffee.setQuantity(orderCoffeeDto.getQuantity());
                        return orderCoffee;
                    }).collect(Collectors.toList());
    order.setMember(member);
    order.setOrderCoffees(orderCoffees);

    return order;
}
```
