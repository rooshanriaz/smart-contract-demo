// src/contracts/multiplier.ts
import { assert } from 'console'
import { SmartContract, prop, method } from 'scrypt-ts'

export class Multiplier extends SmartContract {
    @prop()
    num1: bigint

    @prop()
    num2: bigint

    constructor(num1: bigint, num2: bigint) {
        super(num1, num2) // Pass parameters to super()
        this.num1 = num1
        this.num2 = num2
    }

    @method()
    public unlock(result: bigint) {
        const product = this.num1 * this.num2
        assert(result === product, 'Incorrect multiplication result')
    }
}
