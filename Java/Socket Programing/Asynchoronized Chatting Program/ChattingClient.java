import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class ChattingClient {

    static Socket socket;
    static BufferedReader receiveString;
    static BufferedWriter sendString;
    static String chattingId;
    static Scanner keyboardInput;

    static String receiveMsg;
    static String sendMsg;

    public static void main(String[] args) throws IOException {
        ChattingClient client = new ChattingClient();
        client.init("localhost",8080);
        client.createIOStream();
        client.setId();
        client.receiveResponse();

        ClientReceivingThread recevingThread = new ClientReceivingThread(receiveString);
        new Thread(recevingThread).start();

        client.sendMsg();
        client.destroy();
    }

    public void init(String host, int port) throws IOException {
        System.out.println("클라이언트가 서버와 통신을 준비");
        socket = new Socket("localhost",8000);
        System.out.println("서버와의 연결에 성공했습니다.");
    }

    public void createIOStream() throws IOException {
        System.out.println("서버와의 송수신을 위한 스트리밍 객체를 생성합니다.");
        receiveString = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        sendString = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    }

    public void setId() throws IOException {
        keyboardInput = new Scanner(System.in);
        System.out.println("사용하실 ID를 입력해 주세요");
        chattingId = keyboardInput.nextLine();
        sendString.write("<name>" + chattingId + "</name>\n");
        sendString.flush();
    }

    public void receiveResponse() throws IOException {
        receiveMsg = receiveString.readLine();
        System.out.println(receiveMsg);
    }

    public void sendMsg() throws IOException {
        System.out.println("서버로 보낼 메세지를 입력해주세요.");
        while(true){
            sendMsg = keyboardInput.nextLine();

            if(sendMsg.equals("bye")) {
                System.out.println("서버와의 채팅을 종료하겠습니다.");
                sendString.write("<quit>");
                sendString.flush();
                break;
            }

            System.out.println("<msg>[" + chattingId + "] " + sendMsg + "</msg>\n");
            sendString.write("<msg>[" + chattingId + "] " + sendMsg + "</msg>\n");
            sendString.flush();
        }
    }

    public void destroy() throws IOException {
        System.out.println("소켓을 종료합니다.");
        keyboardInput.close();
        socket.close();
    }
}