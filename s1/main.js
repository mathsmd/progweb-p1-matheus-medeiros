const ContaCorrente = require("./conta-corrente");
const ContaPoupanca = require("./conta-poupanca");

const contas = [
  new ContaCorrente("Ana", 1000),
  new ContaPoupanca("Bruno", 2000),
];

for (const c of contas) {
  c.depositar(100);
  c.fecharMes(); // polimorfismo: cada tipo aplica a sua regra
  console.log(
    `${c.constructor.name} | ${c.titular} | saldo: ${c.saldo.toFixed(2)}`
  );
}