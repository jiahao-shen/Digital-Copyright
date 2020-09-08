import Cookies from 'js-cookie'

const TokenKey = 'user-token'
const InfoKey = 'user-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setInfoLocal(info) {
  return localStorage.setItem(InfoKey, JSON.stringify(info))
}

export function getInfoLocal() {
  return localStorage.getItem(InfoKey)
}

export function removeInfoLocal() {
  return localStorage.removeItem(InfoKey)
}