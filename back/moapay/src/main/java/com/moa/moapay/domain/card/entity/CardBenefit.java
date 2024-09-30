    package com.moa.moapay.domain.card.entity;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotNull;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import org.hibernate.annotations.BatchSize;

    import java.util.UUID;

    @Entity
    @Table(name = "card_benefit")
    @Builder(toBuilder = true)
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @BatchSize(size = 100)
    public class CardBenefit {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private long id;

        @Column(name = "uuid", columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
        private UUID uuid;

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "product_id", referencedColumnName = "id")
        private CardProduct cardProduct;

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", referencedColumnName = "id")
        private CardBenefitCategory cardBenefitCategory;

        @NotNull
        @Enumerated(EnumType.STRING)
        @Column(name = "category_type")
        private CategoryType categoryType;

        @NotNull
        @Enumerated(EnumType.STRING)
        @Column(name = "benefit_type")
        private BenefitType benefitType;

        @NotNull
        @Column(name = "benefit_value")
        private float benefitValue;

        @Column(name = "benefit_desc")
        private String benefitDesc;

        @Column(name = "benefit_point")
        private int benefitPoint;

        @Override
        public String toString() {
            return "CardBenefit{" +
                    "id=" + id +
                    ", uuid=" + uuid +
                    ", cardProduct=" + cardProduct +
                    ", cardBenefitCategory=" + cardBenefitCategory +
                    ", categoryType=" + categoryType +
                    ", benefitType=" + benefitType +
                    ", benefitValue=" + benefitValue +
                    ", benefitDesc='" + benefitDesc + '\'' +
                    ", benefitPoint=" + benefitPoint +
                    '}';
        }
    }
