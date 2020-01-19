package dawin.york.laba4.controllers;


import dawin.york.laba4.Services.UserService;
import dawin.york.laba4.auth.TokenProvider;
import dawin.york.laba4.data.ResponseMesssge;
import dawin.york.laba4.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    private Logger logger = LoggerFactory.getLogger(UserController.class);


    private final UserService userService;
    private final TokenProvider tokenProvider;
    @Autowired
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(UserService userService, TokenProvider tokenProvider, AuthenticationManager authenticationManager, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    @CrossOrigin
    @PostMapping(value = "/signup")
    public ResponseEntity<ResponseMesssge> signup(@RequestBody User newUser){
        if (newUser.getUsername() == null || newUser.getPassword() == null ||
                newUser.getPassword().trim().equals("") || newUser.getUsername().trim().equals("")) {
            logger.error("username or pass is null");
            return new ResponseEntity<>(new ResponseMesssge("Username or password is null"), HttpStatus.BAD_REQUEST);
        }

        if (userService.find(newUser.getUsername()) != null) {
            logger.error("username Already exist " + newUser.getUsername());
            return new ResponseEntity<>(new ResponseMesssge("User already exists"), HttpStatus.CONFLICT);
        }
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        userService.save(newUser);
        return new ResponseEntity<>(new ResponseMesssge("User successfully created"), HttpStatus.OK);

    }

    @CrossOrigin
    @PostMapping(value = "/login")
    public ResponseEntity<ResponseMesssge> login(@RequestBody User user){
        if(user.getUsername()!=null && user.getPassword()!=null){
            try{
                String username = user.getUsername();
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,user.getPassword()));
                String token = tokenProvider.resolveToken(username);
                return new ResponseEntity<>(new ResponseMesssge(token), HttpStatus.OK);
            }catch (AuthenticationException ex){
                return new ResponseEntity<>(new ResponseMesssge("Wrong user or password"), HttpStatus.UNAUTHORIZED);
            }
        }else {
            return new ResponseEntity<>(new ResponseMesssge("Username or password is null"), HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @PostMapping(value = "/logout")
    public ResponseEntity<ResponseMesssge> logout(Principal user){
        try {
            logger.info("user " + user.getName() + " logged out");
            userService.invalidateToken(user.getName());
            return new ResponseEntity<>(new ResponseMesssge("logout successful"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseMesssge(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

}
