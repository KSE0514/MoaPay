import React, { useState } from "react";
import styled from "styled-components";

const CheckoutWrapper = styled.div`
  margin: 150px auto 30px;
  position: relative;
  width: 460px;
  background: white;
  border-radius: 15px;
  padding: 160px 45px 30px;
  box-shadow: 0 10px 40px hsla(0, 0, 0, 0.1);
`;

const CreditCardBox = styled.div`
  perspective: 1000;
  width: 400px;
  height: 280px;
  position: absolute;
  top: -112px;
  left: 50%;
  transform: translateX(-50%);
`;

const Flip = styled.div`
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
`;

const CardFront = styled.div`
  z-index: 2;
  transform: rotateY(0deg);
`;

const CardBack = styled.div`
  transform: rotateY(180deg);
`;

const CardLogo = styled.div`
  position: absolute;
  top: 9px;
  right: 20px;
  width: 60px;
  svg {
    width: 100%;
    height: auto;
    fill: #fff;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  color: hsl(0, 0, 20);
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  outline: none !important;
  border: 1px solid hsla(0, 0, 0, 0.3);
  box-shadow: inset 0 1px 4px hsla(0, 0, 0, 0.2);
`;

const Form = styled.form`
  fieldset {
    border: none;
    padding: 10px 0;
    position: relative;
    clear: both;
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(180deg, #49a09b, #3d8291);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-top: 90px;
  outline: none !important;
`;

const RegisterCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [cardHolder, setCardHolder] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [ccv, setCcv] = useState("");

  const handleCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    setCardNumber((prev) => {
      const newCardNumber = [...prev];
      newCardNumber[index] = value;
      return newCardNumber;
    });
  };

  return (
    <CheckoutWrapper>
      <CreditCardBox>
        <Flip>
          <CardFront>
            <div className="chip" />
            <CardLogo>{/* SVG for logo */}</CardLogo>
            <div className="number">{cardNumber.join(" ")}</div>
            <div className="card-holder">
              <label>Card holder</label>
              <div>{cardHolder}</div>
            </div>
            <div className="card-expiration-date">
              <label>Expires</label>
              <div>{`${expirationMonth}/${expirationYear}`}</div>
            </div>
          </CardFront>
          <CardBack>
            <div className="strip" />
            <CardLogo>{/* SVG for logo */}</CardLogo>
            <div className="ccv">
              <label>CCV</label>
              <div>{ccv}</div>
            </div>
          </CardBack>
        </Flip>
      </CreditCardBox>
      <Form autoComplete="off" noValidate>
        <fieldset>
          <label htmlFor="card-number">Card Number</label>
          {cardNumber.map((num, index) => (
            <Input
              key={index}
              type="text"
              maxLength={4}
              value={num}
              onChange={(e) => handleCardNumberChange(e, index)}
            />
          ))}
        </fieldset>
        <fieldset>
          <label htmlFor="card-holder">Card holder</label>
          <Input
            type="text"
            id="card-holder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="card-expiration-month">Expiration date</label>
          <select
            id="card-expiration-month"
            value={expirationMonth}
            onChange={(e) => setExpirationMonth(e.target.value)}
          >
            <option value="" disabled>
              Select Month
            </option>
            {/* Add month options here */}
          </select>
          <select
            id="card-expiration-year"
            value={expirationYear}
            onChange={(e) => setExpirationYear(e.target.value)}
          >
            <option value="" disabled>
              Select Year
            </option>
            {/* Add year options here */}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="card-ccv">CCV</label>
          <Input
            type="text"
            id="card-ccv"
            maxLength={3}
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
          />
        </fieldset>
        <Button type="submit">Submit</Button>
      </Form>
    </CheckoutWrapper>
  );
};

export default RegisterCard;
