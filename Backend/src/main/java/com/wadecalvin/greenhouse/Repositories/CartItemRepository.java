package com.wadecalvin.greenhouse.Repositories;

import com.wadecalvin.greenhouse.Models.cartitem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<cartitem, Long > {
    List<cartitem> findByUserId(Long userId);
    Optional<cartitem> findByUserIdAndProductId(Long userId, Long productId);
}
