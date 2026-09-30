const Conta = require("./conta");

class ContaPoupanca extends Conta {
  #taxa;

  constructor(titular, saldoInicial = 0, taxa = 0.005) {
    super(titular, saldoInicial);
    this.#taxa = taxa;
  }

  // Rendimento mensal da poupança
  fecharMes() {
    this._ajustarSaldo(this.saldo * this.#taxa);
  }
}

module.exports = ContaPoupanca;