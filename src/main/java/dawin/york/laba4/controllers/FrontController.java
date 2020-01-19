package dawin.york.laba4.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class FrontController {

    @GetMapping(value = "/auth/**")
    public String auth(Map<String, Object> map){
        return "/index.html";
    }

    @GetMapping(value = "/main")
    public String main(Map<String, Object> map){
        return "/index.html";
    }
}
