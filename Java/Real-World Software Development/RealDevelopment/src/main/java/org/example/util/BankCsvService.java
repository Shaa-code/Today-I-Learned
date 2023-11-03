package org.example.util;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class BankCsvService {

    public int findAllIncome(List<List<String>> csvList){
        return csvList.stream()
                .mapToInt(list -> Integer.parseInt(list.get(1)))
                .filter(i -> i > 0)
                .sum();
    }

    public int findAllOutcome(List<List<String>> csvList){
        return Math.abs(csvList.stream()
                .mapToInt(list -> Integer.parseInt(list.get(1)))
                .filter(i -> i < 0)
                .sum());
    }

    public long countHistoryAtMonth(List<List<String>> csvList, int targetMonth){
        return csvList.stream()
                .filter(list -> list.get(0).matches(".*-" + String.format("%02d",targetMonth) + "-\\d{4}"))
                .count();
    }

    public List<List<String>> findOutcomeTop10(List<List<String>> csvList){
        return csvList.stream()
                .filter(list ->{
                    try {
                        return Integer.parseInt(list.get(1)) < 0;
                    } catch (NumberFormatException e){
                        return false;
                    }
                })
                .sorted((list1, list2) -> {
                    int amount1 = Integer.parseInt(list1.get(1));
                    int amount2 = Integer.parseInt(list2.get(1));
                    return Integer.compare(amount1, amount2);
                })
                .limit(10)
                .collect(Collectors.toList());
    }

    public String findTopOutcomeCategory(List<List<String>> csvList){
        return csvList.stream()
                .filter( list -> {
                    try {
                        return Integer.parseInt(list.get(1)) < 0;
                    } catch(NumberFormatException e){
                        return false;
                    }
                })
                .min(Comparator.comparing(list -> Integer.parseInt(list.get(1))))
                .map(list -> list.get(2))
                .orElse("No top outcome Found.");

    }

}