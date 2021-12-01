const handler = {
  get (alvo, chave) {
    const value = Reflect.get(alvo, chave)
    if (typeof value === 'object') {
      return new Proxy(value, handler)
    }

    return value
  },

  set (target, property, value, receiver) {
    Reflect.set(target, property, value)
    // target[property] = value
    console.log('passou no set')
    return true
  }
}
// const handler = {
//   get (alvo, chave) {
//     const value = Reflect.get(alvo, chave)
//     if (typeof value === 'object' || typeof value === 'function') {
//       return new Proxy(value, handler)
//     }
//     if (value) return value
//     else throw new Error(`A propriedade ${chave} não existe`)
//   },

//   set (target, property, value, receiver) {
//     Reflect.set(target, property, value)
//     // target[property] = value
//     console.log('passou no set');
//     return true
//   },

//   apply: function(target, thisArg, argumentsList) {
//     console.log('thisArg', thisArg, 'argumentsList', argumentsList);
//     console.log(`Calculate sum: ${argumentsList}`);

//     return target(argumentsList[0], argumentsList[1]) * 10;
//   }
// }

const state = new Proxy({}, handler)

// function sum(a, b) {
//   return a + b;
// }

// const myfunc = new Proxy(sum, handler)

function observerEdu (obj) {
  return new Proxy(obj, handler)
}

const ob = { name: 'Carla' }

//Interceptando métodos JS

// cache a  reference for original
// Array push method
var _push = Array.prototype.push

// define your own push method
Array.prototype.push = function (item) {
  // before Array push is called
  console.log('pushing ', item, ' into ', this)

  for (arg in arguments) {
    console.log('fdp', arguments[arg])
    arguments[arg] = arguments[arg].toUpperCase()
  }

  // call original Array push method
  _push.apply(this, arguments)

  // do whatever you like after
  // the push has been called
  if (this.length > 1000) {
    console.warn('potential memory leak going on here!!', this)
  } else console.warn('de boa')
}



const apply_func = {
  get (alvo, chave) {
    const value = Reflect.get(alvo, chave)
    if (typeof value === 'object' || typeof value === 'function') {
      return new Proxy(value, apply_func)
    }

    return value
  },
  apply: function (target, thisArg, argumentsList) {
    console.log('passei no trap apply')

    return Reflect.apply(target, thisArg, argumentsList)

    // const valReturn = Reflect.apply(target, thisArg, argumentsList)
    // return valReturn.add(2, 'days');
  }
}

const dateTeste = new Proxy(
  dayjs,
  apply_func
)
