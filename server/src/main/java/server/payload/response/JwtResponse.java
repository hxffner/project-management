package server.payload.response;

import java.util.Date;

public class JwtResponse {
    private String jwtToken;
    private String username;
    private Long userId;
    private String email;
    private String avatarPath;

    private Date createdAt;

    public JwtResponse() {
    }

    public JwtResponse(String jwtToken, Long userId, String username, String email, String avatarPath, Date createdAt) {
        this.jwtToken = jwtToken;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.avatarPath = avatarPath;
        this.createdAt = createdAt;

    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "jwtToken='" + jwtToken + '\'' +
                "user: {" +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", avatarPath='" + avatarPath + '\'' +
                ", createdAt='" + createdAt + '\'' +
                "}}";
    }
}