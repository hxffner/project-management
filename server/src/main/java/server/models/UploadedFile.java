package server.models;

import jakarta.persistence.*;

@Entity
public class UploadedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "filename")
    private String filename;

    @Column(name = "extension")
    private String extension;

    public UploadedFile() {
    }

    public UploadedFile(String filename, String extension) {
        this.filename = filename;
        this.extension = extension;
    }

    public Long getId() {
        return id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    @Override
    public String toString() {
        return "UploadedFile{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", extension='" + extension + '\'' +
                '}';
    }
}