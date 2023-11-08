package Twoter;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class TwoterTest {
    @Test
    public void shouldBeAbleToAuthenticateUser(){
        // 유효 사용자의 로그온 메시지 수신

        // 로그온 메서드는 새 엔드포인트 반환

        // 엔드포인트 유효성을 확인하는 어서션
    }

    @Test
    public void shouldNotAuthenticateuserWithWrongPassword(){
        final Optional<SenderEndPoint> endPoint = twootr.onLogon(
                TestData.USER_ID, "bad password", receiverEndPoint);
        )
        Assertions.assertFalse(endPoint.isPresent());
    }

    @Test
    public void shouldFollowValidUser(){
        logon();

        final FollowStatus followStatus = endPoint.onFollow(TestData.OTHER_USER_ID);
        Assertions.assertEquals(SUCCESS, followStatus);
    }

}
