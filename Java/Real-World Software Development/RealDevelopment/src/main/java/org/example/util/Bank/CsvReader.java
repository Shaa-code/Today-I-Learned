package org.example.util.Bank;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CsvReader {
    private static final CsvReader csvReader = new CsvReader();
    private CsvReader(){}
    public static CsvReader getInstance() {
        return csvReader;
    }
    private static final String defaultPath = "C:/Users/Shaa/Desktop/";
    public static List<List<String>> readCsv(String csvFileName){
        File csv = new File(defaultPath + csvFileName + ".csv");
        List<List<String>> csvList = new ArrayList<>();
        BufferedReader br = null;
        String line = "";

        try{
            br = new BufferedReader(new FileReader(csv));
            while((line = br.readLine()) != null){
                List<String> aLine = new ArrayList<>();
                String[] lineArr = line.split("\\t");
                aLine = Arrays.asList(lineArr);
                csvList.add(aLine);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try{
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return csvList;
    }
}