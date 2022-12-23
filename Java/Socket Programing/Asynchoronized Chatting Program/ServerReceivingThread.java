import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;

class ServerReceivingThread implements Runnable {
    private BufferedReader receiveString;
    private BufferedWriter sendString;

    ServerReceivingThread(BufferedReader receivingString, BufferedWriter sendString) {
        this.receiveString = receivingString;
        this.sendString = sendString;
    }

    public void run() {
        try {
            System.out.println("클라이언트로부터의 데이터 전송을 기다리고 있습니다.");
            while (true) {
                {
                    String receiveMsg = receiveString.readLine();
                    System.out.println(receiveMsg);

                    if (receiveMsg.startsWith("<quit>")) {
                        System.out.println("클라이언트가 채팅 종료를 원하고 있습니다.");
                        ChattingServer.isTerminated = true;
                        break;
                    }

                    if (!receiveMsg.startsWith("<msg>")) {
                        sendString.write("<error> code = 2 , msg = msg tag를 가진 메세지가 수신되지 않았습니다." + receiveMsg + "<error>\n");
                        sendString.flush();
                        continue;
                    }

                }
            }
        } catch (IOException e) {
            System.out.println("통신 준비중 네트워크 오류가 발생했습니다.");
            System.out.println(e);
        }
    }
}
