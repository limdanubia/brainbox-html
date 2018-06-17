(function(){
    'use strict';

    // const $btnSync = $("#btnSync");
    // $btnSync.removeClass('no-js');

    $writingArea.on('focusout', function(){
        let $this = $(this);
        //$this.removeClass('botaoSync--esperando');
        //$this.removeClass('botaoSync--deuRuim');

        //$this.addClass('botaoSync--esperando');
        
        $.ajax({
            url: "http://ceep.herokuapp.com/cartoes/salvar",
            method: "POST",
            data: {
                usuario: "h.milena@gmail.com",
                cartoes: cards
            },
            success: function() {
                // $this.removeClass('botaoSync--esperando');
                // $this.addClass('botaoSync--sincronizado');
            },
            error: function() {
                // $this.removeClass('botaoSync--esperando');
                // $this.addClass('botaoSync--deuRuim');
            }
        });
        
        
        //$this.addClass('botaoSync--sincronizado');

    });
    
})();