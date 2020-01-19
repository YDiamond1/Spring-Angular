package dawin.york.laba4.model;

import dawin.york.laba4.entities.Point;
import org.springframework.stereotype.Service;

@Service
public class Graphic {
    private boolean isInArea(double x, double y, double r) {
        boolean triangle = x >= 0 && y <= 0 && y >= (x - r)/2;
        boolean square = x <= 0 && y <= 0 && x >= -1 * r && y >= -1* r/2;
        boolean sector = x >= 0 && y >= 0 && Math.sqrt(x*x + y*y) <= Math.sqrt(r*r);
        return triangle || square || sector;
    }

    public boolean isInArea(Point point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }
}
