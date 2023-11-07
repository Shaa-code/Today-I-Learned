package org.example.util.Document;

public class TeethImage extends DocumentCommon{

    private byte[] TeethImage;

    private byte[] XRayImage;

    public byte[] getTeethImage() {
        return TeethImage;
    }

    public void setTeethImage(byte[] teethImage) {
        TeethImage = teethImage;
    }

    public byte[] getXRayImage() {
        return XRayImage;
    }

    public void setXRayImage(byte[] XRayImage) {
        this.XRayImage = XRayImage;
    }
}
