package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.models.CalendarEntry;
import server.models.Event;
import server.models.Task;
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

    @PostMapping("/event/create")
    public Event create(@RequestBody Event event) {
        return calendarEntryRepository.save(event);
    }

    @PostMapping("/task/create")
    public Task create(@RequestBody Task task) {
        return calendarEntryRepository.save(task);
    }

    @PutMapping("/event/update")
    public Event update(@RequestBody Event event){
        return calendarEntryRepository.save(event);
    }

    @PutMapping("/task/update")
    public Task update(@RequestBody Task task){
        return calendarEntryRepository.save(task);
    }

    @DeleteMapping({"/event/delete/{id}", "/task/delete/{id}"})
    public void deleteById(@PathVariable(value="id") Long id){
        calendarEntryRepository.deleteById(id);
    }
}
