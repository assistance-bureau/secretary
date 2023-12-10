package com.assistancebureau.secretary.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class UserController {

    @GetMapping("/")
    public String test() {
        return "Hello World";
    }
}
