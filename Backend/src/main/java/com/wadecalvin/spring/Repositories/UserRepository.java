package com.wadecalvin.spring.Repositories;

import com.wadecalvin.spring.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
Users findByname(String name);

    Users findByEmail(String email);
}
