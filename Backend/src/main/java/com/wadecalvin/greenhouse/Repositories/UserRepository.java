package com.wadecalvin.greenhouse.Repositories;

import com.wadecalvin.greenhouse.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
Users findByname(String name);

    Users findByEmail(String email);
}
