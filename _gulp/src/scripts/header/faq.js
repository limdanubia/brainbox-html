;(function(doc){
    'use strict';
    
    //dúvidas
    const faq = doc.querySelector('.faq');
    //faq.classList.remove('no-js');

    faq.addEventListener('click', function(){

        const ajax = new XMLHttpRequest();
        ajax.open('get', 'http://ceep.herokuapp.com/cartoes/instrucoes');
        ajax.send();

        ajax.addEventListener('load', function(){
            const ajaxResponse = JSON.parse(ajax.response);
            const instructions = ajaxResponse.instrucoes;

            for(var i = 0; i < instructions.length; i++ ){
                addCard(instructions[i].conteudo, instructions[i].cor);
            }
        });
        
    });
    
})(document);