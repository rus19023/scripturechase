// https://jefferson-cuartas.medium.com/how-to-create-a-flip-card-effect-using-javascript-767dd945210c

const flipcard = qs('#flipcard');

flipcard.addEventListener('click', () => {
    flipcard.classList.toggle('flipcard');
});


const flipArray = getQuiz();
console.log(flipArray);