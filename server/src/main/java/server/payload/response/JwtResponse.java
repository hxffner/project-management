package server.payload.response;

public class JwtResponse {
    private String jwtToken;
    private String username;
    private String email;
    private String avatarPath;

    public JwtResponse() {
    }

    public JwtResponse(String jwtToken, String username, String email, String avatarPath) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.email = email;
        this.avatarPath = avatarPath;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
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

    @Override
    public String toString() {
        return "JwtResponse{" +
                "jwtToken='" + jwtToken + '\'' +
                "user: {" +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", avatarPath='" + avatarPath + '\'' +
                "}}";
    }
}