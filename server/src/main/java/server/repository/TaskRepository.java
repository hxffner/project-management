package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.models.Task;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);

    Optional<Task> findByName(String name);

    List<Task> findByProjectId(Long projectId);

    List<Task> findByCreatedByUserId(Long userId);

    @Override
    List<Task> findAll();

    // Task save(Task task);

    void deleteById(Long id);
}
