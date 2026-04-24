package com.jobportal;

import java.sql.Connection;
import com.jobportal.util.DBConnection;

public class hii {
    public static void main(String[] args) {
        Connection con = DBConnection.getConnection();

        if (con != null) {
            System.out.println("Connection Success");
        } else {
            System.out.println("Connection Failed");
        }
    }
}