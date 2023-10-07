package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.models.CalendarEntry;
import server.repository.CalendarEntryRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class CalendarEntryController {
    @Autowired
    private CalendarEntryRepository calendarEntryRepository;

    @GetMapping("/api/calendar-entries")
    public List<CalendarEntry> fetchCalendarEntryList() {
        return calendarEntryRepository.findAll();
    }

    @GetMapping("/api/calendar-entries/{id}")
    public CalendarEntry getCalendarEntryById(@PathVariable(value="id") Long id) {
        Optional<CalendarEntry> opt = calendarEntryRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/api/calendar-entries/by_user/{userId}")
    public List<CalendarEntry> getCalendarEntryByUserId(@PathVariable(value="userId") Long userId) {
        return calendarEntryRepository.findByUserId(userId);
    }
}
