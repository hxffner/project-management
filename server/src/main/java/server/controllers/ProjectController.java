package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.models.Project;
import server.models.CalendarEntry;
import server.repository.ProjectRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/api/projects")
    public List<Project> fetchProjectList() {
        return projectRepository.findAll();
    }

    @GetMapping("/api/projects/{id}")
    public Project getProjectById(@PathVariable(value="id") Long id) {
        Optional<Project> opt = projectRepository.findById(id);
        return opt.orElse(null);
    }

    @GetMapping("/api/projects/by_user/{userId}")
    public List<Project> getProjectByUserId(@PathVariable(value="userId") Long userId) {
        return projectRepository.findByUserId(userId);
    }

    @GetMapping("/api/projects/{id}/calendar-entries")
    public List<CalendarEntry> getCalendarEntriesForProject(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            return projectRepository.getCalendarEntries(project.get().getId());
        } else {
            return Collections.emptyList();
        }
    }
}
