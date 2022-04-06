// https://jefferson-cuartas.medium.com/how-to-create-a-flip-card-effect-using-javascript-767dd945210c


const card = util.qs('.card');

card.addEventListener('click', () => {
    card.classList.toggle('flipcard');
});


const flipArray = getQuiz();
console.log(flipArray);