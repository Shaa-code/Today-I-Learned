package org.example.Observer.ObserverPractice;

import java.util.ArrayList;
import java.util.List;

public class DataAcceptor implements Subject {

    List<Observer> observers = new ArrayList<>();
    int age;
    int height;


    public void setAge(int age) {
        this.age = age;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public void registObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o){
        observers.remove(o);
    }

    @Override
    public void notifyObserver(){
        for (Observer observer : observers) {
            observer.renewData();
        }
    }
}
