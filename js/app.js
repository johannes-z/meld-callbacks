import { before, around } from 'meld'
import Proxy from './proxy.js'

const proxy = new Proxy()

const adviseLastArg = advisor => (object, match, cbAdvice) => {
  const advice = ({ args, proceedApply }) => {
    // Advise last argument:
    const callback = advisor(args[args.length - 1], cbAdvice)
    // Re-create and apply arguments:
    const newArgs = args.slice(args.length - 1).concat(callback)
    return proceedApply(newArgs)
  }
  return around(object, match, advice)
}

// Create a before advisor for the last argument.
const beforeCallback = adviseLastArg(before)

beforeCallback(
  proxy,
  'test',
  // This is your advice for the callback function:
  (...args) => console.log(...args)
)

proxy.test(() => {
  console.log('cb called ...')
})
