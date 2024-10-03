package com.moa.payment.domain.analysis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "analysis")
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


}
