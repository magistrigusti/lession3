import { toNano } from '@ton/core';
import { Lession3 } from '../wrappers/Lession3';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lession3 = provider.open(Lession3.createFromConfig({}, await compile('Lession3')));

    await lession3.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(lession3.address);

    // run methods on `lession3`
}
