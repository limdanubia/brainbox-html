const cards = [];
const $writingArea = document.querySelector('.writing-area');

const addCard = (function(){

	'use strict'; 

	const $writingArea = document.querySelector('.writing-area');
	const $addCard = document.querySelector('.add-card');
	const $lightbox = document.querySelector('.lightbox');
	const $closeAddBox = document.querySelector('.close-addcard');

	let cardNumber = 0;

	$.ajax({
        url: "http://ceep.herokuapp.com/cartoes/carregar?usuario=h.milena@gmail.com",
        mehotd: "GET",
        dataType: "jsonp",
        success: function( response ) {
            const cards = response.cartoes;    
            cards.forEach(function(item){
                addCard( item.conteudo, item.cor );
            });
        }
    });

	$writingArea.addEventListener('click', function(){
		$addCard.classList.remove('no-typing');
		$lightbox.classList.remove('hidden');
		 //$cards.classList.toggle('blocked');
	});

	function closeAddCard(el){
		el.addEventListener('click', function(){
			setTimeout(function(){
				$addCard.classList.add('no-typing');
				$lightbox.classList.add('hidden');
			},100);
		});
	}

	closeAddCard($lightbox);
	closeAddCard($closeAddBox);

	function addCard(content, cor = "#EBEF40"){
		cardNumber++;

        const singleCard = {
            conteudo: content,
            cor: cor
        }

	cards.push(singleCard);
		
	const $singleCard = $(`
		<article id="cartao_${cardNumber}" class="card" tabindex="0" style="background-color: ${cor}">
			<div class="main-actions">
				<div class="colors">
					<button class="pick-a-color"><img src="assets/img/card/icon-colorpicker.png" alt="" tabindex="0"></button>
				</div>
				<div class="trash">
					<button class="remove-card"><img src="assets/img/card/icon-trash.png" alt="" tabindex="0"></button>
				</div>
			</div>
			<div class="edit-box" tabindex="0">
				<p>${content}</p>
			</div>
		</article>
	`);

	$singleCard
		.on('click', '.remove-card', function(e) {               
			$singleCard.addClass('hide-card');
			$singleCard.on('transitionend', function(){
				$singleCard.remove();
			});
			cards.splice(cards.indexOf( singleCard ), 1);
		}); 

/*
		.on('focusin', function() {
			$(this).addClass('focused');
		})

		.on('focusout', function() {
			$(this).removeClass('focused');
		})

		.on('input', '.opcoesDoCartao-radioTipo', function(e) {
			const color = $(this).val();
			$singleCard.css('backgroundColor', color);
			singleCard.cor = color;
		})

		.on('input', '.cartao-conteudo', function(e) {
			const $p =  $(this).text();
			singleCard.conteudo = $p ;
		})

		.on('keydown', '.opcoesDoCartao-tipo', function(e) {
			const theKey = e.key; 
			const input = e.target;
			if( isLabel && (theKey == "Enter" || theKey == " ") ) {
				input.click();
			}
		})
*/
           
		$singleCard.appendTo($mural);

	}

})();
