package com.wadecalvin.spring.Controllers;

import com.wadecalvin.spring.Models.Posts;
import com.wadecalvin.spring.Repositories.PostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PostController {
    private  final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/posts")
    public List<Posts> getAllPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/posts/{id}")
    public  Posts getPost(@PathVariable Long id){
        return  postRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/posts/{id}")
    public List<Posts> deletePost(@PathVariable Long id){
        Posts posts = postRepository.findById(id).orElseThrow();
        postRepository.delete(posts);
        return postRepository.findAll();

    }
    @PostMapping("/posts")
    public Posts createPost(@RequestBody Posts posts){
        return  postRepository.save(posts);
    }

    @PatchMapping("/posts/{id}")
    public Posts updatePost(@PathVariable Long id, @RequestBody Posts posts){

        Posts currentPost = postRepository.findById(id).orElseThrow();
        if(currentPost!= null){
            currentPost.setTitle(posts.getTitle());
            currentPost.setDescription(posts.getDescription());
        }else{
            return  null;
        }
        return  postRepository.save(currentPost);
    }


}
