package org.example.Factory;

public class SimplePizzaFactory {
    public PizzaStore createPizza(String type) {
        PizzaStore pizza = null;

        if ( type.equals("peperoni")){
            pizza = new PeperoniPizza();
        } else if (type.equals("cheese")){
            pizza = new CheesePizza();
        } else{
            pizza = new OlivePizza();
        }
        return pizza;
    }
}
