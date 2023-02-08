( function(){
    'use strict';
    console.log('reading js');

    const btn = document.querySelector('#gbtn');
    btn.addEventListener('click', function(){
        
    });

    const f = document.querySelector('form');
    const m = document.querySelector('#madlib');
    f.addEventListener('submit', function(e){
        e.preventDefault();
        let n = document.querySelector('#noun1').value;
        let n2 = document.querySelector('#noun2').value;
        let adj = document.querySelector('#adj').value;
        let v = document.querySelector('#verb').value;

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
            myText = `The words you gave are ${n}, ${n2}, ${adj}, ${v}`;
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