package org.example.DesignPatternWorld.SimDuck;

public abstract class Duck {

    QuackBehavior quackBehavior;
    FlyBehavior flyBehavior;

    void swim() {}

    void display() {}

    public void performQuack() {
        quackBehavior.quack();
    };

    public void performFly() {
        flyBehavior.fly();
    };
}