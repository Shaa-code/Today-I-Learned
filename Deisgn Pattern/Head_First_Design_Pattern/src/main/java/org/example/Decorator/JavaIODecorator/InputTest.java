package org.example.Decorator.JavaIODecorator;

import java.io.*;
import java.nio.file.Path;

public class InputTest {
    public static void main(String[] args) throws IOException {
        int c;
        try{
            InputStream in = new LowerCaseInputStream(new BufferedInputStream( new FileInputStream("src/main/java/org/example/Decorator/JavaIODecorator/test.txt")));

            // Flow
            //1. LowerCaseInputStream의 read() 함수가 호출됩니다.
            //2. LowerCaseInputStream의 read() 함수에서 FilterInputStream의 read() 함수를 호출합니다.
            //3. FilterInputStream의 read() 함수에서 BufferedInputStream의 read() 함수를 호출합니다.
            //4. BufferedInputStream의 read() 함수에서 FileInputStream의 read() 함수를 호출합니다.
            //5. FileInputStream의 read() 함수에서 파일로부터 "hello"라는 데이터를 읽어옵니다.
            //6. BufferedInputStream의 read() 함수에서 "hello"라는 데이터를 버퍼에 저장합니다.
            //7. FilterInputStream의 read() 함수에서 "hello"라는 데이터를 반환합니다.
            //8. LowerCaseInputStream의 read() 함수에서 "hello"라는 데이터를 소문자로 변환합니다.
            //9. InputTest의 main() 함수에서 변환된 "hello"라는 데이터를 출력합니다.

            while((c = in.read()) >= 0){
                System.out.println((char) c);
            }

            in.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
