// ALUNO: Matheus Medeiros
// ============================================================ 
// S2_library-bad.js — Mãos à Obra da Semana 2 (Parte A)
// Este código FUNCIONA (rode: node S2_library-bad.js). E é ruim de propósito.
// Sua tarefa, em dupla: NÃO refatore. Apenas leia e marque os cheiros.
//   Use // SMELL: <nome>        para cada code smell (nomes do slide 16)
//   Use // VIOLA: <S|O|L|I|D>   para cada princípio SOLID violado (slide 4)
// ============================================================

class Library {
  constructor() {
    this.bks = []; // SMELL: Nome obscuro (bks = livros)
    this.us = []; // SMELL: Nome obscuro (us = usuários)
    this.lns = []; // SMELL: Nome obscuro (lns = empréstimos)
  }

  // SMELL: Nome obscuro (doStuff não diz o que faz)
  // SMELL: Long Function (adiciona, empresta, devolve e verifica atraso)
  // VIOLA: S (acervo, empréstimos e envio de e-mail na mesma classe e método)
  doStuff(book, userId, action) {
    // SMELL: Switch sobre tipo (cadeia de if/else if sobre "action")
    // VIOLA: O (para criar "renovar" preciso abrir e editar este método)
    if (action === 'add') {
      this.bks.push(book);
      console.log('Added: ' + book.t); // SMELL: Nome obscuro (t = título)
    } else if (action === 'lend') {
      var u = null;
      // SMELL: Duplicate Code (laço de busca de usuário, repetido no 'overdue')
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].id === userId) { u = this.us[i]; }
      }
      var b = null;
      // SMELL: Duplicate Code (laço de busca de livro por título, repetido no 'return')
      for (var j = 0; j < this.bks.length; j++) {
        if (this.bks[j].t === book.t) { b = this.bks[j]; }
      }
      if (u != null && b != null && b.cp > 0) { // SMELL: Nome obscuro (cp = cópias disponíveis)
        b.cp = b.cp - 1;
        // SMELL: Nome obscuro (uid, bt, d, st)
        // SMELL: Magic Number (st: 1)
        // SMELL: Primitive Obsession (status do empréstimo como número solto)
        this.lns.push({ uid: userId, bt: book.t, d: new Date(), st: 1 });
        // SMELL: Comentário-desodorante (explica os números porque o código não se explica)
        // 1 = active, 2 = returned, 3 = overdue
        // VIOLA: D (depende direto do envio HTTP de e-mail e não de um contrato; não dá para testar sem enviar)
        // VIOLA: S (emprestar e notificar na mesma função)
        fetch('http://email.api/send', {
          method: 'POST',
          body: JSON.stringify({ to: u.em, msg: 'Você pegou ' + book.t })
        // SMELL: Erro engolido (then que não faz nada e catch vazio)
        }).then(r => { /* nada */ }).catch(e => {});
      }
    } else if (action === 'return') {
      for (var k = 0; k < this.lns.length; k++) {
        // SMELL: Magic Number (st === 1 sem nome)
        if (this.lns[k].uid === userId && this.lns[k].bt === book.t && this.lns[k].st === 1) {
          this.lns[k].st = 2;
          // SMELL: Duplicate Code (outra busca de livro por título)
          for (var m = 0; m < this.bks.length; m++) {
            if (this.bks[m].t === book.t) { this.bks[m].cp = this.bks[m].cp + 1; }
          }
        }
      }
    } else if (action === 'overdue') {
      for (var n = 0; n < this.lns.length; n++) {
        // SMELL: Magic Number (1000 * 60 * 60 * 24 e o prazo de 7 dias sem nome)
        var diff = (new Date() - this.lns[n].d) / (1000 * 60 * 60 * 24);
        if (this.lns[n].st === 1 && diff > 7) {
          this.lns[n].st = 3;
          var usr = null;
          // SMELL: Duplicate Code (mesma busca de usuário do 'lend')
          for (var p = 0; p < this.us.length; p++) {
            if (this.us[p].id === this.lns[n].uid) { usr = this.us[p]; }
          }
          if (usr) {
            // SMELL: Erro engolido (promessa sem tratamento: se o envio falhar, ninguém fica sabendo)
            // VIOLA: D (outro fetch direto, sem contrato de notificação)
            fetch('http://email.api/send', {
              method: 'POST',
              body: JSON.stringify({ to: usr.em, msg: 'Atrasado: ' + this.lns[n].bt })
            });
          }
        }
      }
    }
  }

  // SMELL: Long Parameter List (8 parâmetros soltos)
  // SMELL: Data Clumps (addr, cty, st, zp andam sempre juntos: endereço)
  // SMELL: Primitive Obsession (e-mail, telefone e CEP como texto solto)
  // SMELL: Nome obscuro (n, e, ph, cty, st, zp, isAdm)
  registerUser(n, e, ph, addr, cty, st, zp, isAdm) {
    this.us.push({ id: this.us.length + 1, n: n, em: e, ph: ph, addr: addr, cty: cty, st: st, zp: zp, isAdm: isAdm });
  }

  report(type) {
    // SMELL: Switch sobre tipo (if/else if sobre "type")
    // SMELL: Magic Number (1, 2 e 3 sem significado)
    // VIOLA: O (um relatório novo exige editar este método)
    if (type === 1) {
      console.log('Total de livros: ' + this.bks.length);
    } else if (type === 2) {
      console.log('Total de usuários: ' + this.us.length);
    } else if (type === 3) {
      console.log('Total de empréstimos: ' + this.lns.length);
    }
  }
}

// Uso:
const lib = new Library();
lib.registerUser('Ana', 'ana@uepb.edu.br', '83999990000', 'Rua X, 10', 'Patos', 'PB', '58700-000', false);
lib.doStuff({ t: 'Clean Code', cp: 3 }, null, 'add');
lib.doStuff({ t: 'Clean Code' }, 1, 'lend');
lib.report(1);