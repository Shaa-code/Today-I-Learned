package org.example.Observer;

public class CurrentConditionsDisplay implements Observer, DisplayElement{

    private float temperature;
    private float humidity;
    private WeatherData weatherData;
    // 굳이 왜 Subject를 저장하는거지?
    // 아래에서 사용하듯이 update()에 인자를 넣지 않고, weatherData
    // 나중에 Observer 목록에서 제거할 때 유용하게 써먹을 수 있다고 한다.


    public CurrentConditionsDisplay(WeatherData weatherData){
        //Subject를 생성자로 가져와서 초기화 시켜준다.
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
