export const patterns = {
  personName: /^[\u0600-\u06FFa-zA-Z\s]+$/,

  persianOnly: /^[\u0600-\u06FF\s]+$/,

  username: /^[a-zA-Z0-9_]+$/,

  iranMobile: /^09\d{9}$/,

  nationalId: /^\d{10}$/,

  address: /^[\u0600-\u06FFa-zA-Z0-9\s.,\-\/]+$/,

  postalCode: /^\d{10}$/,

  noHtmlTags: /^(?!.*<[^>]+>).*$/,

  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/,
};
