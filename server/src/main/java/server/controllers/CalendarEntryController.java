package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.models.*;
import server.payload.response.MessageResponse;
import server.repository.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.Date;
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

    @Autowired
    SubTaskRepository subTaskRepository;

    @PostMapping("/task/addSubTask/{id}")
    public Task addSubTaskToTask(@PathVariable Long id, @RequestBody SubTask subTask) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()) {
            if(task.get().addSubTask(subTask)) {
                subTaskRepository.save(subTask);
                taskRepository.save(task.get());
                return task.get();
            } else {
                return null;
            }
        } else {
            return null;
        }
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
    public List<Event> getEventByProjectId(@PathVariable(value="projectId") Long projectId) {
        return eventRepository.findByProjectId(projectId);
    }

    @GetMapping("/task/by_project/{projectId}")
    public List<Task> getTaskByProjectId(@PathVariable(value="projectId") Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Autowired
    UserRepository userRepository;

    @PostMapping("/event/create")
    public Event create(@RequestBody Event event, Principal principal) {
        event.setCreatedAt(new Date());
        event.setCreatedByUser(userRepository.findByUsername(principal.getName()).get());
        return eventRepository.save(event);
    }

    @PostMapping("/task/create")
    public Task create(@RequestBody Task task, Principal principal) {
        task.setCreatedAt(new Date());
        task.setCreatedByUser(userRepository.findByUsername(principal.getName()).get());
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

    //CHANGE HERE FOR YOUR OWN PATH PLS
    private final String pathString = "C:/Users/Marcell/Desktop/project-management/server/src/main/resources/files";
    private final Path filePath = Paths.get(pathString);

    @Autowired
    FileRepository fileRepository;

    @GetMapping("/files/{id}")
    public ResponseEntity<?> getFile(@PathVariable Long id) {
        Optional<UploadedFile> file = fileRepository.getUploadedFileById(id);
        if(file.isPresent()) {
            File fileToSend = new File(pathString + "/" + id + "." + file.get().getExtension());
            if (fileToSend.exists() && fileToSend.isFile())
                try {
                    return ResponseEntity.ok(Files.readAllBytes(fileToSend.toPath()));
                } catch (IOException exception) {
                    return ResponseEntity.badRequest().body(new MessageResponse("IOException while reading file"));
                }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Couldn't get file by id: " + id));
    }

    @PostMapping("/files/{taskId}")
    public ResponseEntity<?> uploadFile(@PathVariable Long taskId, @RequestBody MultipartFile file) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("No task with id: " + taskId));

        UploadedFile uploadedFile = fileRepository.save(new UploadedFile(file.getName(), StringUtils.getFilenameExtension(file.getOriginalFilename())));
        try {
            Files.copy(file.getInputStream(), filePath.resolve(uploadedFile.getId().toString() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename())), StandardCopyOption.REPLACE_EXISTING);
            task.get().addFileReference(uploadedFile);
            taskRepository.save(task.get());
            return ResponseEntity.ok(new MessageResponse("File uploaded"));
        } catch (IOException ex) {
            System.out.println("Ouch:/");
            fileRepository.delete(uploadedFile);
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Upload failed"));
        }
    }

    @DeleteMapping("/files/{taskId}/{fileId}.{extension}")
    public void deleteFile(@PathVariable(value = "fileId") Long id, @PathVariable(value = "extension") String extension, @PathVariable(value = "taskId") Long taskId) {
        try {
            Files.delete(filePath.resolve(id.toString() + "." + extension));
            UploadedFile file = fileRepository.getUploadedFileById(id).get();
            taskRepository.findById(taskId).get().dereferenceFile(file);
            fileRepository.delete(file);
        } catch (IOException ex) {
            System.out.println("Hihi");
            ex.printStackTrace();
        }
    }
}