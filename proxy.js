const _state = {
  casa: 'Minha',
  // congelado: Object.freeze({valor: 'não pode alterar'})
}

const handler = {
  get: function (alvo, chave) {
    // console.log('passou no proxy list', (alvo, chave))
    const value = Reflect.get(alvo, chave)
    if (typeof value === 'object') {
      return new Proxy(value, handler)
    }
    if (value) return value
    else throw new Error(`Propriedade ${chave} não existe`)
  },

  set: function (alvo, chave, novoValor) {
    console.log('Passei no set')
    Reflect.set(alvo, chave, novoValor)
    return true
  },

  has (alvo, chave) {
    if (chave === 'teste') {
      return false
    }
    return chave in alvo
  },

  defineProperty (alvo, chave, value) {
    console.log('Define property', chave, value)
    Reflect.defineProperty(alvo, chave, {
      value: 10,
      enumerable: false,
      configurable: true
    })
    return true
  },

  deleteProperty (alvo, chave) {
    console.log('deletandooooooo', chave, alvo[chave])
    Reflect.deleteProperty(alvo, chave)
    return true
  }
}

const state = new Proxy(_state, handler)


console.log(state.user = 'Fulano');
// console.log(state.foo);


console.log('state', state);
// console.log(state.congelado.valor = 'mudou');