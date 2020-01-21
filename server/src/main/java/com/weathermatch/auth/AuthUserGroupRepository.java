package com.weathermatch.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthUserGroupRepository extends JpaRepository<AuthUserGroup, Long> {
    List<AuthUserGroup> findByUsername(String username);
}