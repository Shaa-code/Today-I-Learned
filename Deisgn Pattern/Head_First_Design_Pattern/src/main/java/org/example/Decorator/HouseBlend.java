package org.example.Decorator;

public class HouseBlend extends Beverage{

    private int price;

    public HouseBlend(){
        this.description = "HouseBlend";
//        setMilk(true);
//        setMocha(false);
//        setSoy(true);
//        setWhip(true);
    }
    @Override
    public double cost(){
        return .89;
    }
}
