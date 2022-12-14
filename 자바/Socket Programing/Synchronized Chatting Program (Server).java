import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class ChattingServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        ServerSocket serverSocket = null;
        System.out.println("서버가 곧 동작을 시작합니다.");
        serverSocket = new ServerSocket(8000);
        System.out.println("서버가 8000번 포트를 점유했습니다.");

        System.out.println("서버가 클라이언트의 접속 요청을 기다리고 있습니다.");
        Socket clientSocket = serverSocket.accept();
        System.out.println("서버가 클라이언트의 접속 요청을 받고, 해당 클라이언트를 위한 소켓을 생성했습니다.");

        System.out.println("클라이언트와 송수신을 위한 스트리밍 객체를 생성합니다.");
        BufferedReader receiveString = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        BufferedWriter sendString = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()));

        Scanner keyboardInput = new Scanner(System.in);
        String msg;
        String clientId;

        while(true){
            System.out.println("클라이언트로부터 ID 전송을 기다리고 있습니다.");
            msg = receiveString.readLine();
            if(msg.startsWith("<name>")){
                int endTagIndex = msg.indexOf("</name>");
                clientId = msg.substring("<name>".length(), endTagIndex);
                break;
            }
            sendString.write("<error> code = 1 , msg = name tag를 가진 채팅 아이디를 먼저 보내주셔야 합니다." + msg + "<error>\n");
            sendString.flush();
        }

        System.out.println(clientId + "님이 채팅을 요청하셨습니다.");

        msg = "<msg> 반갑습니다.[" + clientId + "]님</msg>";
        sendString.write(msg + "\n");
        sendString.flush();

        while(true){
            {
                System.out.println("클라이언트로부터의 데이터 전송을 기다리고 있습니다.");
                msg = receiveString.readLine();
                System.out.println(msg);

                if(msg.startsWith("<quit>"))
                {
                    System.out.println("클라이언트가 채팅 종료를 원하고 있습니다.");
                    break;
                }

                if(!msg.startsWith("<msg>")){
                    sendString.write("<error> code = 2 , msg = msg tag를 가진 메세지가 수신되지 않았습니다." + msg + "<error>\n");
                    sendString.flush();
                    continue;
                }

                System.out.println();
                msg = "<msg>[서버]" + keyboardInput.nextLine() + "</msg>";
                System.out.println(msg);
                sendString.write(msg + '\n');
                sendString.flush();
            }
        }

        Thread.sleep(2000);
        System.out.println("클라이언트와의 접속을 종료합니다.");
        clientSocket.close();
        System.out.println("서버를 종료합니다.");
        serverSocket.close();
    }
}
