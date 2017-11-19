import development from './development.js'
import production from './production.js'

const isProduction = process.env.NODE_ENV === 'production'

export default isProduction ? production : development