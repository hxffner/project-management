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

    public UploadedFile(String filename) {
        this.filename = filename;
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

    @Override
    public String toString() {
        return "UploadedFile{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                '}';
    }
}