package org.example.util.Document;

public class UnknownFileTypeException extends RuntimeException{
    UnknownFileTypeException(String message){
        super(message);
    }
}
