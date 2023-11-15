package org.example.Decorator.DecoratorPractice;

public abstract class Beverage {

    String description;

    public abstract double cost();
    //

    public String getDescription(){
        return this.description;
    }

}