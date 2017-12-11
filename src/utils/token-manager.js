class TokenManager {
  get() {
    return localStorage.getItem('token')
  }

  set(token) {
    return localStorage.setItem('token', token)
  }
}

const tm = new TokenManager()

export default tm