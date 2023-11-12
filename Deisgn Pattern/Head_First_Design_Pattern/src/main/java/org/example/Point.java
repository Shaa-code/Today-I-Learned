package org.example;

public class Point {
    int x;
    int y;

    Point(int x, int y){
        this.x = x;
        this.y = y;
    }
    String getLocation() {
        return "x :" + x + ", y : " + y;
    }
}
