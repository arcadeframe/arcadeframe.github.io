(function () {
  var UNICO = window.SOFTWARE || '';

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dataBR(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }
  function detalhes(s) {
    return [s.sistemas, s.tamanho, s.data ? 'Atualizado em ' + dataBR(s.data) : '']
      .filter(Boolean).map(esc).join(' · ');
  }
  function botoes(s) {
    return (s.downloads || []).map(function (d, i) {
      return '<a href="' + esc(d.link) + '"' + (i ? ' class="sec"' : '') + '>' + esc(d.rotulo) + '</a>';
    }).join('');
  }

  var el = document.getElementById('lista');

  fetch('/softwares.json?v=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (lista) {
      if (UNICO) {
        var s = lista.filter(function (x) { return x.id === UNICO; })[0];
        if (!s) {
          el.innerHTML = '<p class="vazio">Este software não está disponível no momento.</p>';
          return;
        }
        document.title = s.nome + ' | Galdino Videomaker';
        document.getElementById('titulo').textContent = s.nome;
        document.getElementById('intro').textContent = s.descricao || '';
        var det = detalhes(s);
        el.innerHTML = '<section class="item unico">' +
          (s.versao ? '<p class="detalhes">Versão ' + esc(s.versao) + (det ? ' · ' + det : '') + '</p>' : (det ? '<p class="detalhes">' + det + '</p>' : '')) +
          '<div class="botoes">' + botoes(s) + '</div>' +
          (s.instrucoes ? '<p class="instrucoes">' + esc(s.instrucoes) + '</p>' : '') +
          '</section>' +
          '<a class="voltar" href="/">Ver todos os softwares</a>';
        return;
      }

      if (!lista.length) {
        el.innerHTML = '<p class="vazio">Nenhum software publicado ainda. Volte em breve.</p>';
        return;
      }
      el.innerHTML = lista.map(function (s) {
        var det = detalhes(s);
        return '<section class="item" id="' + esc(s.id) + '">' +
          '<div class="topo"><h2><a href="/' + esc(s.id) + '/">' + esc(s.nome) + '</a></h2>' +
          (s.versao ? '<span class="versao">v' + esc(s.versao) + '</span>' : '') + '</div>' +
          '<p class="desc">' + esc(s.descricao) + '</p>' +
          (det ? '<p class="detalhes">' + det + '</p>' : '') +
          '<div class="botoes">' + botoes(s) + '</div>' +
          '</section>';
      }).join('');
    })
    .catch(function () {
      el.innerHTML = '<p class="vazio">Não foi possível carregar a lista agora.</p>';
    });
})();
