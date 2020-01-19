package dawin.york.laba4.config;


import dawin.york.laba4.Services.UserService;
import dawin.york.laba4.auth.TokenFilter;
import dawin.york.laba4.auth.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class Webconfig extends WebSecurityConfigurerAdapter {


    private final TokenProvider tokenProvider;
    private final UserService userService;
    public Webconfig(TokenProvider provider, UserService userService){
        tokenProvider = provider;
        this.userService = userService;
    }

    @Bean
    public AuthenticationManager auth() throws Exception{
        return super.authenticationManagerBean();
    }
    @Autowired
    private TokenFilter tokenFilter;
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        auth.userDetailsService(userService).passwordEncoder(Encoder());
    }

    @Bean
    public BCryptPasswordEncoder Encoder(){
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/points/**").authenticated()
                .antMatchers(HttpMethod.POST, "/api/points/**").authenticated()
                .antMatchers(HttpMethod.POST, "/api/users/logout").authenticated()
                .anyRequest().permitAll()
                .and()
                .apply(new SecurityConfig(tokenProvider));
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:21651");

            }
        };
    }
}
