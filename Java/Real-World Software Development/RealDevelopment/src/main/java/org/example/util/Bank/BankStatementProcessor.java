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

    public double calculateTotalInMonth(final Month month){
        return summarizeTransactions((acc, bankTransaction) ->
                bankTransaction.getDate().getMonth() == month
                        ? acc + bankTransaction.getAmount()
                        : acc
        );
    }

    public double summarizeTransactions(final BankTransactionSummarizer bankTransactionSummarizer){
        double result = 0;
        for (BankTransaction bankTransaction : bankTransactions) {
            result = bankTransactionSummarizer.summarize(result, bankTransaction);
        }
        return result;
    }

    public List<BankTransaction> findTransactionsGraterThanEqual(final int amount){
//        final List<BankTransaction> result = new ArrayList<>();
//        for(final BankTransaction bankTransaction : bankTransactions){
//            if(bankTransaction.getAmount() >= amount){
//                result.add(bankTransaction);
//            }
//        }
        return findTransaction(bankTransaction ->
                bankTransaction.getAmount() >= amount);
    }


    public List<BankTransaction> findTransaction(final BankTransactionFilter bankTransactionFilter){
        final List<BankTransaction> result = new ArrayList<>();
        for(final BankTransaction bankTransaction : bankTransactions) {
           if(bankTransactionFilter.test(bankTransaction)){
               result.add(bankTransaction);
           }
        }
        return result;
    }

}