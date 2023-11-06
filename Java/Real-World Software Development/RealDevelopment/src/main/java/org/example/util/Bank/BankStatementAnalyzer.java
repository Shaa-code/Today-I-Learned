package org.example.util.Bank;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Month;
import java.util.List;

public class BankStatementAnalyzer {
    private static final String RESOURCES = "src/main/resources/";

    private final BankStatementParser bankStatementParser = new BankStatementCSVParser();

    public void analyze(final String fileName) throws IOException{
        final Path readPath = Paths.get(RESOURCES + fileName + ".csv");
        final Path writePath = Paths.get(RESOURCES + fileName.replace(".csv",".txt"));
        final List<String> lines = Files.readAllLines(readPath);

        final List<BankTransaction> bankTransactions = bankStatementParser.parseLinesFrom(lines);
        final BankStatementProcessor bankStatementProcessor = new BankStatementProcessor(bankTransactions);

//        Files.writeString(writePath,collectSummaryForText(bankStatementProcessor));

//        final List<BankTransaction> transactions = bankStatementProcessor.findTransaction(new BankTransactionIsInFebruaryAndExpensive());
        final List<BankTransaction> transactions1 = bankStatementProcessor.findTransaction(bankTransaction ->
                bankTransaction.getDate().getMonth() == Month.FEBRUARY &&
                bankTransaction.getAmount() >= 1000
        );
    }

    public static void collectSummary(final BankStatementProcessor bankStatementProcessor){
//        System.out.println(bankStatementProcessor.calculateTotalAmount());
//        System.out.println(bankStatementProcessor.selectInMonth(Month.JANUARY));
//        System.out.println(bankStatementProcessor.calculateTotalForCategory("Salary"));
//        System.out.println(bankStatementProcessor.selectWithCriteria("Salary"));
//        try {
//            System.out.println(bankStatementProcessor.selectWithCriteria(Month.SEPTEMBER,Month.MARCH));
//        }catch (Exception e){
//            e.getStackTrace();
//        }
    }

//    public static CharSequence collectSummaryForText(final BankStatementProcessor bankStatementProcessor){
////        double amount = bankStatementProcessor.calculateTotalAmount();
////        List<BankTransaction> bankTransactions = bankStatementProcessor.selectInMonth(Month.JANUARY);
////        double salary = bankStatementProcessor.calculateTotalForCategory("Salary");
////        List<Double> salary1 = bankStatementProcessor.selectWithCriteria("Salary");
////        try {
////            List<BankTransaction> bankTransactions1 = bankStatementProcessor.selectWithCriteria(Month.SEPTEMBER, Month.MARCH);
////        }catch (Exception e){
////            e.getStackTrace();
////        }
//        return String.format("%,.1f", amount,salary);
//    }

}

