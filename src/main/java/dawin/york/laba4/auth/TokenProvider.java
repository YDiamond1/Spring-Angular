package dawin.york.laba4.auth;

import dawin.york.laba4.Services.TokenService;
import dawin.york.laba4.Services.UserService;
import dawin.york.laba4.entities.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class TokenProvider {
    private final UserService userService;
    private final TokenService tokenService;

    public TokenProvider(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public String resolveToken(String username) {
        User user = userService.find(username);

        String token = null;

        if (user.getToken() != null)
            token = user.getToken();
        else
            token = tokenService.generateToken();

        user.setToken(token);
        userService.save(user);

        return token;
    }
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userService.findByToken(token);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Basic ")) {
            return bearerToken.substring(6);
        }
        return null;
    }
    public boolean validateToken(String token) {
        return userService.findByToken(token) != null;
    }


}
