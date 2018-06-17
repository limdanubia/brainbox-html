(function(){

	var $toggleView = document.querySelector('.toggleView');
	var $cards = document.querySelector('.cards');

	$toggleView.addEventListener('click', function(){
		this.classList.toggle('active');
		$cards.classList.toggle('blocked');

		//mudar imagem
		// const textButton = this.textContent.trim();        
        // if( textButton == 'Linhas' ) {
        //     this.textContent = 'Blocos';
        // } else {
        //     this.textContent = 'Linhas';
		// }   
		
	}, false);

})();
