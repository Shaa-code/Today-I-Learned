package org.example.Observer.ObserverPractice;


public class AgeDisplay implements Observer, Display{

    private int age;

    final private DataAcceptor dataAcceptor;

    public AgeDisplay(DataAcceptor dataAcceptor){
        this.dataAcceptor = dataAcceptor;
    }

    @Override
    public void renewData() {
        this.age = dataAcceptor.age;
        display();
    }

    @Override
    public void display(){
        System.out.println("Current Age : " + age);
    }

}
