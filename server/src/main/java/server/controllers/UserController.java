package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import server.models.User;
import server.repositroy.UserRepository;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/users")
    public List<User> fetchUserList() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{id}")
    public User getUserById(@PathVariable(value="id") Long id) {
        Optional<User> opt = userRepository.findById(id);
        return opt.orElse(null);
    }
}
