package com.cropdeal.service;

import com.cropdeal.dto.UserDto;
import com.cropdeal.model.User;
import com.cropdeal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public User convertDtoToEntity(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setEmailId(userDto.getEmailId());
        user.setContact(userDto.getContact());
        user.setAddress(userDto.getAddress());
        user.setRoles(userDto.getRoles());
        user.setIsSubscribe(userDto.getIsSubscribe());
        return user;
    }

    public User getUserByEmailId(String emailId) {
        return userRepository.findByEmailId(emailId);
    }
}
