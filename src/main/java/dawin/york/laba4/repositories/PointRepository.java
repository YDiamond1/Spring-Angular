package dawin.york.laba4.repositories;

import dawin.york.laba4.entities.Point;
import dawin.york.laba4.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    Collection<Point> findAllByUser(User user);
}
