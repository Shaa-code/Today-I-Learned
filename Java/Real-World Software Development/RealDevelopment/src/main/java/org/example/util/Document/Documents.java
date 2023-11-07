package org.example.util.Document;

public class Documents {

    private Mail mail;

    private Report report;

    private TeethImage teethImage;

    public Object findDocument(String targetDescription) throws ClassNotFoundException {

        final String mailDescription = mail.getMailDescription();

        if (mailDescription.contains(targetDescription)){
            return mail;
        }

        final String reportConsultDescription = report.getConsultDescription();

        if (reportConsultDescription.contains(targetDescription)){
            return reportConsultDescription;
        }

        throw new ClassNotFoundException("Can't Find Document");
    }

    public Mail getMail() {
        return mail;
    }

    public void setMail(Mail mail) {
        this.mail = mail;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public TeethImage getTeethImage() {
        return teethImage;
    }

    public void setTeethImage(TeethImage teethImage) {
        this.teethImage = teethImage;
    }
}
