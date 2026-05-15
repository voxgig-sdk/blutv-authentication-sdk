
import { Context } from './Context'


class BlutvAuthenticationError extends Error {

  isBlutvAuthenticationError = true

  sdk = 'BlutvAuthentication'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BlutvAuthenticationError
}

