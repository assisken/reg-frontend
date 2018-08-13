import util from 'util'
import axios from 'axios'

export default {
  login () {
    let url = 'https://confid.ru/openid-connect/auth'
    let responseType = 'code'
    let clientId = 'students'
    let state = 'none'
    let redir = encodeURI('http://reg.mati.su/oidc_callback')
    let redirectUrl = util.format(
      '%s?response_type=%s&client_id=%s&state=%s&scope=email%20openid%20profile&redirect_uri=%s',
      url,
      responseType,
      clientId,
      state,
      redir
    )
    return redirectUrl
  },
  fetchToken (code) {
    let clientId = 'students'
    let clientSecret = 'StarchausMudak'
    let grantType = 'authorization_code'
    let redirectUri = encodeURI('http://reg.mati.su/oidc_callback')
    let url = 'https://confid.ru/openid-connect/token'
    let authHeader = util.format('Basic %s:%s', clientId, clientSecret)

    let headers = {
      Host: 'confid.ru',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: encodeURI(authHeader)
    }
    let data = util.format(
      'grant_type=%s&code=%s&redirect_uri=%s&client_id=%s&client_secret=%s',
      grantType,
      redirectUri,
      clientId,
      clientSecret,
      code
    )

    let token

    axios.post(url, data, headers).then(function (response) {
      console.log(response)
      token = response.content.access_token
    })
    return token
  }
}
