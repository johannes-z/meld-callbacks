import { before, around } from 'meld'
import Proxy from './proxy.js'

const proxy = new Proxy()

const adviseLastArg = advisor => (object, match, cbAdvice) => {
  const advised = ({ args, proceedApply }) => {
    // Advise last argument:
    const callback = advisor(args[args.length - 1], cbAdvice)
    // Re-create and apply arguments:
    const newArgs = args.slice(0, args.length - 1).concat(callback)
    return proceedApply(newArgs)
  }
  return around(object, match, advised)
}

// Create a before advisor for the last argument.
const beforeCallback = adviseLastArg(before)

beforeCallback(
  proxy,
  'test',
  // This is your advice for the callback function:
  (...args) => console.log('advice called', ...args)
)

proxy.test((param1) => {
  console.log('cb called ... ' + param1)
})
