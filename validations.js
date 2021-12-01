function validate(obj, validations) {
  return new Proxy(obj, {
    set(target, key, value) {
      const validate = validations[key] || (() => true);
      validate(value);
      Reflect.set(target, key, value);
      return true;
    }
  })
}

const personValidations = {
  age(value) {
    if (typeof value !== 'number') {
      throw new Error('Age deve ser um número')
    }
  },
  name(value) {
    if (typeof value !== 'string') {
      throw new Error('Age deve ser uma string')
    }
  }
}

const person = validate({}, personValidations);
person.name = 'Fulano';
person.age = 99

console.log(person);

// person.age = 'oi'