const PATH = {
  ROOT: "/",
  HOME: "/home",
  BIOMETRICS_LOGIN: "/biometrics-login", //nonav
  CREATE_ACCOUNT: "/create-account", //nonav
  PASSWORD_LOGIN: "/password-login", //nonav
  CARD_RECOMMEND: "/card-recommend",
  STATISTICS: "/statistics/",
  SETTING: "/setting",
  PAYMENT_RECOMMENDATION: "/payment-recommendation", //nonav
  STATISTICS_SAVING: "saving",
  STATISTICS_ANALYSIS: "analysis",
  STATISTICS_BENEFITS: "benefits",
  STATISTICS_CONSUMPTION: "consumption",
  USER_CARD_LIST: "/card-list", //nonav
  USER_CARD_DETAIL: "/card/:card_id", //nonav

  DUTCHPAY: "/dutchpay", //nonav
} as const;

export { PATH };
