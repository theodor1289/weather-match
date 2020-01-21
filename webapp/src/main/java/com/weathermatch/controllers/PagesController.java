package com.weathermatch.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PagesController {

    @GetMapping(value={"/", "/index"})
    public String getHomePage(){
        return "index";
    }

    @GetMapping(value="/login")
    public String getLoginPage(){
        return "login";
    }

    @GetMapping(value="/logout-success")
    public String getLogoutPage(){
        return "logout";
    }
}
