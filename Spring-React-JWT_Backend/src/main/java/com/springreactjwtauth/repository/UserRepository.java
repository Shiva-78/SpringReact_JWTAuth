package com.springreactjwtauth.repository;

import org.springframework.data.repository.CrudRepository;

import com.springreactjwtauth.entities.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {
	UserEntity findByUsername(String username);
}
