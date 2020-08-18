import Cookies from 'js-cookie'
import {parseStrEmpty} from "./index";

const TokenKey = 'token';

export function getToken() {
  return parseStrEmpty(Cookies.get(TokenKey))
}

export function setToken(token,day = 7) {
  console.log('token---',day);
  return Cookies.set(TokenKey, token, { expires: day })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
