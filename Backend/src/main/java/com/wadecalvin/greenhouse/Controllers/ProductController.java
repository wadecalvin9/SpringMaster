package com.wadecalvin.greenhouse.Controllers;

import com.wadecalvin.greenhouse.Models.Product;
import com.wadecalvin.greenhouse.Repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("localhost:3000")
@RequestMapping("/api")
@RestController
public class ProductController {

    private  final ProductRepository repo ;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){

        return repo.findAll();
    }

    @GetMapping("/products/{id}")
    public Product  getProduct(@PathVariable Long id){

        return repo.findById(id).orElseThrow(()-> new EntityNotFoundException("The Product Doesnt Exist"));

    }

    @PostMapping("/products")
    public  Product addNewProduct(@RequestBody Product product){

        return  repo.save(product);

    }
    @PutMapping("/products/{id}")
    public Product editProduct(@PathVariable Long id, @RequestBody Product product){

        Product current = repo.findById(id).orElseThrow();
        current.setTitle(product.getTitle());
        current.setDescription(product.getDescription());
        current.setImgurl(product.getImgurl());
        current.setPrice(product.getPrice());
        return repo.save(current);

    }
    @DeleteMapping("/products/{id}")
    public  void deleteProduct(@PathVariable Long id){
        
         repo.deleteById(id);
    }


}
