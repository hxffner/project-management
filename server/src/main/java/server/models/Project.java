package server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    private List<Task> related_tasks = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "project_user",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> project_members = new ArrayList<>();

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "start_date")
    private Date start_date;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "end_date")
    private Date end_date;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "due_date")
    private Date due_date;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at")
    private Date created_at;

    @OneToOne
    @JoinColumn(name = "created_by_user_id")
    private User user;

    public Project(String name, String description, List<Task> related_tasks, List<User> project_members, Date start_date, Date end_date, Date due_date, Date created_at, User user) {
        this.name = name;
        this.description = description;
        this.related_tasks = related_tasks;
        this.project_members = project_members;
        this.start_date = start_date;
        this.end_date = end_date;
        this.due_date = due_date;
        this.created_at = created_at;
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

    public List<Task> getRelated_tasks() {
        return related_tasks;
    }

    public void setRelated_tasks(List<Task> related_tasks) {
        this.related_tasks = related_tasks;
    }

    public List<User> getProject_members() {
        return project_members;
    }

    public void setProject_members(List<User> project_members) {
        this.project_members = project_members;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
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
                ", related_tasks=" + related_tasks +
                ", project_members=" + project_members +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", due_date=" + due_date +
                ", created_at=" + created_at +
                ", user=" + user +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) && Objects.equals(name, project.name) && Objects.equals(description, project.description) && Objects.equals(related_tasks, project.related_tasks) && Objects.equals(project_members, project.project_members) && Objects.equals(start_date, project.start_date) && Objects.equals(end_date, project.end_date) && Objects.equals(due_date, project.due_date) && Objects.equals(created_at, project.created_at) && Objects.equals(user, project.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, related_tasks, project_members, start_date, end_date, due_date, created_at, user);
    }
}
