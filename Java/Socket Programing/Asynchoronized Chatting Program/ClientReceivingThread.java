import java.io.BufferedReader;
import java.io.IOException;

class ClientReceivingThread implements Runnable {
    private BufferedReader receiveString;

    ClientReceivingThread(BufferedReader receiveString) {
        this.receiveString = receiveString;
    }

    public void run() {
        try {
            System.out.println("수신 전용 Thread가 시작됩니다.");

            while (true) {
                String msg = receiveString.readLine();
                System.out.println(msg);
            }

        } catch (IOException e) {
            System.out.println("통신 준비중 네트워크 오류가 발생했습니다.");
            System.out.println(e);
        }
    }
}
