# Busca-Agente-Autonomo

Versão com código: [Clique aqui](https://editor.p5js.org/ohbf/sketches/oW5ls_7E8).  
Versão sem código: [Clique aqui](https://editor.p5js.org/ohbf/full/oW5ls_7E8).

## Sobre
Projeto consiste na implementação de algumas estratégias de busca: 
- Largura
- Profundidade
- Custo Uniforme
- Gulosa
- A*

## Especificações
### Objetivo: 
- Agente deve coletar a comida

### Ambiente: 
  - completamente observável e discreto
  - gerado automatica e aleatoriamente com 4 diferentes tipos de terreno:
    - Obstáculo: o agente não pode passar;
    - Terreno de custo baixo (areia): o agente gasta, por exemplo, 1 de energia para poder atravessar;
    - Terreno de custo médio (atoleiro): o agente gasta, por exemplo, 5 de energia para poder atravessar;
    - Terreno de custo alto (água): o agente gasta, por exemplo, 10 de energia para poder atravessar;

### Ciclo de funcionamento do programa:

1. O mapa é gerado aleatoriamente com os 4 tipos de terrenos;
2. O usuário escolhe qual tipo de busca será executada (a forma de controle fica a critério do grupo);
3. O agente aparece em uma posição aleatória no ambiente (cuidado para ele não aparecer dentro de um obstáculo);
4. Uma comida aparece em uma posição aleatória no ambiente (evitar aparecer em um obstáculo);
5. O agente percebe a comida no ambiente e define a posição da comida como estado objetivo;
6. O agente realiza a busca considerando sua posição atual como o estado inicial;
7. Com o resultado da busca, o agente define um caminho a ser percorrido;
8. O agente se desloca em direção à comida para coletá-la seguindo o caminho resultante da busca (nesse descolamento, a velocidade do agente deve ser menor para terrenos de custo alto e maior para terrenos de custo mais baixo).
9. Quando ocorre a colisão entre o agente e a comida, a comida desaparece do ambiente e é contabilizada (a comida foi coletada);
10. Volta para o passo 4 (outra comida aparece no ambiente
