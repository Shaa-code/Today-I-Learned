import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.locks.ReentrantLock;

public class ChattingServer {

    private static ReentrantLock lock = new ReentrantLock();
    static boolean isTerminated = false;

    private static int port = 8000; // Defualt로 설정하는거 연습할것.
    private static ServerSocket serverSocket;
    private static Socket clientSocket;
    private static BufferedReader receiveString;
    private static BufferedWriter sendString;

    static String sendMsg;
    static String clientId;

    public static void main(String[] args) throws IOException, InterruptedException {

        ChattingServer server = new ChattingServer();
        server.init(8000);
        server.waitClient();
        server.createIOStream();
        server.waitReceivingId();
        server.sendCheckedId();

        ServerReceivingThread receivingThread = new ServerReceivingThread(receiveString,sendString);
        new Thread(receivingThread).start();

        server.sendMsg();
        server.destory();
    }

    public void init(int port) throws IOException{
        System.out.println("서버가 곧 동작을 시작합니다.");
        System.out.println("연결하려는 클라이언트의 포트 번호를 입력해주세요");
        serverSocket = new ServerSocket(port);
        System.out.println(String.format("서버가 %s번 포트를 점유했습니다.",port));
    }

    public void waitClient() throws IOException{
        System.out.println("서버가 클라이언트의 접속 요청을 기다리고 있습니다.");
        clientSocket = serverSocket.accept();
        System.out.println("서버가 클라이언트의 접속 요청을 받고, 해당 클라이언트를 위한 소켓을 생성했습니다.");
    }

    public void createIOStream() throws IOException {
        System.out.println("클라이언트와 송수신을 위한 스트리밍 객체를 생성합니다.");
        receiveString = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        sendString = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()));
    }

    public void waitReceivingId() throws IOException {
        while(true){
            System.out.println("클라이언트로부터 ID 전송을 기다리고 있습니다.");
            sendMsg = receiveString.readLine();

            if(sendMsg.startsWith("<name>")){
                int endTagIndex = sendMsg.indexOf("</name>");
                clientId = sendMsg.substring("<name>".length(), endTagIndex);
                break;
            }
            sendString.write("<error> code = 1 , msg = name tag를 가진 채팅 아이디를 먼저 보내주셔야 합니다." + sendMsg + "<error>\n");
            sendString.flush();
        }
        System.out.println(clientId + "님이 채팅을 요청하셨습니다.");
        System.out.println("보낼 메시지를 입력해주세요.");
    }

    public void sendCheckedId() throws IOException {
        sendMsg = "<msg>반갑습니다.[" + clientId + "]님</msg>";
        sendString.write(sendMsg + "\n");
        sendString.flush();
    }

    public void sendMsg() throws IOException {
        Scanner keyboardInput = new Scanner(System.in);
        while(true){
            sendMsg = "<msg>[서버] " + keyboardInput.nextLine() + "</msg>";
            System.out.println(sendMsg);

            if (isTerminated) break;

            sendString.write(sendMsg + '\n');
            sendString.flush();
        }
    }

    public void destory() throws IOException, InterruptedException {
        Thread.sleep(2000);
        System.out.println("클라이언트와의 접속을 종료합니다.");
        clientSocket.close();
        System.out.println("서버를 종료합니다.");
        serverSocket.close();
    }

}