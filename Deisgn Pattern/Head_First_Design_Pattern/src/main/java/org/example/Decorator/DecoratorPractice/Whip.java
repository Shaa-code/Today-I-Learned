package org.example.Decorator.DecoratorPractice;

public class Whip extends CondimentDecorator{

    public Whip(Beverage beverage){
        this.beverage = beverage;
    }

    @Override
    public double cost(){
        return beverage.cost() + .3;
        //여기서 beverage는 바로 상위의 beverage[ex) new Whip(new Whip(new DarkRoast()))]를 의미한다.
        //최상위 부모 클래스를 의미하는 beverage[ex) new DarkRoast()]가 아님을 알아야 한다.
    }

}
