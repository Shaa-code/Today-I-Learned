package org.example.Observer;

public class CurrentConditionsDisplay implements Observer, DisplayElement{

    private float temperature;
    private float humidity;
    private WeatherData weatherData;
    // ���� �� Subject�� �����ϴ°���?
    // �Ʒ����� ����ϵ��� update()�� ���ڸ� ���� �ʰ�, weatherData
    // ���߿� Observer ��Ͽ��� ������ �� �����ϰ� ����� �� �ִٰ� �Ѵ�.


    public CurrentConditionsDisplay(WeatherData weatherData){
        //Subject�� �����ڷ� �����ͼ� �ʱ�ȭ �����ش�.
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(){
        this.temperature = weatherData.getTemperature();
        this.humidity = weatherData.getHumidity();
        display();
    }

    @Override
    public void display() {
        System.out.println("Current State :" +
                          "Temperature " + temperature +
                          "Humidity = " + humidity + "%"
        );
    }
}
