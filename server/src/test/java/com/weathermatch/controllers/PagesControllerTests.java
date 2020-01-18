package com.weathermatch.controllers;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
public class PagesControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Test
    public void retrieveCityDataWithMockMVC_AllCases() throws Exception {
        this.mockMvc.perform(get("/")).andDo(print()).andExpect(status().isOk());
        this.mockMvc.perform(get("/index")).andDo(print()).andExpect(status().isOk());
        this.mockMvc.perform(get("/login")).andDo(print()).andExpect(status().isOk());
        this.mockMvc.perform(get("/logout-success")).andDo(print()).andExpect(status().isOk());
        this.mockMvc.perform(get("/swagger-ui.html")).andDo(print()).andExpect(status().isOk());
        this.mockMvc.perform(get("/anything")).andDo(print()).andExpect(status().isFound());
        this.mockMvc.perform(get("/else")).andDo(print()).andExpect(status().isFound());
    }
}
