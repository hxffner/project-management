package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.models.CalendarEntry;
import server.repository.CalendarEntryRepository;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
@RestController
public class CalendarEntryController {
    @Autowired
    private CalendarEntryRepository calendarEntryRepository;

    @GetMapping("/calendar-entries")
    public List<CalendarEntry> fetchCalendarEntryList() {
        return calendarEntryRepository.findAll();
    }

    @GetMapping("/calendar-entries/{id}")
    public CalendarEntry getCalendarEntryById(@PathVariable(value="id") Long id) {
        Optional<CalendarEntry> opt = calendarEntryRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/calendar-entries/by_user/{userId}")
    public List<CalendarEntry> getCalendarEntryByUserId(@PathVariable(value="userId") Long userId) {
        return calendarEntryRepository.findByCreatedByUserId(userId);
    }

    @PostMapping("/calendar-entries")
    public CalendarEntry create(@RequestBody CalendarEntry calendarEntry) {
        return calendarEntryRepository.save(calendarEntry);
    }

    @PutMapping("/calendar-entries")
    public CalendarEntry update(@RequestBody CalendarEntry calendarEntry){
        return calendarEntryRepository.save(calendarEntry);
    }

    @DeleteMapping("/calendar-entries/{id}")
    public void deleteById(@PathVariable(value="id") Long id){
        calendarEntryRepository.deleteById(id);
    }
}
