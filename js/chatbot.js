document.getElementById('iniciar-chat').addEventListener('click', iniciarChat);

document.getElementById('botao-enviar').addEventListener('click', enviarMensagem);

document.getElementById('minimize-button').addEventListener('click', alternarJanelaChat);

let nomeUsuario = '';

let introFechada = false;

const qa = [

    {pergunta:"Olá", resposta: "Olá, como posso ajudar?"},
    { pergunta: "oi", resposta: "Oi! Como posso ajudar você hoje?" },
    {pergunta:"Olá", resposta: "Olá! Sou sua assistente de saúde menstrual. Como posso ajudar?"},
    {pergunta:"oi", resposta: "Oi! Estou aqui para tirar suas dúvidas sobre ciclo menstrual e saúde. Em que posso ajudar?"},
    {pergunta:"O que é menstruação?", resposta: "A menstruação é a descamação da camada interna do útero que acontece quando não há gravidez. É um processo natural do corpo! 🌸"},
    {pergunta:"Quantos dias dura a menstruação?", resposta: "Geralmente de 3 a 7 dias, mas cada corpo é único! Se for muito diferente disso, converse com o enfermeiro."},
    {pergunta:"O que é ciclo menstrual?", resposta: "É o período que vai do primeiro dia da menstruação até o dia antes da próxima. Dura normalmente de 21 a 35 dias. 🔄"},
    {pergunta:"O que é TPM?", resposta: "TPM é a Tensão Pré-Menstrual - são sintomas físicos e emocionais que algumas meninas sentem antes da menstruação. É normal! 😊"},
    {pergunta:"Como aliviar cólica?", resposta: "Bolsa de água quente na barriga, analgésicos (com orientação) e alongamentos leves ajudam bastante! 🔥"},
    {pergunta:"Quantos dias dura o ciclo?", resposta: "O ciclo menstrual normal dura entre 21 e 35 dias. Se for muito diferente, procure o enfermeiro escolar. 📅"},
    {pergunta:"O que é ovulação?", resposta: "É quando o óvulo é liberado pelo ovário - geralmente no meio do ciclo. É o período mais fértil! 🥚"},
    {pergunta:"Posso engravidar menstruada?", resposta: "Sim, é possível! O ciclo adolescente pode ser irregular. Use sempre camisinha para se proteger. 🛡️"},
    {pergunta:"Como saber se estou ovulando?", resposta: "Alguns sinais: muco vaginal transparente e elástico (como clara de ovo), leve dor no baixo ventre. 📊"},
    {pergunta:"O que é fluxo normal?", resposta: "É a quantidade de sangue que seu corpo elimina. Se precisar trocar absorvente a cada 1-2 horas, procure ajuda. 🩸"},
    {pergunta:"Absorvente interno pode perder?", resposta: "Não! O canal vaginal tem fim. Mas sempre troque a cada 4-6 horas para evitar infecções. 🩺"},
    {pergunta:"Com quantos anos vem a primeira menstruação?", resposta: "Geralmente entre 9 e 15 anos. Cada menina tem seu tempo! Não se preocupe se for diferente das amigas. 👧"},
    {pergunta:"Posso piscina menstruada?", resposta: "Sim! Com absorvente interno ou coletor menstrual. A água não para o fluxo, mas o absorvente segura. 🏊‍♀️"},
    {pergunta:"Quantas vezes trocar o absorvente?", resposta: "A cada 3-4 horas, mesmo com pouco fluxo. Isso evita odores e mantém a saúde íntima. ⏰"},
    {pergunta:"O que é menarca?", resposta: "É o nome da primeira menstruação! Um marco importante no desenvolvimento. 🎉"},
    {pergunta:"Porque a menstruação atrasa?", resposta: "Pode ser estresse, mudanças de peso, exercícios intensos ou o ciclo ainda se regulando. Se for frequente, procure ajuda. 🤔"},
    {pergunta:"Como lavar a região íntima?", resposta: "Só com água e sabão neutro na parte externa, sempre de frente para trás. Nunca lave por dentro! 🚿"},
    {pergunta:"O que é síndrome do choque tóxico?", resposta: "Infecção rara mas grave. Por isso é importante trocar absorventes internos/coletores regularmente! ⚠️"},
    {pergunta:"Menstruação pode vir todo mês?", resposta: "Nos primeiros anos pode ser irregular. Com o tempo tende a regularizar. Paciência! 💫"},
    {pergunta:"O que fazer se menstruar na escola?", resposta: "Procure a enfermaria! Eles têm absorventes e podem te ajudar. Não tenha vergonha! 🏫"},
    {pergunta:"Como saber se minha menstruação é normal?", resposta: "Se o fluxo não te impede das atividades, a dor é controlável e o ciclo é regular, provavelmente está tudo bem! ✅"},
    {pergunta:"Posso fazer exercício menstruada?", resposta: "Sim! Exercícios leves podem até aliviar as cólicas. Escute seu corpo. 💪"},
    {pergunta:"O que é endometriose?", resposta: "Doença onde o tecido do útero cresce fora dele, causando dor forte. Se suspeitar, procure o enfermeiro. 🩺"},
    {pergunta:"Como escolher o absorvente certo?", resposta: "Use o que for mais confortável! Externo, interno, coletor... O importante é trocar regularmente. 🛒"},
    {pergunta:"Menstruação tem cheiro?", resposta: "Sim, um odor suave é normal. Cheiro forte pode indicar necessidade de trocar o absorvente ou infecção. 👃"},
    {pergunta:"Posso tomar banho de mar menstruada?", resposta: "Sim, com absorvente interno ou coletor. O sal até pode ajudar a diminuir o fluxo! 🌊"},
    {pergunta:"O que é dismenorreia?", resposta: "É o nome médico para cólica menstrual. Se for muito forte, não sofra calada - procure ajuda! 🤕"},
    {pergunta:"Como falar com minha mãe sobre menstruação?", resposta: "Seja sincera! Diga que tem dúvidas e gostaria de conversar. Ela já passou por isso. 💕"},
    {pergunta:"Posso usar dois absorventes?", resposta: "Sim, se o fluxo for intenso. Um interno + externo ou dois externos (frente e trás). 🔄"},
    {pergunta:"O que é spotting?", resposta: "São pequenos sangramentos entre as menstruações. Se for frequente, converse com o enfermeiro. 🔍"},
    {pergunta:"Menstruação escura é normal?", resposta: "Sim! No início e final pode ser mais escura. Só preocupe se tiver cheiro forte ou coceira. 🟤"},
    {pergunta:"Posso doar sangue menstruada?", resposta: "Sim! A menstruação não impede a doação de sangue. 💉"},
    {pergunta:"Como calcular meu ciclo?", resposta: "Marque no calendário o primeiro dia da menstruação. Conte os dias até a próxima! 📱"},
    {pergunta:"O que é fertilidade?", resposta: "É a capacidade de engravidar. A adolescência é época de entender, não necessariamente de usar! 🌱"},
    {pergunta:"Posso ter relação menstrual?", resposta: "Sim, mas use camisinha! Além de prevenir gravidez, protege contra ISTs. 💑"},
    {pergunta:"O que é IST?", resposta: "Infecções Sexualmente Transmissíveis. A camisinha é a melhor proteção! Converse com o enfermeiro. 🛡️"},
    {pergunta:"Como saber se preciso de ginecologista?", resposta: "Se tiver dúvidas, dores fortes ou sintomas diferentes, comece pelo enfermeiro escolar. 👩‍⚕️"},
    {pergunta:"O que é anticoncepcional?", resposta: "Método para evitar gravidez. Existem vários tipos - converse com profissional para escolher o melhor. 💊"},
    {pergunta:"Menstruação atrasou, e agora?", resposta: "Calma! Pode ser normal. Espere alguns dias. Se persistir ou tiver relação desprotegida, procure ajuda. 🕒"},
    {pergunta:"Posso usar coletor menstrual?", resposta: "Sim! É ecológico e econômico. Peça orientação para usar corretamente. 🌿"},
    {pergunta:"O que é muco vaginal?", resposta: "Secreção natural que protege a vagina. Muda durante o ciclo - na ovulação fica transparente e elástico. 💧"},
    {pergunta:"Como evitar vazamentos?", resposta: "Troque o absorvente regularmente, use o tamanho certo para seu fluxo e calcinhas específicas para o período. 🩲"},
    {pergunta:"Posso depilar menstruada?", resposta: "Sim, mas a pele pode estar mais sensível. Faça com cuidado! ✨"},
    {pergunta:"O que é menopausa?", resposta: "Fase em que a menstruação para definitivamente. Geralmente depois dos 45 anos. 👵"},
    {pergunta:"Porque sinto muita fome menstrual?", resposta: "É normal! As mudanças hormonais afetam o apetite. Escolha lanches saudáveis. 🍎"},
    {pergunta:"Posso tomar pílula do dia seguinte?", resposta: "Só em emergências! Não é método contraceptivo regular. Converse com o enfermeiro sobre opções. ⚠️"},
    {pergunta:"O que é candidíase?", resposta: "Infecção por fungo que causa coceira e corrimento. Procure o posto de saúde se tiver sintomas. 🦠"},
    {pergunta:"Como saber se estou com anemia?", resposta: "Cansaço excessivo, palidez, tontura. Se desconfiar, converse com o enfermeiro para exames. 🩸"},
    {pergunta:"Posso usar calmante para TPM?", resposta: "Só com orientação médica! Tente técnicas de relaxamento e respiração primeiro. 🧘‍♀️"},
    {pergunta:"O que é pólipo?", resposta: "Pequeno crescimento no útero que pode causar sangramento irregular. Diagnóstico é com médico. 🔍"},
    {pergunta:"Menstruação vem sempre na mesma data?", resposta: "Não necessariamente! O ciclo conta dias, não datas fixas do mês. 📅"},
    {pergunta:"Posso fazer ultrassom menstrual?", resposta: "Sim, alguns exames são feitos justamente durante a menstruação. Siga a orientação médica. 🏥"},
    {pergunta:"O que é cisto no ovário?", resposta: "Bolsinha com líquido que pode causar dor. Muitos são normais e somem sozinhos. 🎈"},
    {pergunta:"Como lidar com cólica na escola?", resposta: "Avise a professora e procure a enfermaria. Tenha sempre analgésico na mochila (com autorização). 🎒"},
    {pergunta:"Posso tomar sorvete menstrual?", resposta: "Sim! Mas se perceber que piora as cólicas, modere. Cada corpo reage diferente. 🍦"},
    {pergunta:"O que é laqueadura?", resposta: "Cirurgia para não ter filhos. Só para maiores de 25 anos ou com 2 filhos vivos no Brasil. 🔧"},
    {pergunta:"Menstruação pode parar?", resposta: "Sim, por gravidez, amamentação, estresse extremo ou problemas de saúde. Se for sem motivo, procure ajuda. ⏸️"},
    {pergunta:"Posso fazer exame de sangue menstrual?", resposta: "Sim, a menstruação não interfere na maioria dos exames. Confirme com o laboratório. 💉"},
    {pergunta:"O que é DIU?", resposta: "Dispositivo Intrauterino - método contraceptivo de longa duração. Converse com profissional sobre opções. 🔩"},
    {pergunta:"Como saber se meu fluxo é forte?", resposta: "Se precisar trocar absorvente a cada 1-2 horas ou tiver muitos coágulos, procure avaliação. 💦"},
    {pergunta:"Posso usar pílula para regular ciclo?", resposta: "Só com prescrição médica! Não se automedique. 🚫"},
    {pergunta:"O que é vulvovaginite?", resposta: "Inflamação na vulva e vagina que causa coceira e corrimento. Mais comum na infância. 🔥"},
    {pergunta:"Menstruação afeta o humor?", resposta: "Sim! Os hormônios influenciam as emoções. É normal se sentir mais sensível. 😢"},
    {pergunta:"Posso fazer tatuagem menstrual?", resposta: "Sim, mas a dor pode ser maior. Escolha um período com menos cólicas. 🎨"},
    {pergunta:"O que é histerectomia?", resposta: "Cirurgia para retirar o útero. Só em casos específicos de saúde. 🏥"},
    {pergunta:"Como aliviar inchaço menstrual?", resposta: "Beba muita água, reduza o sal e faça caminhadas leves. 💧"},
    {pergunta:"Posso usar absorvente de pano?", resposta: "Sim! É ecológico e econômico. Lave corretamente após cada uso. 🌍"},
    {pergunta:"O que é papanicolau?", resposta: "Exame preventivo do câncer de colo de útero. Recomendado a partir dos 25 anos. 🔬"},
    {pergunta:"Menstruação atrapalha o sono?", resposta: "Pode sim! Use calor local e posições confortáveis para dormir melhor. 😴"},
    {pergunta:"Posso fazer cirurgia menstrual?", resposta: "Só em casos de emergência. A maioria das cirurgias é marcada fora do período. ⚕️"},
    {pergunta:"O que é amenorreia?", resposta: "Ausência de menstruação. Primária (nunca veio) ou secundária (parou de vir). 🚫"},
    {pergunta:"Como saber se tenho endometriose?", resposta: "Dor menstrual muito forte que piora com o tempo. Procure o enfermeiro para encaminhamento. 🩺"},
    {pergunta:"Posso usar banheira menstrual?", resposta: "Sim! A água quente ajuda a relaxar e aliviar cólicas. 🛁"},
    {pergunta:"O que é mioma?", resposta: "Tumor benigno no útero que pode aumentar o fluxo. Muito comum e geralmente não perigoso. 🔴"},
    {pergunta:"Menstruação causa acne?", resposta: "Sim! Os hormônios estimulam a oleosidade da pele. Limpeza suave ajuda. 🌋"},
    {pergunta:"Posso fazer dieta menstrual?", resposta: "Evite dietas restritivas! Alimentação balanceada é sempre melhor. 🥗"},
    {pergunta:"O que é SOP?", resposta: "Síndrome dos Ovários Policísticos - causa ciclos irregulares, acne e pelos. Diagnóstico é com médico. 🔍"},
    {pergunta:"Como contar dias férteis?", resposta: "Geralmente 14 dias antes da próxima menstruação. Mas em ciclos irregulares é difícil! 📊"},
    {pergunta:"Posso usar óleo essencial para cólica?", resposta: "Alguns ajudam, mas use com cuidado e diluído. Sempre teste numa pequena área primeiro. 🌿"},
    {pergunta:"O que é adesivo contraceptivo?", resposta: "Método hormonal que cola na pele. Troca semanal. Converse sobre opções com profissional. 🩹"},
    {pergunta:"Menstruação afeta a memória?", resposta: "Pode causar esquecimento leve por conta das mudanças hormonais. É temporário! 🧠"},
    {pergunta:"Posso fazer sexo oral menstrual?", resposta: "Sim, se ambos estiverem confortáveis. A comunicação é fundamental! 💋"},
    {pergunta:"O que é implante hormonal?", resposta: "Bastãozinho colocado no braço que protege por 3 anos. Método de longa duração. 📍"},
    {pergunta:"Como lidar com TPM nos estudos?", resposta: "Descanse quando possível, alimente-se bem e converse com professores se precisar de apoio. 📚"},
    {pergunta:"Posso usar chás para cólica?", resposta: "Chá de camomila e gengibre ajudam! Mas evite exageros e converse com o enfermeiro. ☕"},
    {pergunta:"O que é anovulação?", resposta: "Ciclo sem ovulação. Comum nos primeiros anos da menstruação. 🔄"},
    {pergunta:"Menstruação pode vir duas vezes no mês?", resposta: "Sim, se o ciclo for curto. Se for frequente, procure avaliação. 📆"},
    {pergunta:"Posso fazer exercício abdominal menstrual?", resposta: "Sim, se não piorar a cólica. Escute seu corpo! 💪"},
    {pergunta:"O que é injeção anticoncepcional?", resposta: "Aplicada a cada 1 ou 3 meses. Converse sobre prós e contras com profissional. 💉"},
    {pergunta:"Como saber se preciso trocar método contraceptivo?", resposta: "Se tiver efeitos colaterais incômodos, converse com o enfermeiro sobre outras opções. 🔄"},
    {pergunta:"Posso usar analgésico todo mês?", resposta: "Sim, mas se precisar de dose cada vez maior, procure investigar a causa da dor. 💊"},
    {pergunta:"O que é vestíbulo vulvar?", resposta: "Entrada da vagina. Pode ficar mais sensível durante a menstruação. 🔍"},
    {pergunta:"Menstruação causa diarreia?", resposta: "Sim! Os hormônios afetam o intestino. É normal e temporário. 🚽"},
    {pergunta:"Posso fazer yoga menstrual?", resposta: "Sim! Posições específicas aliviam cólicas. Pesquise por 'yoga para menstruação'. 🧘‍♀️"},
    {pergunta:"O que é adenoimose?", resposta: "Endometriose dentro da parede do útero. Causa dor e fluxo intenso. 🩺"},
    {pergunta:"Como escolher ginecologista?", resposta: "Procure indicações, veja se tem boa comunicação. Pode começar pelo posto de saúde. 👩‍⚕️"},
    {pergunta:"Posso usar pomada para coceira?", resposta: "Só com orientação! A coceira pode ter causas diferentes que precisam de tratamentos específicos. 🧴"},
    {pergunta:"O que é histeroscopia?", resposta: "Exame para visualizar dentro do útero. Pode diagnosticar várias condições. 🔬"},
    {pergunta:"Menstruação para na água?", resposta: "Mito! O fluxo continua, mas a pressão da água pode reduzir temporariamente. 🌊"},
    {pergunta:"Posso fazer drenagem linfática menstrual?", resposta: "Sim, pode ajudar com o inchaço! Avise a profissional que está menstruada. 💆‍♀️"},
    {pergunta:"O que é varizes pélvicas?", resposta: "Vasos dilatados na pelve que podem causar dor crônica. Diagnóstico com exames específicos. 🩸"},
    {pergunta:"Como ajudar uma amiga com cólica?", resposta: "Ofereça bolsa de água quente, compre um analgésico (se autorizado) e escute sem julgamentos. 💕"}
    // Adicione mais perguntas e respostas aqui

];

function iniciarChat() {

    const nomeUsuarioInput = document.getElementById('nome-usuario').value;

    if(nomeUsuarioInput.trim() !== '' ) {

        nomeUsuario = nomeUsuarioInput;

        document.getElementById('chat-intro').style.display = 'none';

        document.getElementById('chat-window').style.display = 'flex';

        adicionarMensagem("Ola, " + nomeUsuario + "! Como posso ajudar hoje?", 'bot-message');
        introFechada = true;
    } else{

        alert('Por favor, insira um nome de usuário.');

    }

}

function enviarMensagem() {

    const entradaUsuario = document.getElementById('entrada-usuario').value;

    if(entradaUsuario.trim() !== ''){

        adicionarMensagem(entradaUsuario, 'user-message');

        document.getElementById('entrada-usuario').value = '';

        respostaBot(entradaUsuario);

    }
    
}


function respostaBot(entradaUsuario) {
    
    const entradaUsuarioLower = entradaUsuario.toLowerCase();

    const resposta = encontrarResposta(entradaUsuarioLower) || 'Desculpe não entendi sua pergunta. Poderia reformulá-la?';

    setTimeout(() => adicionarMensagem(resposta, 'bot-message'), 500);

    if(entradaUsuarioLower.includes('quais são os cursos oferecidos')){

        setTimeout(() => exibirBotoesCursos(), 600);

    }

}

function encontrarResposta(entrada) {

    let melhorCorrespondencia = '';

    let menorDistancia = Infinity;

    qa.forEach(item => {

        const distancia = calcularDistanciaLevenshtein(entrada, item.pergunta.toLowerCase());

        if(distancia < menorDistancia){

            menorDistancia = distancia;

            melhorCorrespondencia = item.resposta;

        }

    })

    return menorDistancia <= (entrada.length / 2) ? melhorCorrespondencia : null;
    
}

function calcularDistanciaLevenshtein(a, b) {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {

        matrix[i] = [i];
        
    }

    for (let j = 0; j <= a.length; j++) {
        
        matrix[0][j] = j;
        
    }
    

    for (let i = 1; i <= b.length; i++) {
        
        for (let j = 1; j <= a.length; j++) {
            
            if(b.charAt(i - 1) === a.charAt(j - 1)){

                matrix[i][j] = matrix[i-1][j-1];

            } else{

                matrix[i][j] = matrix[i-1][j-1] + 1;

                matrix[i][j] = Math.min(matrix[i][j], matrix[i][j - 1] + 1)

                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 1][j] + 1)

            }
            
        }
        
    }

    return matrix[b.length][a.length];

}

function adicionarMensagem(mensagem, classe) {

    const elementoMensagem = document.createElement('div');

    elementoMensagem.className = `message ${classe}`;

    elementoMensagem.textContent = mensagem;

    document.getElementById('chat-output').appendChild(elementoMensagem);

    elementoMensagem.scrollIntoView();

}

function alternarJanelaChat(){

    const janelaIntro = document.getElementById('chat-intro');
    const janelaChat = document.getElementById('chat-window');
    const botao = document.getElementById('minimize-button');

    if (!introFechada) {
        
        janelaIntro.style.display = janelaIntro.style.display === 'none'

            ?'flex'

            :'none'
        ;   
        if (janelaIntro.style.display === 'none') {
        
            botao.textContent = 'O';
    
        } else {
    
            botao.textContent = '_';
    
        }
    } else{

        janelaChat.style.display = janelaChat.style.display === 'none'

            ?'flex'

            :'none'
        ;      
        
        if (janelaChat.style.display === 'none') {
            
            botao.textContent = 'O';

        } else {

            botao.textContent = '_';

        }

    }



}
