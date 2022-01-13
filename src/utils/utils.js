const tokenExpiryMin = 30;
const tokenExpiryMs = tokenExpiryMin * 60000;

export const storeToken = (token) => {
  const tokenWExpiry = {
    value: token,
    expiry: Date.now() + tokenExpiryMs,
  }
  localStorage.setItem("token", JSON.stringify(tokenWExpiry));
}

export const getToken = () => {
  const tokenWExpiryStr = localStorage.getItem("token");

  if (!tokenWExpiryStr) {
    return null;
  } 
  const tokenWExpiry = JSON.parse(tokenWExpiryStr);
  if (Date.now() > tokenWExpiry.expiry) {
    localStorage.removeItem("token");
    return null;
  }
  return tokenWExpiry.value;
}

export const formatDate = (inputDate) => {
  let date = new Date(inputDate);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}