package org.example.DesignPatternWorld.SimCharacter;

public class KnifeBehavior implements WeaponBehavior{
    @Override
    public void useWeapon() {
        System.out.println("Knife");
    }
}
