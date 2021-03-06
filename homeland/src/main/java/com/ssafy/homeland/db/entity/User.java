package com.ssafy.homeland.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id = null;

    @Column(nullable = false)
    private String authority;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    String password;



}
