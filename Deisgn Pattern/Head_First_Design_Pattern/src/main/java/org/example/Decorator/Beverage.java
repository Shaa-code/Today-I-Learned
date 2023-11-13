package org.example.Decorator;

public abstract class Beverage {

    public enum Size {TALL, GRANDE, VENTI}

    Size size = Size.TALL;

    String description;

    public Beverage() {
        this.description = "Not Selected";
    }

    public void setSize(Size size){
        this.size = size;
    }

    public Size getSize() {
        return this.size;
    }

    public String getDescription(){
        return description;
    }

    public abstract double cost();

}
