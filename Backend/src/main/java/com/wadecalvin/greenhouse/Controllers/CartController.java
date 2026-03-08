package com.wadecalvin.greenhouse.Controllers;

import com.wadecalvin.greenhouse.Models.Product;
import com.wadecalvin.greenhouse.Models.cartitem;
import com.wadecalvin.greenhouse.Repositories.CartItemRepository;
import com.wadecalvin.greenhouse.Repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class CartController {
    private final CartItemRepository itemsrepo;
    private final ProductRepository productRepo;

    public CartController(CartItemRepository itemsrepo, ProductRepository productRepo) {
        this.itemsrepo = itemsrepo;
        this.productRepo = productRepo;
    }

    @GetMapping("/cart/products/user/{userId}")
    public List<cartitem> getProducts(@PathVariable Long userId) {
        return itemsrepo.findByUserId(userId);
    }

    @GetMapping("/cart/count/user/{userId}")
    public Integer getCartCount(@PathVariable Long userId) {
        return itemsrepo.findByUserId(userId).stream()
                .mapToInt(item -> item.getQuantity() != null ? item.getQuantity() : 0)
                .sum();
    }

    @PostMapping("/cart/products/add")
    public cartitem addToCart(@RequestBody cartitem newItem) {
        // Find the product to get the current price
        Product product = productRepo.findById(newItem.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if item already exists in cart for this user
        Optional<cartitem> existing = itemsrepo.findByUserIdAndProductId(
                newItem.getUser().getId(),
                product.getId()
        );

        if (existing.isPresent()) {
            cartitem current = existing.get();
            int qty = (current.getQuantity() != null ? current.getQuantity() : 0) + 
                      (newItem.getQuantity() != null ? newItem.getQuantity() : 1);
            current.setQuantity(qty);
            current.setTotal(qty * (product.getPrice() != null ? product.getPrice() : 0));
            return itemsrepo.save(current);
        } else {
            newItem.setProduct(product);
            int qty = newItem.getQuantity() != null ? newItem.getQuantity() : 1;
            newItem.setQuantity(qty);
            newItem.setTotal(qty * (product.getPrice() != null ? product.getPrice() : 0));
            return itemsrepo.save(newItem);
        }
    }

    @PostMapping("/cart/checkout/user/{userId}")
    public List<cartitem> checkoutUser(@PathVariable Long userId) {
        List<cartitem> userItems = itemsrepo.findByUserId(userId);
        for (cartitem item : userItems) {
            if (item.getProduct() != null && item.getQuantity() != null && item.getProduct().getPrice() != null) {
                item.setTotal(item.getQuantity() * item.getProduct().getPrice());
            }
        }
        return itemsrepo.saveAll(userItems);
    }
}
