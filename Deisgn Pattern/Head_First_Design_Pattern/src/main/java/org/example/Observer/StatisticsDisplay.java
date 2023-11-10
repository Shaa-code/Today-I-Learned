package org.example.Observer;

public class StatisticsDisplay implements Observer, DisplayElement {

    private float temperature;
    private float humidity;
    private float pressure;

    private WeatherData weatherData; // 굳이 왜 필요하지?

    public StatisticsDisplay(WeatherData weatherData) {
        weatherData.registerObserver(this);
    }

    @Override
    public void display() {
        System.out.println("Statistcs");
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        display();
    }

}
