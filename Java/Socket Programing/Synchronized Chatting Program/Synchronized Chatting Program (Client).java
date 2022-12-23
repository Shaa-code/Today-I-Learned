import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class ChattingClient {
    public static void main(String[] args) throws IOException {
        System.out.println("클라이언트가 서버와 통신을 준비");
        Socket socket = new Socket("localhost",8000);
        System.out.println("서버와의 연결에 성공했습니다.");

        System.out.println("서버와의 송수신을 위한 스트리밍 객체를 생성합니다.");
        BufferedReader receiveString = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        BufferedWriter sendString = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));

        System.out.println("서버로 보낼 메시지를 입력하세요.");
        Scanner keyboardInput = new Scanner(System.in);

        System.out.println("사용하실 ID를 입력해 주세요");
        String chattingId = keyboardInput.nextLine();

        sendString.write("<name>" + chattingId + "</name>\n");
        sendString.flush();

        String msg = receiveString.readLine();
        System.out.println("서버로부터 {" + msg +"} 를 수신했습니다.");

        while(true){
            System.out.println("서버로 보낼 메세지를 입력해주세요.");
            msg = keyboardInput.nextLine();

            if(msg.equals("bye")) {
                System.out.println("서버와의 채팅을 종료하겠습니다.");
                sendString.write("<quit>");
                sendString.flush();
                break;
            }

            System.out.println("서버로 보낼 메세지는 {" + msg + "} 입니다.");

            sendString.write("<msg>[" + chattingId + "]" + msg + "</msg>\n");
            sendString.flush();

            msg = receiveString.readLine();
            System.out.println("서버로부터 {" + msg + "} 를 수신했습니다.");
        }

        System.out.println("소켓을 종료합니다.");
        keyboardInput.close();
        socket.close();
    }
}
