package org.example.Observer.ObserverPractice;

public class HeightDisplay implements Observer, Display{

    private int height;
    private DataAcceptor acceptor;

    public HeightDisplay(DataAcceptor acceptor){
        this.acceptor = acceptor;
        this.height = acceptor.height;
    }

    @Override
    public void display() {
        System.out.println("Current Height : " + height);
    }

    @Override
    public void renewData(){
        this.height = acceptor.height;
        display();
    }

    public void detachAcceptor(){
        acceptor.removeObserver(this);
    }
}
