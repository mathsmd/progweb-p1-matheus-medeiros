class Conta {
  #titular;
  #saldo = 0;

  constructor(titular, saldoInicial = 0) {
    this.#titular = titular;
    if (saldoInicial > 0) this.#saldo = saldoInicial;
  }

  get titular() {
    return this.#titular;
  }

  get saldo() {
    return this.#saldo;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error("Valor de depósito inválido");
    this.#saldo += valor;
  }

  sacar(valor) {
    if (valor <= 0) throw new Error("Valor de saque inválido");
    if (valor > this.#saldo) throw new Error("Saldo insuficiente");
    this.#saldo -= valor;
  }
}

module.exports = Conta;