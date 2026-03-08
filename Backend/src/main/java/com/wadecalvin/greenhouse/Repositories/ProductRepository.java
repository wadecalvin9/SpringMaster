package com.wadecalvin.greenhouse.Repositories;

import com.wadecalvin.greenhouse.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByid(Long id);

}
