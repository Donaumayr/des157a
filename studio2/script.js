( function(){
    'use strict';
    console.log('reading js');

    window.addEventListener('load', function(){
        const sections = document.querySelectorAll('section');
        let secTops = [];
        let count = 1;
        let pCount = 1;
        sections.forEach(function(section){
            secTops.push(Math.floor(section.getBoundingClientRect().top)+window.pageYOffset);
        });
        console.log(secTops);

        window.addEventListener('scroll', function(){
            let pageTop = window.pageYOffset + 200;
            console.log(pageTop);
    
            if(pageTop > secTops[count]) {
                count++;
            }else if(count > 1 && pageTop < secTops[count - 1]) {
                count--;
            }

            if (count != pCount) {
                console.log("update count");
                document.querySelector(`#bg${count}`).className = 'view current';
                document.querySelector(`#bg${pCount}`).className = 'view hidden';
                //document.querySelector('#view').src = `images/${count}bg.jpg`;
                pCount = count;
            }
        });
    });

    const imgs = document.querySelectorAll('.caption img');
    for (let img of imgs) {
        img.addEventListener('mouseover', function(){
            img.className = 'zoomed';
        });
        img.addEventListener('mouseout', function(){
            img.className='normal';
        })
    }
})();