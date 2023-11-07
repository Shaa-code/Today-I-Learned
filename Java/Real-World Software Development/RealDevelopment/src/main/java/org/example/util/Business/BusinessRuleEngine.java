package org.example.util.Business;

import java.util.ArrayList;
import java.util.List;

public class BusinessRuleEngine {

    private final List<Action> actions;

    public BusinessRuleEngine(){
        this.actions = new ArrayList<>();
    }

    public void addAction(final Action action){
        this.actions.add(action);
    }

    public int count(){
        return this.actions.size();
    }

    public void run(){
        this.actions.forEach(Action::perform);
    }
}
