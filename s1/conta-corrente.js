const Conta = require("./conta");

class ContaCorrente extends Conta {
  #limite;

  constructor(titular, saldoInicial = 0, limite = 500) {
    super(titular, saldoInicial);
    this.#limite = limite;
  }

  get limite() {
    return this.#limite;
  }

  sacar(valor) {
    if (valor <= 0) throw new Error("Valor de saque inválido");
    if (valor > this.saldo + this.#limite) throw new Error("Limite excedido");
    this._ajustarSaldo(-valor);
  }

  // Tarifa mensal da conta corrente
  fecharMes() {
    this._ajustarSaldo(-15);
  }
}

module.exports = ContaCorrente;