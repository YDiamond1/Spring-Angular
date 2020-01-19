package dawin.york.laba4.Services;

import dawin.york.laba4.entities.User;
import dawin.york.laba4.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username){
        return userRepository.findOneByUsername(username);
    }
    public User find(String login){
        return userRepository.findOneByUsername(login);
    }
    public User findByToken(String token){
        return userRepository.findByTokenEquals(token);
    }
    public User save(User user){
        return userRepository.save(user);
    }
    public void invalidateToken(String username) throws Exception{
        User user = userRepository.findOneByUsername(username);
        user.setToken(null);
        userRepository.save(user);
    }
}
