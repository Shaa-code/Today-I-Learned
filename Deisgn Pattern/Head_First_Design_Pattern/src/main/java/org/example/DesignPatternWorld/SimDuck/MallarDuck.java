package org.example.DesignPatternWorld.SimDuck;

public class MallarDuck extends Duck{

    public MallarDuck(){
        quackBehavior = new MuteQuack();
        flyBehavior = new FlyWithWings();
    }

    public void display(){
        System.out.println("Water Duck");
    }

    @Override
    public void performQuack() {
        super.performQuack();
    }

    @Override
    public void performFly() {
        super.performFly();
    }

}
