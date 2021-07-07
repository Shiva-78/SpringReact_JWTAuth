package com.springreactjwtauth.dto;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {

  private static final long serialVersionUID = 8317676219297719109L;

  private final String token;
  private final String role;

    public String getRole() {
	return role;
}

	public JwtTokenResponse(String token, String role) {
        this.token = token;
		this.role = role;
    }

    public String getToken() {
        return this.token;
    }
}