package server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany
    @JoinColumn(name = "related_tasks")
    private List<Task> relatedTasks = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "project_user",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> projectMembers = new ArrayList<>();

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "start_date")
    private Date startDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "end_date")
    private Date endDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "due_date")
    private Date dueDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at")
    private Date createdAt;

    @OneToOne
    @JoinColumn(name = "created_by_user_id")
    private User user;

    public Project(String name, String description, List<Task> relatedTasks, List<User> projectMembers, Date startDate, Date endDate, Date dueDate, Date createdAt, User user) {
        this.name = name;
        this.description = description;
        this.relatedTasks = relatedTasks;
        this.projectMembers = projectMembers;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.user = user;
    }

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Task> getRelatedTasks() {
        return relatedTasks;
    }

    public void setRelatedTasks(List<Task> relatedTasks) {
        this.relatedTasks = relatedTasks;
    }

    public List<User> getProjectMembers() {
        return projectMembers;
    }

    public void setProjectMembers(List<User> projectMembers) {
        this.projectMembers = projectMembers;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", relatedTasks=" + relatedTasks +
                ", projectMembers=" + projectMembers +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", dueDate=" + dueDate +
                ", createdAt=" + createdAt +
                ", user=" + user +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) &&
                Objects.equals(name, project.name) &&
                Objects.equals(description, project.description) &&
                Objects.equals(relatedTasks, project.relatedTasks) &&
                Objects.equals(projectMembers, project.projectMembers) &&
                Objects.equals(startDate, project.startDate) &&
                Objects.equals(endDate, project.endDate) &&
                Objects.equals(dueDate, project.dueDate) &&
                Objects.equals(createdAt, project.createdAt) &&
                Objects.equals(user, project.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, relatedTasks, projectMembers, startDate, endDate, dueDate, createdAt, user);
    }
}
