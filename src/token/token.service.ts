import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
const HDWalletProvider = require('@truffle/hdwallet-provider');

const artiAbi = require('../../build/contracts/Arti.json');

@Injectable()
export class TokenService {
  private readonly INFURA_KEY: string = process.env.INFURA_ACCESS_TOKEN;
  private readonly MNEMONIC: string = process.env.MNEMONIC;
  private readonly WEB3_PROVIDER: string = `https://rinkeby.infura.io/v3/${this.INFURA_KEY}`;
  private readonly CONTRACT_ADDRESS: string =
    '0x41f202Ad5DEdFc3601798F08231507112EA8fd80';

  private web3: Web3;
  private contract: Contract;

  async connect() {
    this.web3 = new Web3(
      new HDWalletProvider(this.MNEMONIC, this.WEB3_PROVIDER),
    );
    this.contract = new this.web3.eth.Contract(
      artiAbi.abi,
      this.CONTRACT_ADDRESS,
    );
  }

  async createToken(owner: string) {
    this._setTransactionOption(owner);
    const res = await this.contract.methods
      .awardToken(owner)
      .send({ from: owner });
    return res;
  }

  private async _setTransactionOption(from: string): Promise<void> {
    if (!from) throw new Error('from address is a required element.');
    this.contract.options.from = from;
  }

  async balanceOf(owner: string): Promise<number> {
    return await this.contract.methods.balanceOf(owner).call();
  }

  async ownerOf(owner: number): Promise<string> {
    return await this.contract.methods.ownerOf(owner).call();
  }
}
