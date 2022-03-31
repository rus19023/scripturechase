// https://jefferson-cuartas.medium.com/how-to-create-a-flip-card-effect-using-javascript-767dd945210c

import * as util from './utilities';
import * as qz from './quiz';

const card = util.qs('.card');

card.addEventListener('click', () => {
    card.classList.toggle('flipcard');
});


const flipArray = qz.getQuiz();
console.log(flipArray);