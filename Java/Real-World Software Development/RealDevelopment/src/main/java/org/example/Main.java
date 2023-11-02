package org.example;

import org.example.util.BankCsvService;
import org.example.util.CsvReader;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class Main {
    public static void main(String[] args) throws UnsupportedEncodingException {
        CsvReader csvReader = CsvReader.getInstance();
        BankCsvService bankCsvService = new BankCsvService();
        List<List<String>> csvList = CsvReader.readCsv("History");
        System.out.println(csvList);
        System.out.println(bankCsvService.findAllIncome(csvList));
        System.out.println(bankCsvService.findAllOutcome(csvList));
        System.out.println(bankCsvService.countHistoryAtMonth(csvList,1));
        System.out.println(bankCsvService.findOutcomeTop10(csvList));
        System.out.println(bankCsvService.findTopOutcomeCategory(csvList));
    }
}