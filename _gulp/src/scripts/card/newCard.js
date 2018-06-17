(function(doc){
    'use strict';
    
    // const $writingArea = doc.querySelector('.formNovoCartao');
    
    // $writingArea.classList.remove('no-js');

    const $theTitle = $writingArea.querySelector('.title');
    const $mainText = $writingArea.querySelector('.the-box');
    const $tags = $writingArea.querySelector('.tags');
    const $sendButton = $writingArea.querySelector('.close-addcard');
    const $mural = doc.querySelector('.add-card');
    const $cards = doc.querySelectorAll('.card');

    // $mainText.addEventListener('focusin', function(){
    //     this.classList.add('conteudo--focado');
    // });

    $sendButton.addEventListener('click', function(e){
        //e.preventDefault();  

        //$mainText.classList.remove('conteudo--focado');
              
        
        // const textareaValue = $mainText.value.trim();

        // if( !textareaValue ) {
        //     const errorMessege = doc.createElement('div');
        //     errorMessege.textContent = 'Digite alguma coisa!';
        //     errorMessege.classList.add('formNovoCartao-msg');
        //     $writingArea.appendChild(errorMessege);
        // } else {
        //     addCard(textareaValue);     
        //     $mainText.value = "";       
        // }

    });


})(document);