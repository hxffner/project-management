package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.models.SubTask;

public interface SubTaskRepository extends JpaRepository<SubTask, Long> {
    SubTask save(SubTask subTask);
}
