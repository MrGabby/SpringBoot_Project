package com.cropdeal.repository;

import com.cropdeal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAll();

    User findByEmailId(String emailId);

    User findByName(String name);
}
