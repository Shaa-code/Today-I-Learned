package org.example.util.Bank;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Month;
import java.util.List;

public class BankStatementAnalyzer {

    private static final BankStatementCSVParser bankStatementCSVParser = new BankStatementCSVParser();
    private static final String RESOURCES = "src/main/resources/";

    public static void main(final String... args) throws IOException {

        final String fileName = args[0];
        final Path path = Paths.get(RESOURCES + fileName);
        final List<String> lines = Files.readAllLines(path);

        final List<BankTransaction> bankTransactions = bankStatementCSVParser.parseLinesFromCSV(lines);
        final BankStatementProcessor bankStatementProcessor = new BankStatementProcessor(bankTransactions);

        collectSummary(bankStatementProcessor);

    }

    public static void collectSummary(final BankStatementProcessor bankStatementProcessor){
        System.out.println(bankStatementProcessor.calculateTotalAmount());
        System.out.println(bankStatementProcessor.selectInMonth(Month.JANUARY));
        System.out.println(bankStatementProcessor.calculateTotalForCategory("Salary"));
    }
}
