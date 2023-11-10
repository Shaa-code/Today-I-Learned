package org.example.DesignPatternWorld.SimCharacter;

public class BowAndArrowBehavior implements WeaponBehavior{

    @Override
    public void useWeapon() {
        System.out.println("Arrow");
    }

}
