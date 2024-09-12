package com.moa.store.domain.store.repository;

import com.moa.store.domain.store.model.Store;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
