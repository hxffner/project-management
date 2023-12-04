package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.models.CalendarEntry;
import server.models.Event;
import server.models.Task;
import server.repository.CalendarEntryRepository;
import server.repository.EventRepository;
import server.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
@RestController
public class CalendarEntryController {
    @Autowired
    private CalendarEntryRepository calendarEntryRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TaskRepository taskRepository;

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

    @GetMapping("/event/all")
    public List<Event> getEveryEvent() {
        return eventRepository.findAll();
    }

    @GetMapping("/task/all")
    public List<Task> getEveryTask() {
        return taskRepository.findAll();
    }

    @GetMapping("/event/{id}")
    public Event getEventById(@PathVariable(value="id") Long id) {
        Optional<Event> opt = eventRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/task/{id}")
    public Task getTaskById(@PathVariable(value="id") Long id) {
        Optional<Task> opt = taskRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/event/{name}")
    public Event getEventByName(@PathVariable(value="name") String name) {
        Optional<Event> opt = eventRepository.findByName(name);
        return opt.orElse(null);
    }

    @GetMapping("/task/{name}")
    public Task getTaskByName(@PathVariable(value="name") String name) {
        Optional<Task> opt = taskRepository.findByName(name);
        return opt.orElse(null);
    }

    @GetMapping("/event/by_user/{userId}")
    public List<Event> getEventByUserId(@PathVariable(value="userId") Long userId) {
        return eventRepository.findByCreatedByUserId(userId);
    }

    @GetMapping("/task/by_user/{userId}")
    public List<Task> getTaskByUserId(@PathVariable(value="userId") Long userId) {
        return taskRepository.findByCreatedByUserId(userId);
    }

    @GetMapping("/event/by_project/{projectId}")
    public List<Event> getEventByProjectId(@PathVariable(value="userId") Long userId) {
        return eventRepository.findByProjectId(userId);
    }

    @GetMapping("/task/by_project/{projectId}")
    public List<Task> getTaskByProjectId(@PathVariable(value="userId") Long userId) {
        return taskRepository.findByProjectId(userId);
    }

    @PostMapping("/event/create")
    public Event create(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @PostMapping("/task/create")
    public Task create(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/event/update")
    public Event update(@RequestBody Event event){
        return eventRepository.save(event);
    }

    @PutMapping("/task/update")
    public Task update(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @DeleteMapping({"/event/delete/{id}"})
    public void deleteEventById(@PathVariable(value="id") Long id){
        eventRepository.deleteById(id);
    }

    @DeleteMapping({"/task/delete/{id}"})
    public void deleteTaskById(@PathVariable(value="id") Long id){
        taskRepository.deleteById(id);
    }
}
