# Softwares do Galdino Videomaker

Site público: https://arcadeframe.github.io

## Como publicar um software (para o Claude da Fábrica de Software)

Só publique depois de perguntar ao Ronay se ele quer publicar aqui.

1. Crie uma Release neste repositório com a tag `ID-vVERSAO` (ex.: `seletor-v1.0.0`) e anexe os arquivos (.dmg, .zip, .exe).
   Link de download: `https://github.com/arcadeframe/arcadeframe.github.io/releases/download/TAG/ARQUIVO`
2. Adicione o software em `softwares.json` (mais novo no topo):

```json
{
  "id": "seletor",
  "nome": "Seletor",
  "versao": "1.0.0",
  "descricao": "Uma ou duas frases dizendo o que o programa faz.",
  "sistemas": "macOS 13 ou superior",
  "tamanho": "48 MB",
  "data": "2026-11-22",
  "downloads": [
    { "rotulo": "Baixar para Mac", "link": "https://github.com/arcadeframe/arcadeframe.github.io/releases/download/seletor-v1.0.0/Seletor.dmg" },
    { "rotulo": "Baixar para Windows", "link": "..." }
  ],
  "instrucoes": "Opcional. Como instalar, em texto simples."
}
```

3. Crie a pasta do software: copie `_modelo/index.html` para `ID/index.html` e troque NOME, DESCRICAO e ID.
4. Link para compartilhar: `https://arcadeframe.github.io/ID/`
5. Nova versão: nova Release, atualize versao, data e links no `softwares.json`. A pasta não muda.
