package com.jobportal.servlet;

import com.jobportal.dao.UserDAO;
import com.jobportal.model.User;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet("/user")
public class UserServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");

        String action = request.getParameter("action");

        if ("register".equals(action)) {

            User user = new User();
            user.setName(request.getParameter("name"));
            user.setEmail(request.getParameter("email"));
            user.setPassword(request.getParameter("password"));
            user.setRole("USER");

            boolean status = UserDAO.register(user);

            response.getWriter().print(status ? "Registered" : "Error");

        } else if ("login".equals(action)) {

            String email = request.getParameter("email");
            String password = request.getParameter("password");

            User user = UserDAO.login(email, password);

            if (user != null) {
                response.getWriter().print("Login Success");
            } else {
                response.getWriter().print("Invalid Credentials");
            }
        }
    }
}