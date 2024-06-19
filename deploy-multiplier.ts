// src/deploy-multiplier.ts
import { DefaultProvider, bsv } from 'scrypt-ts'
import { Multiplier } from './src/contracts/multiplier'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 2

    await signer.login('sales@timechainlabs.io', 'string')
    await Multiplier.loadArtifact()

    // Provide two input numbers for multiplier
    const num1 = BigInt(6)
    const num2 = BigInt(7)
    const instance = new Multiplier(num1, num2)
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'Multiplier contract deployed : https://whatsonchain.com/tx/' +
            deployTx.id
    )

    // Calculate the product of the two numbers
    const result = num1 * num2

    // Wait for a short period to ensure deployment is processed
    await new Promise((f) => setTimeout(f, 5000))

    // Call the unlock method with the correct result
    const { tx: callTx } = await instance.methods.unlock(result)
    console.log(
        'Multiplier contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
