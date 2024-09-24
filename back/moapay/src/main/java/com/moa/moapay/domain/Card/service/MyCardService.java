package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.model.dto.MyCardInfoDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request);
}
