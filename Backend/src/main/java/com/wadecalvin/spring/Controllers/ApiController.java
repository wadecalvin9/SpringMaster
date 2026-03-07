package com.wadecalvin.spring.Controllers;

import com.wadecalvin.spring.Models.Photos;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    public Map<String, Photos> db = new HashMap<>(){{
        put("1",new Photos("1","helloworld.jpg"));
        put("2", new Photos("2", "wade photos.jpg"));
    }};

    @GetMapping("/photos")
    public Collection<Photos> getPhotos(){
        return db.values();
    }

    @GetMapping("/photos/{id}")
    public Photos getPhoto(@PathVariable String id){
        Photos photo = db.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return db.get(id);

    }


}
