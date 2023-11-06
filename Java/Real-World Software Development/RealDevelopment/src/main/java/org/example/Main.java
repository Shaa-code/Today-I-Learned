package org.example;

import org.example.util.Bank.BankStatementAnalyzer;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {

        BankStatementAnalyzer bankStatementAnalyzer = new BankStatementAnalyzer();

        try {
            bankStatementAnalyzer.analyze("History.csv");

        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}