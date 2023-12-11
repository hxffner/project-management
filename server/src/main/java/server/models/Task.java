package server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
public class Task extends CalendarEntry {
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "due_date")
    private Date dueDate;

    @Enumerated(EnumType.ORDINAL)
    private StatusEnum status = StatusEnum.IN_QUEUE;

    public Task(Project project, String name, String description, Date startDate, Date endDate, Date dueDate) {
        super(project, name, description, startDate, endDate);
        this.dueDate = dueDate;
        this.status = StatusEnum.IN_QUEUE;
    }

    public Task() {
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
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
                ", dueDate=" + dueDate +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Task task = (Task) o;
        return Objects.equals(dueDate, task.dueDate) &&
                Objects.equals(status, task.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), dueDate, status);
    }
}
