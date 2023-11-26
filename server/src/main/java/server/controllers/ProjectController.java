package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.models.Project;
import server.models.CalendarEntry;
import server.repository.ProjectRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
@RestController
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/projects")
    public List<Project> fetchProjectList() {
        return projectRepository.findAll();
    }

    @GetMapping("/projects/{id}")
    public Project getProjectById(@PathVariable(value="id") Long id) {
        Optional<Project> opt = projectRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/projects/by_user/{userId}")
    public List<Project> getProjectByUserId(@PathVariable(value="userId") Long userId) {
        return projectRepository.findByCreatedByUserId(userId);
    }

    @GetMapping("/projects/{id}/calendar-entries")
    public List<CalendarEntry> getCalendarEntriesForProject(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            return projectRepository.getCalendarEntries(project.get().getId());
        } else {
            return Collections.emptyList();
        }
    }

    @PostMapping("/projects")
    public Project create(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/projects")
    public Project update(@RequestBody Project project){
        return projectRepository.save(project);
    }

    @DeleteMapping("/projects/{id}")
    public void deleteById(@PathVariable(value="id") Long id){
        projectRepository.deleteById(id);
    }
}
