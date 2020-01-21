package com.weathermatch.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// loads user from database (a.k.a. repository)
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthUserGroupRepository authUserGroupRepository;

    public CustomUserDetailsService(UserRepository userRepository, AuthUserGroupRepository authUserGroupRepository){
        super();
        this.userRepository = userRepository;
        this.authUserGroupRepository = authUserGroupRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = this.userRepository.findByUsername(username);

        if(user==null){
            throw new UsernameNotFoundException("Cannot find username: " + username);
        }

        List<AuthUserGroup> authUserGroups = this.authUserGroupRepository.findByUsername(username);

        return new UserToPrincipal(user, authUserGroups);
    }
}
