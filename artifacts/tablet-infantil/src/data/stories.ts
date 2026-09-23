export type StoryAge = '2-4' | '5-6' | '7-8' | null;

export type StoryPage = {
  paragraphs: string[];
};

export type Story = {
  id: string;
  title: string;
  ageRange: StoryAge;
  text: StoryPage[];
  interpretation: string;
  image: string | null;
  imageAlt: string;
  status: 'published';
};

export const storyAgeLabels: Record<Exclude<StoryAge, null>, string> = {
  '2-4': '2 a 4 anos',
  '5-6': '5 a 6 anos',
  '7-8': '7 a 8 anos',
};

export const stories: Story[] = [
  {
    id: 'luna-e-os-segredos-da-noite',
    title: 'Luna e os segredos da noite',
    ageRange: '5-6',
    image: null,
    imageAlt: 'Imagem de Luna ainda não adicionada',
    status: 'published',
    text: [
      {
        paragraphs: [
          'Luna era uma menina de 5 anos, muito esperta e amorosa, que vivia com sua mãe em uma casa no campo. Mesmo com esse belo nome, que fazia lembrar da lua, Luna tinha bastante medo da noite e do escuro.',
          'Sempre que começava a anoitecer, a garotinha ficava angustiada e seu coração começava a bater mais rápido. A noite, com seu manto escuro e misterioso, enchia a menina de dúvidas. Assim, ela sempre acabava indo dormir na cama de sua mãe.',
        ],
      },
      {
        paragraphs: [
          'Ela vivia perguntando:',
          '- Mamãe, e se algo muito ruim estiver escondido no escuro?',
          'A mãe sorria, fazia um cafuné em seu cabelo e dizia:',
          '- O escuro não tem o poder de guardar monstros, meu amor. Ao contrário, ele guarda segredos que só quem fecha os olhos e se entrega ao sono pode descobrir.',
        ],
      },
      {
        paragraphs: [
          'Mas Luna ainda tinha muitos receios.',
          'Certa noite, sua mãe lhe deu um presente especial: uma lanterna mágica cheia de desenhos de estrelas e luas.',
          '- Quando sentir medo, use essa lanterna, minha filha! Esta noite quero que durma no seu quarto e possa descobrir os segredos que as estrelas têm para te contar!',
        ],
      },
      {
        paragraphs: [
          'Luna aceitou o pedido e, mesmo com a lanterna ao seu lado, demorou para dormir. Ela olhava pela janela e via o céu estrelado. De repente, ouviu uma voz suave chamar seu nome.',
          'Ela se surpreendeu e perguntou:',
          '- Quem está aí?',
          '- Somos nós, as estrelas! - responderam as vozes, enquanto os pontos brilhantes no céu pareciam ainda mais intensos.',
        ],
      },
      {
        paragraphs: [
          '- Luna, não precisa ter medo do escuro! É nele que moramos. Assim que você fecha os olhos e permite que os sonhos te recebam, nós podemos te mostrar lugares mágicos e fantásticos!',
          'Curiosa, a menina se entregou ao sono e deixou seu inconsciente a guiar. Ela sonhou que caminhava entre as estrelas e saltava de uma para outra, enquanto ouvia histórias sobre o universo. Luna percebeu que o escuro não era assustador, mas um lugar cheio de possibilidades para sonhar e criar.',
        ],
      },
      {
        paragraphs: [
          'No dia seguinte, Luna acordou feliz. Tinha dormido a noite inteira em sua cama pela primeira vez. Quando a mãe entrou no quarto, Luna foi logo abraçá-la e contar sua experiência.',
          '- Mamãe, o escuro não é tão ruim assim, na verdade, ele é mágico! As estrelas me contaram muitos segredos!',
          'Daquele dia em diante, a linda garotinha não teve mais medo do escuro. Ela agora gostava quando chegava a noite, pois poderia passear com suas amigas estrelas e descobrir os segredos do universo!',
        ],
      },
    ],
    interpretation:
      'A história da garotinha que ficava aflita com a chegada da noite nos ensina que o medo muitas vezes vem do desconhecido, mas que, com coragem e interesse, podemos transformá-lo em algo inspirador. A lanterna que Luna ganha de presente da mãe simboliza acolhimento e segurança. Ela mostra que, com pequenas ajudas, é possível enfrentar nossas inseguranças.\n\nAs estrelas são o símbolo de um mundo fantástico e das possibilidades escondidas naquilo que nos assusta. A principal mensagem é de coragem e de que a noite não precisa ser assustadora e pode ser um lugar de descanso, imaginação, sonhos e aprendizados.',
  },
  {
    id: 'o-ratinho-e-o-leao',
    title: 'O ratinho e o leão',
    ageRange: null,
    image: null,
    imageAlt: 'Imagem do ratinho e do leão ainda não adicionada',
    status: 'published',
    text: [
      {
        paragraphs: [
          'Era uma vez um leão, que dormia profundamente na selva. De repente, ele começou a sentir cócegas e percebeu que um grupo de ratinhos corria em cima dele.',
          'Quando viram que o animal acordou, os ratinhos correram assustados para o meio da mata. Mas um deles não conseguiu escapar e acabou preso entre as patas do enorme rei da floresta.',
          'Com medo, o ratinho implorou:',
          '- Ô seu leão, por favor, não me coma! Eu te peço!',
        ],
      },
      {
        paragraphs: [
          'O leão pensou e perguntou:',
          '- Mas por que eu não deveria comê-lo?',
          'O rato respondeu:',
          '- Quem sabe se um dia você precisar de mim, eu posso ajudá-lo!',
          'Então o leão soltou o ratinho, que seguiu feliz para junto de seus amigos. O tempo passou e um dia o leão foi capturado por um grupo de homens maus, que o prenderam em uma rede.',
        ],
      },
      {
        paragraphs: [
          'O mesmo ratinho, que estava por perto, ouviu os gritos de socorro do leão e foi até lá. Lembrando de que o leão havia poupado sua vida, o pequeno roedor mastigou e mastigou a corda, conseguindo cortá-la e libertar o leão.',
          'Os dois ficaram amigos a partir de então.',
        ],
      },
    ],
    interpretation:
      'Essa pequena fábula foi criada por Esopo, escritor da Grécia Antiga, no século VI a. C. A narrativa traz como moral a ideia de que quem faz o bem recebe o bem. Trata de assuntos como a solidariedade, a confiança e a amizade.\n\nAlém disso, nos mostra que independente do tamanho, todos os seres possuem suas habilidades e a ajuda pode vir dos mais singelos amigos.',
  },
  {
    id: 'o-esquilo-pipoca-e-a-licao-de-paciencia',
    title: 'O Esquilo Pipoca e a Lição de Paciência',
    ageRange: null,
    image: null,
    imageAlt: 'Imagem do esquilo Pipoca e da tartaruga Teca ainda não adicionada',
    status: 'published',
    text: [
      {
        paragraphs: [
          'Era uma vez um esquilo chamado Pipoca. Ele era ágil e rápido, sempre correndo de um lado para o outro, enchendo suas patas com nozes. No entanto, em sua pressa, muitas vezes deixava cair boa parte do alimento pelo caminho, sem perceber.',
          'Sua amiga, a tartaruga Teca, era bem diferente. Ela andava devagar sempre cuidadosa, carregando as nozes em seu casco, uma de cada vez.',
          '- Pipoca, talvez ir mais devagar te ajude a conquistar mais, disse Teca um dia, vendo o esquilo perder várias nozes enquanto corria.',
          'Mas Pipoca apenas riu.',
        ],
      },
      {
        paragraphs: [
          '- Eu sou rápido demais para me preocupar com isso, Teca!',
          'Os ventos mudaram e, finalmente, o inverno chegou. Quando o esquilinho foi verificar seu estoque, percebeu que sua pilha de nozes era bem menor do que ele pensava. Muitas tinham sido perdidas pelo caminho.',
          'Enquanto isso, Teca tinha um estoque organizado e com a quantidade perfeita para se alimentar durante o inverno. Envergonhado, Pipoca foi até sua amiga e pediu ajuda.',
        ],
      },
      {
        paragraphs: [
          'Teca, com sua calma de sempre, sorriu e disse:',
          '- Claro que vou te ajudar. Mas lembre-se: às vezes, é melhor trabalhar com calma e atenção. Assim, o esforço não é desperdiçado.',
          'Na primavera seguinte, Pipoca decidiu tentar o método de Teca. Ele trabalhou devagar, com cuidado, e notou como sua pilha de nozes crescia. Aprendeu, então, que a paciência pode ser uma grande aliada e nunca mais se apressou sem necessidade.',
        ],
      },
    ],
    interpretation:
      'A história nos ensina que não adianta agir rapidamente se não prestamos atenção no que estamos fazendo. Muitas vezes, ir devagar e ser cuidadoso pode garantir que nossos esforços sejam recompensados. Além disso, a história reforça o valor da humildade, pois Pipoca reconheceu seus erros e aprendeu com Teca, mostrando que é importante ouvir conselhos e aceitar ajuda.',
  },
];