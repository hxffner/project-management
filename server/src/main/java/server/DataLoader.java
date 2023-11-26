package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import server.controllers.AuthController;
import server.controllers.UserController;
import server.models.User;
import server.payload.request.SignupRequest;
import server.repository.UserRepository;

@Component
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;

    @Autowired
    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    PasswordEncoder passwordEncoder;
    public void run(ApplicationArguments args) {
        User userToSave = new User("user1", "firstName1", "lastName1", "user1@mail.com", passwordEncoder.encode("pwd1"), "avatarPath1");
        //userToSave.setRoles(Stream.of(new Role(RoleEnum.ROLE_USER)).collect(Collectors.toSet()));
        userRepository.save(userToSave);
    }
}