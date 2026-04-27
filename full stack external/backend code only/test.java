package com.testing;

import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet("/apply")
public class ApplyServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

       
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

        
        String name = request.getParameter("name");

       
        System.out.println("Received name: " + name);

        
        response.getWriter().print("{\"message\": \"Success\"}");
    }
}
