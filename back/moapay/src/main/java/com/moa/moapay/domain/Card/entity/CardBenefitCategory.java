package com.moa.moapay.domain.Card.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Entity
@Getter
@Builder(toBuilder = true)
@Table(name = "card_benefit_category")
@NoArgsConstructor
@AllArgsConstructor
public class CardBenefitCategory {

    @Id
    @Column(name = "id", columnDefinition = "char(5)")
    private String id;

    @NotNull
    @Column(name = "name")
    private String name;

}
