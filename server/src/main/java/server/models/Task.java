package server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;
import java.util.Objects;

public class Task extends CalendarEntry {
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "due_date")
    private Date due_date;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusEnum status;

    public Task(Project project, String name, String description, Date start_date, Date end_date, Date due_date) {
        super(project, name, description, start_date, end_date);
        this.due_date = due_date;
    }

    public Task(Date due_date) {
        this.due_date = due_date;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Task{" +
                super.toString() +
                "due_date=" + due_date +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Task task = (Task) o;
        return Objects.equals(due_date, task.due_date) && Objects.equals(status, task.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), due_date, status);
    }
}
