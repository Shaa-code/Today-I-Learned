package org.example.Observer;

public class ForecastDisplay implements Observer, DisplayElement{

    private float temperature;
    private float humidity;
    private float pressure;

    public ForecastDisplay(WeatherData weatherData) {
        weatherData.registerObserver(this);
    }

    @Override
    public void display() {

    }

    @Override
    public void update(float temperature, float humidity, float pressure) {

    }
}
