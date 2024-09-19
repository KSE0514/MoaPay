package com.moa.member.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name="member")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@NotNull
	@Column(name = "uuid", columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
	private UUID uuid; // 고유 id는 수정 불가

	private String name;
	private LocalDate birthDate;
	private char gender;
	private String phoneNumber;
	private String simplePassword;

	@Lob
	@Column(name = "bio_info")
	private byte[] bioInfo;


}
