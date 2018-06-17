(function(){
    'use strict';

    const $article = document.querySelectorAll('.card');
	for(var i=0; i< $article.length; i++ ) {
		$article[i].addEventListener('mouseenter', function(){
			this.classList.remove('mouseleave');
			this.classList.add('mouseenter');
			//console.log(this);
		});
		$article[i].addEventListener('mouseleave', function(){
			this.classList.remove('mouseenter');
			this.classList.add('mouseleave');
			//console.log(this);
		});
    }
    
})();