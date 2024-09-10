package com.moa.payment.domain.online.entity;

import com.moa.payment.domain.online.model.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="payment_log")
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PaymentLog {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "uuid", columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
    private UUID uuid; // 결제로그의 고유 id는 수정 불가

    @NotNull
    @Column(name = "card_id", columnDefinition = "binary(16)", nullable = false)
    private UUID cardId;

    @NotNull
    @Column(name = "amount")
    private long amount;

    @NotNull
    @Enumerated(value=EnumType.STRING)
    @Column(name="status")
    private Status status;

    @NotNull
    @Column(name = "merchant_id", columnDefinition = "binary(16)")
    private UUID merchantId;

    @NotNull
    @Column(name = "merchant_name", length=100)
    private String merchantName;

    @NotNull
    @Column(name = "category_id", columnDefinition = "char(5)")
    private String categoryId;

    @NotNull
    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @NotNull
    @Column(name = "benefit_balance")
    private long benefitBalance;
}