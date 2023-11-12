package org.example.Observer.ObserverPractice;

public interface Subject {

    void registObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObserver();

}
