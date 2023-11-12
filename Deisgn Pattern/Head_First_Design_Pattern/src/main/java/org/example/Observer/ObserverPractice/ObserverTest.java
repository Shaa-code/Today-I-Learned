package org.example.Observer.ObserverPractice;

public class ObserverTest {
    public static void main(String[] args) {


        AgeSensor ageSensor = new AgeSensor(13);
        HeightSensor heightSensor = new HeightSensor(170);

        DataAcceptor dataAcceptor = new DataAcceptor();
        dataAcceptor.setAge(ageSensor.getAge());
        dataAcceptor.setHeight(heightSensor.getHeight());

        AgeDisplay ageDisplay = new AgeDisplay(dataAcceptor);
        HeightDisplay heightDisplay = new HeightDisplay(dataAcceptor);

        dataAcceptor.registObserver(ageDisplay);
        dataAcceptor.registObserver(heightDisplay);
        dataAcceptor.notifyObserver();

        ageSensor.setAge(14);
        heightSensor.setHeight(171);
        dataAcceptor.setAge(ageSensor.getAge());
        dataAcceptor.setHeight(heightSensor.getHeight());
        dataAcceptor.notifyObserver();

    }
}
