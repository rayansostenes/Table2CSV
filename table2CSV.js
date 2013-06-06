/**
 * Bookmarklet que exporta os dados de uma tabela em CSV
 *
 * Para evitar poluir no namespace rodamos o script numa função anônima
 */ (function() {
    //Verifica a existência do jQuery
    if (typeof jQuery == 'undefined') {
        var jQ = document.createElement('script'); //Cria um novo elemento do tipo script
        jQ.type = 'text/javascript'; //Define o tipo desse elemento para text/javascript
        jQ.onload = runthis; //Registra a função que devera ser chamada assim que o jQuery carregar
        jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; //Adiciona o jQuery do servidores de CDN do Google
        document.body.appendChild(jQ); //Inclui o jQuery no corpo da pagina
    } else {
        runthis(); //Caso o jQuery esteja disponível executamos a rotina
    }

    var runthis = function() {
        alert('Precione Ctrl+Alt e clique na tabela que você quer transformar em CSV');
        var result = ''; //Variavél que ira conter o text gerado
        //
        //Regista um evento para o hover do mouse, para todas as tabelas da pagina
        $('table').hover(function() { //função a ser executada quando o mouse ficar acima do tabela
            $(this).css({
                border: '5px blue solid'
            }); //Adiciona uma borda azul na tabela
        }, function() { //função a ser executada quando o mouse sair de cima do tabela
            $(this).css({
                border: ''
            }); //Remove a borda azul da table
        });

        // Executa uma função quando o usuário clicar em uma tabela ma pagina
        $('table').click(function(e) {
            if (e.altKey && e.ctrlKey) //Verifica se as teclas Ctrl e Alt estão pressionadas
            {
                e.preventDefault(); //Previne o comportamento padrão, seja ele qual for
                $('tr', this).each(function() { // Encontra todas as linhas da nossa tabela e aplica uma função nelas
                    var colunas = []; // Cria um array vazio para guardar o valor das colunas
                    $(this).find('td').each(function() { //Encontra todas as colunas
                        colunas.push($(this).text()); //Adiciona o conteudo da coluna ao array 'colunas'
                    });
                    result += colunas.join(', ') + "\n"; // faz o join do array com virgulas e coloca uma quebra de linha
                });
            }
        });
    }

    //Função para abrir uma janela
    var writeCSV = function(conteudo) {
        top.popUp = window.open('', 'popup', //Define a url e o nome da janela
        'width=800,height=600' // Define largura e altura da janela respectivamente
        + ',menubar=0' //Define exibição da barra de menus: 0 pra NÃO e 1 pra SIM
        + ',toolbar=1' //Define exibição da barra de ferramentas: 0 pra NÃO e 1 pra SIM
        + ',status=0' //Define exibição da barra de status: 0 pra NÃO e 1 pra SIM
        + ',scrollbars=1' //Define exibição da barra de rolagem: 0 pra NÃO e 1 pra SIM
        + ',resizable=1' //Define se a janela pode ser redimensionada: 0 pra NÃO e 1 pra SIM
        );
        top.popUp.document.writeln( //Escreve HTML dentro da janela recem aberta
        '<html><head><title>CSV</title></head>' // Escreve o titulo da Pagina
        + '<body bgcolor=white onLoad="self.focus()">' //No onload da pagina esta recebera foco
        + '<pre>' + conteudo + '</pre>' + // inclui o conteudo na pagina
        +'</body></html>' //Fecha as tags;
        );
        top.popUp.document.close();
    }
});
