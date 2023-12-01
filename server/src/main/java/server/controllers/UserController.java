package server.controllers;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.models.User;
import server.payload.response.MessageResponse;
import server.repository.UserRepository;

import java.nio.file.*;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private final String pathString = "C:/Users/sromeo/IdeaProjects/project-management/server/src/main/resources/static/images";

    private final Path imagePath = Paths.get(pathString);

    @GetMapping("/users")
    public List<User> fetchUserList(Principal principal) {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable(value="id") Long id) {
        Optional<User> opt = userRepository.findById(id);
        return opt.orElse(null);
    }

    @PostMapping("/users/upload-image")
    public ResponseEntity<?> uploadImageForUser(@RequestBody MultipartFile userAvatar, Principal principal) {
        try {
            if(userAvatar.isEmpty()){
                System.out.println("Empty");
            }

            Files.copy(userAvatar.getInputStream(), imagePath.resolve(principal.getName() + ".jpg"), StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(new MessageResponse("Succesful image upload"));
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Image upload failed");
        }
    }
}