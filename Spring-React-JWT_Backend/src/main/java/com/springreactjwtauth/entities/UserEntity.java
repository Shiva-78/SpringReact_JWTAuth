package com.springreactjwtauth.entities;

import java.util.Set;
import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "MST_User")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String username;
	@Column
	@JsonIgnore
	private String password;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "MAP_User_Role", joinColumns = {
            @JoinColumn(name = "USER_ID") }, inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID") })
    private Set<RolesEntity> roles;
	
	public Set<RolesEntity> getRoles() {
		return roles;
	}
	public void setRoles(Set<RolesEntity> roles) {
		this.roles = roles;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
