package Document;

import org.example.util.Document.Documents;
import org.example.util.Document.Mail;
import org.example.util.Document.Report;
import org.example.util.Document.TeethImage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;



public class DocumentTest {


    @Test
    @DisplayName("문서 검색 작동 테스트")
    public void DocumentContainsTest() {

        //Given
        Documents documents = new Documents();

        Mail mail = new Mail();
        mail.setMailDescription("Joe Bloggs123");

        Report report = new Report();
        report.setConsultDescription("Joe Blog123");

        TeethImage teethImage = new TeethImage();

        documents.setMail(mail);
        documents.setReport(report);
        documents.setTeethImage(teethImage);

        //When
        Documents documents1 = null;
        try {
            documents1 = (Documents) documents.findDocument("Joe Bloggs");
        } catch (ClassNotFoundException e) {
            e.getStackTrace();
        }

        //Then
        Assertions.assertEquals(documents1.getMail(),documents.getMail());
    }
}
