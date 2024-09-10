package com.moa.domain.store.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.cglib.core.Local;

import com.fasterxml.uuid.Generators;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Column(columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
	//Generators.timeBasedEpochGenerator().generate()
	private UUID uuid;

	@NotNull
	@Column(name = "name", length = 50)
	private String name;

	@NotNull
	@Column(name = "category_id", columnDefinition = "char(5)")
	private String categoryId;

	@NotNull
	@Column(name = "admin_id", length = 20)
	private String adminId;

	@NotNull
	@Column(name = "admin_password", length = 50)
	private String adminPassword;

	@NotNull
	private LocalDateTime createTime;

	@NotNull
	private LocalDateTime updateTime;

	@Column(name = "merchant_url")
	private String merchantUrl;

	@PrePersist
	public void prePersist() {
		LocalDateTime now = LocalDateTime.now();
		this.createTime = now;
		this.updateTime = now;
	}

	@PreUpdate
	public void preUpdate() {
		this.updateTime = LocalDateTime.now();
	}
}
