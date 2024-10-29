package org.ecommerce.ecommeerceshop.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.ecommeerceshop.exceptions.ResourceNotFoundException;
import org.ecommerce.ecommeerceshop.models.Category;
import org.ecommerce.ecommeerceshop.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {


    private final CategoryRepository categoryRepository;

    public List<Category> categories (){
        return categoryRepository.findAll();
    }
    public Category getCategoryById(Long id){
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent())
            return optionalCategory.get();
        throw new ResourceNotFoundException("Can't find category by that id");
    }
}
