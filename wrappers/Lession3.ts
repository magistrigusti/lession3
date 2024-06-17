import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type Lession3Config = {};

export function lession3ConfigToCell(config: Lession3Config): Cell {
    return beginCell().endCell();
}

export class Lession3 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Lession3(address);
    }

    static createFromConfig(config: Lession3Config, code: Cell, workchain = 0) {
        const data = lession3ConfigToCell(config);
        const init = { code, data };
        return new Lession3(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
