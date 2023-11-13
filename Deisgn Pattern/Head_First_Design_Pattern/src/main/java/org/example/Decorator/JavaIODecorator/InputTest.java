package org.example.Decorator.JavaIODecorator;

import java.io.*;
import java.nio.file.Path;

public class InputTest {
    public static void main(String[] args) throws IOException {
        int c;
        try{
            InputStream in = new LowerCaseInputStream(new BufferedInputStream( new FileInputStream("src/main/java/org/example/Decorator/JavaIODecorator/test.txt")));

            while((c = in.read()) >= 0){
                System.out.println((char) c);
            }

            in.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
