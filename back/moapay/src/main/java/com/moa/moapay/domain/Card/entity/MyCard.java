package com.moa.moapay.domain.Card.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name="my_card")
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class MyCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "uuid", columnDefinition = "binary(16)", nullable = false)
    private UUID uuid;

    @NotNull
    @Column(name = "cardNumber", unique = true)
    private String cardNumber;

    @NotNull
    @Column(name = "cvc")
    private String cvc;

    @NotNull
    @Column(name = "performance")
    private boolean performanceOk;

    @NotNull
    @Column(name = "card_limit")
    private Long cardLimit;

    @NotNull
    @Column(name = "charges")
    private Long charges;

    @NotNull
    @Column(name = "benefit_usage")
    private Long benefitUsage;

    @NotNull
    @Column(name = "member_id",  columnDefinition = "binary(16)")
    private UUID memberId;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private CardProduct cardProduct;
}
