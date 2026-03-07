package com.wadecalvin.spring.Controllers;

import com.wadecalvin.spring.Models.LoginRequest;
import com.wadecalvin.spring.Models.Users;
import com.wadecalvin.spring.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UsersController {
    private  final UserRepository repo;
    private  final PasswordEncoder passwordEncoder;

    public UsersController(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;

        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public List<Users> getUsers(){
        return repo.findAll();

    }
    @GetMapping("/users/{id}")
    public Users getUser(@PathVariable Long id){
        return repo.findById(id).orElseThrow();

    }

    @PostMapping("/users")
    public Users createUsers(@RequestBody Users users){
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        return repo.save(users);
    }


    @DeleteMapping("/users/{id}")
    public List<Users> deleteUser(@PathVariable Long  id){
         repo.deleteById(id);
         return repo.findAll();
    }
    @PatchMapping("/users/{id}")
    public  Users updateUsers(@PathVariable Long id, @RequestBody Users users){

        Users existingUser = repo.findById(id).orElseThrow();
        if(existingUser!= null){

            existingUser.setName(users.getName());
            existingUser.setEmail(users.getEmail());
            existingUser.setPassword(users.getPassword());

        }else{
            return null;
        }

        return repo.save(existingUser);

    }

    @PostMapping("/login")
    public Users login(@RequestBody LoginRequest request){
        Users user = repo.findByEmail(request.getEmail());

        if(user == null){
            throw  new RuntimeException("User not found");
        }

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid  Password");
        }
        return user;

    }


}
