package org.example.util.Document;

import java.io.File;
import java.io.IOException;

public interface Importer {

    Document importFile(File file) throws IOException;
}
