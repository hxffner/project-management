package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.models.UploadedFile;

import java.util.Optional;

public interface FileRepository extends JpaRepository<UploadedFile, Long> {

    Optional<UploadedFile> getUploadedFileById(Long id);

    Optional<UploadedFile> getUploadedFileByFilename(String filename);
    UploadedFile save(UploadedFile uploadedFile);
}