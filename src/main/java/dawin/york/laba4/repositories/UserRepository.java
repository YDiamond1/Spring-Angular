package dawin.york.laba4.repositories;

import dawin.york.laba4.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findOneByUsername(String username);
    User findByTokenEquals(String token);
}
