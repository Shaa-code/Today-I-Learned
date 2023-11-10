package org.example.DesignPatternWorld.SimCharacter;

public abstract class Character {
    WeaponBehavior weapon;

    public void setWeapon(WeaponBehavior w){
        this.weapon = w;
    }

    void fight() {}

}
