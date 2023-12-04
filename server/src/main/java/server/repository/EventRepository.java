package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.models.Event;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findById(Long id);

    Optional<Event> findByName(String name);

    List<Event> findByProjectId(Long projectId);

    List<Event> findByCreatedByUserId(Long userId);

    @Override
    List<Event> findAll();

    // Event save(Event event);

    void deleteById(Long id);
}
