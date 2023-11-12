package org.example;

public class Point3D extends Point {
    int z;

    Point3D(int x, int y, int z){
        super(x,y);
        this.z = z;
    }

//    @Override
//    String getLocation(){
//        return super.getLocation() + ", z:" + z;
//    }
}
