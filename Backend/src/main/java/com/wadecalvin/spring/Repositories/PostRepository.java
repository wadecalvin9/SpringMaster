package com.wadecalvin.spring.Repositories;

import com.wadecalvin.spring.Models.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Posts, Long>{

    Posts findByid(Long id);
}
