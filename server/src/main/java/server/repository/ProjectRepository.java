package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import server.models.Project;
import server.models.CalendarEntry;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findById(Long id);

    Optional<Project> findByName(String name);

    List<Project> findByUserId(Long userId);

    @Override
    List<Project> findAll();

    @Query("SELECT ce FROM CalendarEntry ce WHERE ce.project.id = ?1")
    List<CalendarEntry> getCalendarEntries(Long id);
}
