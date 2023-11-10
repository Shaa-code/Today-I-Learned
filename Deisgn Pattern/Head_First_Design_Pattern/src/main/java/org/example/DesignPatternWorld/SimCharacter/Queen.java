package org.example.DesignPatternWorld.SimCharacter;

public class Queen extends Character{
    public void fight() {
        System.out.println("I'm Queen");
        weapon.useWeapon();
    }
}
