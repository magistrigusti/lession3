import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Lession3 } from '../wrappers/Lession3';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Lession3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Lession3');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lession3: SandboxContract<Lession3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        lession3 = blockchain.openContract(Lession3.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await lession3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lession3.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lession3 are ready to use
    });
});
