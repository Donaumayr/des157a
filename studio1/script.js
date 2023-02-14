( function(){
    'use strict';
    console.log('reading js');

    const btn = document.querySelector('#gbtn');
    btn.addEventListener('mousedown', function(e){
        e.preventDefault();
        document.querySelector('.hidden').className = 'overlay showing';
    });

    const f = document.querySelector('form');
    const m = document.querySelector('#madlib');
    f.addEventListener('submit', function(e){
        e.preventDefault();
        const n = document.querySelector('#noun1').value;
        const n2 = document.querySelector('#noun2').value;
        const adj = document.querySelector('#adj').value;
        const v = document.querySelector('#verb').value;

        let myText;
        console.log(n);

        if(n == ''){
            myText = "Please provide a noun";
            document.querySelector('#noun1').focus();
        }
        else if (n2 == '') {
            myText = "Please provide a noun";
            document.querySelector('#noun2').focus();
        }
        else if (adj == '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj').focus();
        }
        else if (v == '') {
            myText = "Please provide a verb";
            document.querySelector('#verb').focus();
        }
        else {
            document.querySelector('.overlay').className = 'overlay hidden';
            const arr = document.querySelectorAll('.showing');
            for (const el of arr) {
                el.className = 'hidden'
            }
            const arr2 = document.querySelectorAll('.white');
            for (const el of arr2) {
                el.style.color = 'white';
            }
            document.querySelector('#door').className = 'closeleft';
            document.querySelector('#door2').className = 'closeright';
            document.querySelector('#madlib').style.display = 'block';
            myText = `The serene <b>${n}</b> is a majestic and soothing place to meditate. The crisp, fresh air fills your lungs and you can feel the cool breeze on your skin. As you look around, you see the <b>${adj}</b> views of the surrounding <b>${n2}</b>, which takes your breath away. The <b>${v}</b> of the birds, rustling of the leaves, and the distant sound of waterfalls make it a perfect place for inner peace. You close your eyes, and start focusing on your breath, sinking deeper into a state of tranquility and relaxation. The <b>${n}</b> embraces you, and you feel a sense of calm and rejuvenation that lasts long after you leave.`;
            const textFields = document.querySelectorAll('input');
            for (const tField of textFields) {
                if (tField.type !== 'submit') {
                    tField.value = '';
                }
                
            }
        }
        m.innerHTML = myText;
    });
})();