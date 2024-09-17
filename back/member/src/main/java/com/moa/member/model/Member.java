package com.moa.member.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name="member")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@NotNull
	@Column(name = "uuid", columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
	private UUID uuid; // 고유 id는 수정 불가

	@NotNull
	@Column(name = "name", length = 10, nullable=false)
	private String name;

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="birth_date",nullable=false)
	private LocalDate birthDate;

	@Column(name="gender",nullable=false)
	private char gender;

	@NotNull
	@Column(name="phone_number",nullable=false)
	private String phoneNumber;

	@Column(name="simple_password")
	private String simplePassword;

	@Lob
	@Column(name = "bio_info")
	private byte[] bioInfo;

	@Temporal(TemporalType.TIMESTAMP) //날짜와 시간 저장
	@Column(name="create_time",nullable=false)
	private LocalDateTime createTime;

	@Temporal(TemporalType.TIMESTAMP) //날짜와 시간 저장
	@Column(name="update_time",nullable=false)
	private LocalDateTime updateTime;

	@Column(name="email",nullable=false)
	private String email;

	@Column(name="address",nullable=false)
	private String address;


}
