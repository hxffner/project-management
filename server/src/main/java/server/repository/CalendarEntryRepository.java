package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.models.CalendarEntry;
import server.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarEntryRepository extends JpaRepository<CalendarEntry, Long> {
    Optional<CalendarEntry> findById(Long id);

    Optional<CalendarEntry> findByName(String name);

    List<CalendarEntry> findByProjectId(Long projectId);

    List<CalendarEntry> findByCreatedByUserId(Long userId);

    @Override
    List<CalendarEntry> findAll();

    // CalendarEntry save(CalendarEntry calendarEntry);

    void deleteById(Long id);
}
