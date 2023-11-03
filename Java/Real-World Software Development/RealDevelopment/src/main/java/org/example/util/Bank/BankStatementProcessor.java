package org.example.util.Bank;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

public class BankStatementProcessor {

    private final List<BankTransaction> bankTransactions;

    public BankStatementProcessor(final List<BankTransaction> bankTransactions){
        this.bankTransactions = bankTransactions;
    }

    public double calculateTotalAmount(){
        double total = 0d;
        for(final BankTransaction bankTransaction: bankTransactions){
            total += bankTransaction.getAmount();
        }
        return total;
    }

    public List<BankTransaction> selectInMonth(final Month month){
        final List<BankTransaction> bankTransactionsInMonth = new ArrayList<>();
        for (final BankTransaction bankTransaction: bankTransactions) {
            if(bankTransaction.getDate().getMonth() == month) {
                bankTransactionsInMonth.add(bankTransaction);
            }
        }
        return bankTransactionsInMonth;
    }


    public List<BankTransaction> selectWithCriteria(final Month lowMonth, Month highMonth) throws Exception {
        if(lowMonth.getValue() > highMonth.getValue()){
            throw new Exception("Invalid Input Value.");
        }

        final List<BankTransaction> bankTransactionsInMonth = new ArrayList<>();
        for (final BankTransaction bankTransaction: bankTransactions) {
            int targetDate = bankTransaction.getDate().getMonth().getValue();

            if(targetDate >= lowMonth.getValue() && targetDate <= highMonth.getValue()) {
                bankTransactionsInMonth.add(bankTransaction);
            }
        }
        return bankTransactionsInMonth;
    }

    public List<Double> selectWithCriteria(final String category) {

        List<Double> amounts = new ArrayList<>();
        for (final BankTransaction bankTransaction : bankTransactions) {
            if (bankTransaction.getDescription().equals(category)) {
                amounts.add(bankTransaction.getAmount());
            }
        }
        return amounts;
    }

    public double calculateTotalForCategory(final String category){
        double total = 0;
        for(final BankTransaction bankTransaction :bankTransactions){
            if(bankTransaction.getDescription().equals(category)){
                total += bankTransaction.getAmount();
            }
        }
        return total;
    }
}
