import * as util from './utilities';
import * as qz from './quiz';

const card = util.qs('.card');

card.addEventListener('touchend', () => {
    card.classList.toggle('flipcard');
});


const flipArray = qz.getQuiz();
console.log(flipArray);