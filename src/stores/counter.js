import { action, computed, observable } from 'mobx'

class Counter {
    @observable number = 0

    @action.bound
    setNumber(number) {
      this.number = number
    }

    @computed get getNumber() {
      return this.number
    }

    @action.bound
    increase() {
      this.number += 1
    }

    @action.bound
    decrease() {
      this.number -= 1
    }
}

export default Counter