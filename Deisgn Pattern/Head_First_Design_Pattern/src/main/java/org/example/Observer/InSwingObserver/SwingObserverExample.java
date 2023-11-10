package org.example.Observer.InSwingObserver;

import javax.swing.*;
import javax.swing.border.Border;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SwingObserverExample {

    JFrame frame;

    public static void main(String[] args){
        SwingObserverExample example = new SwingObserverExample();
        example.go();
    }

    public void go(){

        frame = new JFrame();
        frame.setSize(400,500);
        frame.setVisible(true);

        JPanel panel = new JPanel(new BorderLayout());

        JButton button = new JButton("GO? OR NOT?");
        button.setSize(100,50);
        button.addActionListener(event -> System.out.println("MayBe Regret that"));
        button.addActionListener(event -> System.out.println("Just Go"));
        frame.add(button);

    }

    class AngelListener implements ActionListener{
        @Override
        public void actionPerformed(ActionEvent event){
            System.out.println("Maybe Regret That");
        }
    }

    class DevilListener implements ActionListener{
        @Override
        public void actionPerformed(ActionEvent e) {
            System.out.println("Just Go !");
        }
    }
}
