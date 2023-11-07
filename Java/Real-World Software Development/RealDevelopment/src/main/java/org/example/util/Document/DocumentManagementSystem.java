package org.example.util.Document;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class DocumentManagementSystem {

    private final List<Document> documents = new ArrayList<>();
    private final List<Document> documentsView = Collections.unmodifiableList(documents);
    private final Map<String, Importer> extensionToImporter = new HashMap<>();

    public DocumentManagementSystem(){
//        extensionToImporter.put("letter", new LetterImporter());
        extensionToImporter.put("report", new ReportImporter());
        extensionToImporter.put("jpg",new ImageImporter());
    }

    public void importFile(final String path) throws IOException {
        final File file = new File(path);
        if (!file.exists()){
            throw new FileNotFoundException(); //1. 경로에 파일이 아예 없는 경우
        }

        final int separatorIndex = path.lastIndexOf(".");
        if (separatorIndex != -1){
            if(separatorIndex == path.length()){ //2. 파일은 있는데 확장자가 틀린 경우
                throw new UnknownFileTypeException("No extension found for File");
            }
            final String extension = path.substring(separatorIndex + 1);
            final Importer importer = extensionToImporter.get(extension);
            if (importer == null){ //3. 확장자에 해당하는 Importer가 없는 경우
                throw new UnknownFileTypeException("For file: " + path);
            }

            final Document document = importer.importFile(file);
            documents.add(document);
        } else {
            throw new UnknownFileTypeException("No extension found for file: " + path);
        }
    }

    public List<Document> contents(){
        return documentsView;
    }

    public List<Document> search(final String query){
        return documents.stream()
                .filter(Query.parse(query))
                .collect(Collectors.toList());
    }
}
