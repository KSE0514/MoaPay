package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.entity.CardProduct;
import com.moa.moapay.domain.card.entity.MyCard;
import com.moa.moapay.domain.card.model.dto.*;
import com.moa.moapay.domain.card.model.vo.PaymentResultCardInfoVO;
import com.moa.moapay.domain.card.repository.CardProductRepository;
import com.moa.moapay.domain.card.repository.MyCardQueryRepository;
import com.moa.moapay.domain.card.repository.MyCardRepository;
import com.moa.moapay.global.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyCardServiceImpl implements MyCardService {

    private final CardProductRepository cardProductRepository;
    private final MyCardQueryRepository myCardQueryRepository;
    private final RestClient restClient;
    private final MyCardRepository myCardRepository;

    @Override
    public List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request) {
        // todo: 여기서 쿠키를 뜯어서 UUID 찾기
        // 이건 테스트용
        UUID memberId = UUID.fromString("550e8400-e29b-41d4-a716-446655440000");

        List<MyCard> myCards = myCardQueryRepository.findAllByMemberIdWithBenefits(memberId);

        if (myCards.isEmpty()) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "등록된 카드가 없어요");
        }

        List<MyCardInfoDto> myCardsDto = myCards.stream().map(
                myCard -> {
                    List<CardBenefitDto> benefitDtos = myCard.getCardProduct().getBenefits().stream()
                            .map(benefit -> CardBenefitDto
                                    .builder()
                                    .categoryName(benefit.getCardBenefitCategory().getName())
                                    .benefitType(benefit.getBenefitType())
                                    .benefitUnit(benefit.getBenefitUnit())
                                    .benefitValue(benefit.getBenefitValue())
                                    .benefitDesc(benefit.getBenefitDesc())
                                    .benefitPoint(benefit.getBenefitPoint())
                                    .build())
                            .collect(Collectors.toList());

                    CardInfoResponseDto cardInfo = CardInfoResponseDto.builder()
                            .cardName(myCard.getCardProduct().getName())
                            .cardType(myCard.getCardProduct().getType())
                            .annualFee(myCard.getCardProduct().getAnnualFee())
                            .annualFeeForeign(myCard.getCardProduct().getAnnualFeeForeign())
                            .performance(myCard.getCardProduct().getPerformance())
                            .imageUrl(myCard.getCardProduct().getImageUrl())
                            .companyName(myCard.getCardProduct().getCompanyName())
                            .benefits(benefitDtos)
                            .build();

                    return MyCardInfoDto.builder()
                            .cvc(myCard.getCvc())
                            .cardNumber(String.valueOf(myCard.getCardNumber()))
                            .amount(myCard.getAmount())
                            .cardLimit(myCard.getCardLimit())
                            .benefitUsage(myCard.getBenefitUsage())
                            .performanceFlag(myCard.isPerformanceFlag())
                            .cardStatus(myCard.getCardStatus())
                            .cardInfo(cardInfo)
                            .build();
                }).collect(Collectors.toList());

        log.info("myCards size {}", myCards.size());
        return myCardsDto;
    }

    @Override
    public List<CardInfoResponseDto> getAllCard() {

        List<CardProduct> cards = myCardQueryRepository.findAll();

        List<CardInfoResponseDto> cardsDto = cards.stream().map(
                cardProduct -> {
                    List<CardBenefitDto> benefitDtos = cardProduct.getBenefits().stream()
                            .map(benefit -> CardBenefitDto
                                    .builder()
                                    .categoryName(benefit.getCardBenefitCategory().getName())
                                    .benefitUnit(benefit.getBenefitUnit())
                                    .benefitDesc(benefit.getBenefitDesc())
                                    .benefitValue(benefit.getBenefitValue())
                                    .benefitType(benefit.getBenefitType())
                                    .benefitPoint(benefit.getBenefitPoint())
                                    .build())
                            .collect(Collectors.toList());

                    return CardInfoResponseDto.builder()
                            .cardName(cardProduct.getName())
                            .cardType(cardProduct.getType())
                            .annualFee(cardProduct.getAnnualFee())
                            .annualFeeForeign(cardProduct.getAnnualFeeForeign())
                            .performance(cardProduct.getPerformance())
                            .companyName(cardProduct.getCompanyName())
                            .benefitTotalLimit(cardProduct.getBenefitTotalLimit())
                            .imageUrl(cardProduct.getImageUrl())
                            .benefits(benefitDtos)
                            .build();
                }
        ).collect(Collectors.toList());

        return cardsDto;
    }

    @Override
    public void renewCardInfo(List<PaymentResultCardInfoVO> renewList) {
        for (PaymentResultCardInfoVO vo : renewList) {
            // 맞지 않는 부분이 있다면, 현재 값을 기준으로 갱신해주는 게 맞을 것 같긴 한데...
            MyCard myCard = myCardRepository.findByUuid(vo.getCardId())
                    .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다."));
            log.info("found myCard : {}", myCard.getUuid());
            long amount = myCard.getAmount();
            long benefitUsage = myCard.getBenefitUsage();
            MyCard newCard = myCard.toBuilder()
                    .performanceFlag(vo.isBenefitActivated())
                    .amount(amount + vo.getAmount())
                    .benefitUsage(benefitUsage + vo.getBenefitBalance())
                    .build();
            myCardRepository.save(newCard);
        }
    }

    public List<GetMyCardsResponseDto> getMyCardFromCardBank(GetMyCardsRequestDto getMyCardsRequestDto) {

        // TODO : 맴버 인증 과정 추가 내 카드목록 마이데이터 불러오기전

        Map<String, UUID> member = new HashMap<>();
        member.put("memberUuid", getMyCardsRequestDto.getMemberUuid());

        // 카드 뱅크에서 내 카드 목록을 가져오기 위한 REST API 호출
        ResponseEntity<Map> responseEntity = restClient.post()
                .uri("http://localhost:18100/cardbank/card/getMyCards")
                .contentType(MediaType.APPLICATION_JSON)
                .body(member)
                .retrieve()
                .toEntity(Map.class);

        // 응답 상태 코드 확인
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            Map responseBody = responseEntity.getBody();

            // 응답 로그 출력
            log.info("Response from Card Bank: {}", responseBody);

            // TODO: responseBody에서 CardInfoResponseDto 리스트 생성 로직 추가
            List<Map<String, Object>> cards = (List<Map<String, Object>>) responseBody.get("data");

            List<GetMyCardsResponseDto> cardInfoResponseDtos = cards.stream().map(
                    card -> {
                        Map<String, Object> cardProduct = (Map<String, Object>) card.get("cardProduct");
                        Map<String, Object> account = (Map<String, Object>) card.get("accounts");

                        // Number를 사용하여 Long으로 안전하게 변환
                        CardProductDto cardProductDto = CardProductDto.builder()
                                .cardProductUuid(UUID.fromString(cardProduct.get("cardProductUuid").toString()))
                                .cardProductName(cardProduct.get("cardProductName").toString())
                                .cardProductType(cardProduct.get("cardProductType").toString())
                                .cardProductPerformance(((Number) cardProduct.get("cardProductPerformance")).longValue())
                                .cardProductAnnualFee(((Number) cardProduct.get("cardProductAnnualFee")).longValue())
                                .cardProductAnnualFeeForeign(((Number) cardProduct.get("cardProductAnnualFeeForeign")).longValue())
                                .cardProductBenefitTotalLimit(((Number) cardProduct.get("cardProductBenefitTotalLimit")).longValue())
                                .cardProductCompanyName(cardProduct.get("cardProductCompanyName").toString())
                                .cardProductImgUrl(cardProduct.get("cardProductImgUrl").toString())
                                .build();

                        AccountDto accountDto = AccountDto.builder()
                                .accountUuid(UUID.fromString(account.get("accountUuid").toString()))
                                .accountNumber(account.get("accountNumber").toString())
                                .balance(((Number) account.get("balance")).longValue())
                                .build();

                        return GetMyCardsResponseDto.builder()
                                .uuid(UUID.fromString(card.get("uuid").toString()))
                                .cardLimit(((Number) card.get("cardLimit")).longValue())
                                .cvc(card.get("cvc").toString())
                                .cardNumber(card.get("cardNumber").toString())
                                .benefitUsage(((Number) card.get("benefitUseage")).longValue())
                                .amount(((Number) card.get("amout")).longValue())
                                .performanceFlag((Boolean) card.get("performanceFlag"))
                                .cardProduct(cardProductDto)
                                .account(accountDto)
                                .build();
                    }
            ).toList();
            return cardInfoResponseDtos;
        } else {
            log.error("Failed to retrieve cards: {}", responseEntity.getStatusCode());
        }

        return null;
    }

    @Override
    @Transactional
    public void registrationCard(CardRegistrationRequestDto registrationRequestDto) {

        List<MyCard> myCards = myCardRepository.findAllByMemberId(registrationRequestDto.getMemberUuid());

        for(MyCard myCard : myCards) {
            if(myCard.getCardNumber().equals(registrationRequestDto.getCardNumber())) {
                throw new BusinessException(HttpStatus.CONFLICT, "카드 데이터가 이미 존재합니다.");
            }
        }

        try {
            ResponseEntity<CardRestWrapperDto> responseEntity = restClient.post()
                    .uri("http://localhost:18100/cardbank/card/registration")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(registrationRequestDto)
                    .retrieve()
                    .toEntity(CardRestWrapperDto.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                CardRestTemplateDto cardData = responseEntity.getBody().getData();
                log.info("cardData = {} ", cardData);

                // 이제 카드 상품 받았으니 저장해야지
                UUID memberUuid = registrationRequestDto.getMemberUuid();
                CardProduct cardProduct = cardProductRepository.findByUuid(cardData.getCardProductUuid());

                MyCard myCard = MyCard.builder()
                        .uuid(UUID.randomUUID())
                        .cardNumber(cardData.getCardNumber())
                        .cvc(cardData.getCvc())
                        .cardProduct(cardProduct)
                        .performanceFlag(cardData.isPerformanceFlag())
                        .amount(cardData.getAmount())
                        .benefitUsage(cardData.getBenefitUsage())
                        .cardLimit(cardData.getCardLimit())
                        .memberId(memberUuid)
                        .build();

                myCardRepository.save(myCard);
            }
        } catch (HttpClientErrorException e) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "카드사에 해당 상품이 없습니다.");
        }

    }

    /**
     * 카드 비활성화
     * @param disableCardRequestDto
     */
    @Override
    public void disableCard(MyCardStatusRequestDto disableCardRequestDto) {

        List<MyCard> myCards = myCardRepository.findAllByMemberId(disableCardRequestDto.getMemberUuid());
        boolean cardExists = myCards.stream()
                .anyMatch(myCard -> myCard.getCardNumber().equals(disableCardRequestDto.getCardNumber()));

        if (cardExists) {
            myCardRepository.updateCardStatus(disableCardRequestDto.getCardNumber(), false);
        } else {
            throw new BusinessException(HttpStatus.NOT_FOUND, "요청하신 카드가 없습니다.");
        }
    }

    /**
     * 카드 활성화
     * @param ableCardRequestDto
     */
    @Override
    public void ableCard(MyCardStatusRequestDto ableCardRequestDto) {
        List<MyCard> myCards = myCardRepository.findAllByMemberId(ableCardRequestDto.getMemberUuid());
        boolean cardExists = myCards.stream()
                .anyMatch(myCard -> myCard.getCardNumber().equals(ableCardRequestDto.getCardNumber()));

        if (cardExists) {
            myCardRepository.updateCardStatus(ableCardRequestDto.getCardNumber(), true);
        } else {
            throw new BusinessException(HttpStatus.NOT_FOUND, "요청하신 카드가 없습니다.");
        }
    }
}


