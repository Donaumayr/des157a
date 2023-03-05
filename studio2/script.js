( function(){
    'use strict';
    console.log('reading js');

    window.addEventListener('load', function(){
        const sections = document.querySelectorAll('section');
        let secTops = [];
        let pageTop;
        let count = 1;
        let pCount = 1;
        let doneResizing;
        sections.forEach(function(section){
            secTops.push(Math.floor(section.getBoundingClientRect().top)+window.pageYOffset);
        });
        console.log(secTops);

        window.addEventListener('scroll', function(){
            let pageTop = window.pageYOffset + 200;
            console.log(pageTop);
    
            if(pageTop > secTops[count]) {
                count++;
                console.log(`scroll down ${count}`);
            }else if(count > 1 && pageTop < secTops[count - 1]) {
                count--;
                console.log(`scrolling up ${count}`);
            }

            if (count != pCount) {
                
            }
        });
    });
})();