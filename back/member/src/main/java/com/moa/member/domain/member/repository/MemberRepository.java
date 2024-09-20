package com.moa.member.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moa.member.domain.member.model.Member;

public interface MemberRepository extends JpaRepository<Member,Long> {

	Optional<Member> findByPhoneNumber(String email);


}
