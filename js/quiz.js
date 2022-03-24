const url = 'http://rus19023.github.io/myportfolio/330/exercises/questions.json';
const url2 = 'https://gist.github.com/mariodev12/a923f2b651a005ca3ca7f851141efcbc';
const url3 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/questions.json';
const url4 = 'http://localhost/myportfolio/330/exercises/js/questions.json';
const url6 = 'https://rus19023.github.io/scripturechase/json/lds-scriptures.json';

const url5 = [
    { name: "Superman", realName: "Clark Kent" },
    { name: "Wonder Woman", realName: "Diana Prince" },
    { name: "Batman", realName: "Bruce Wayne" },
    { name: "Flash", realName: "Barry Allen" },
    { name: "Cyborg", realName: "Victor Stone" },
    { name: "IronMan", realName: "Tony Stark" },
    { name: "Catwoman", realName: "Selena Kyle" },
    { name: "Riddler", realName: "Edward Nygma" },
    { name: "SpiderMan", realName: "Peter Parker" },
    { name: "Green Goblin", realName: "Norman Osborne" },
    { name: "Penguin", realName: "Oswald Cobblepot" },
    { name: "Scarecrow", realName: "Dr Jonathan Crane" },
    { name: "Dr Manhattan", realName: "Jonathan Osterman" },
    { name: "Rorschach", realName: "Walter Kovacs" },
    { name: "Gambit", realName: "Remy LeBeau" },
    { name: "Wolverine", realName: "James Logan" },
    { name: "Mystique", realName: "Raven Darkholme" },
    { name: "Magneto", realName: "Max Eisenhardt" },
    { name: "Professor X", realName: "Charles Xavier" },
    { name: "Phoenix", realName: "Jean Gray" },
    { name: "NightCrawler", realName: "Kurt Wagner" },
    { name: "Beast", realName: "Hank McCoy" },
    { name: "Storm", realName: "Ororo Munroe" },
    { name: "Rogue", realName: "Anna Marie DAncanto" },
    { name: "The Hulk",realName: "Bruce Banner" },
    { name: "Spider-man",realName: "Peter Parker" },
    { name: "Cyclops",realName: "Scott Summers" }
];

//console.log(url3);

fetch(url6)
.then(res => res.json())
.then(quiz => {
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
    view.response.addEventListener('click', (event) => game.check(event), false);
});

function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a,b] = [b,a];
    }
    return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

// View Object
const view = {
    score: document.querySelector("#score strong"),
    question: document.getElementById("question"),
    result: document.getElementById("result"),
    info: document.getElementById("info"),
    start: document.getElementById("start"),
    response: document.querySelector("#response"),
    timer: document.querySelector('#timer strong'),
    hiScore: document.querySelector('#hiScore strong'),

    render(target, content, attributes) {
        //console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
        for (const key in attributes) {
            console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },

    show(element) {
        element.style.display = "block";
    },

    hide(element) {
        element.style.display = "none";
    },

    setup() {
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score, game.score);
        this.render(this.result, "");
        this.render(this.info, "");
        this.render(this.hiScore, game.hiScore(), '');
    },

    buttons(array) {
        //console.log(array.map(value => `<button>${value}</button>`).join(''));
        return array.map(value => `<button class="quizbutton">${value}</button>`).join('');
    },

    teardown() {
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
        this.render(this.hiScore, game.hiScore(), {'class':'bghotpink'});
    },
};

const game = {
    start(quiz) {
        console.log('start() invoked');
        this.score = 0;
        this.bonus = 0;
        this.isConsecutive = false;
        this.consecutive = 0;
        this.correct = 0;
        this.cbonus = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
        this.secondsRemaining = quiz.length * 8;
        this.timer = setInterval( this.countdown , 1000 );
    },

    ask(name) {
        console.log('ask() invoked');
        if(this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [this.questions[0].realName, this.questions[1].realName, this.questions[2].realName, this.question.realName];
            //console.log(options);
            shuffle(options);
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question, question);
            //console.log(view.buttons(options));
            view.render(view.response, view.buttons(options), {'class':'buttonbox'});
        } else {
            this.gameOver();
        }
    },

    check(event) {
        console.log('check(event) invoked');
        const response = event.target.textContent;
        const answer = this.question.realName;
        if(response === answer) {
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score += 10;
            view.render(view.score, this.score);
            this.correct++;
            this.isConsecutive = true;
        } else {
            this.isConsecutive = false;
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        if (this.isConsecutive) {
            this.consecutive++;
            if (this.consecutive > 4) {
                this.cbonus = 10;
            } else if (this.consecutive > 9) {
                this.cbonus = 20;
            } else if (this.consecutive > 14) {
                this.cbonus = 30;
            } else if (this.consecutive > 19) {
                this.cbonus = 40;
            } else if (this.consecutive > 24) {
                this.cbonus = 50;
            } else if (this.consecutive > 39) {
                this.cbonus = 75;
            } else if (this.consecutive > 49) {
                this.cbonus = 100;
            }
            this.bonus += (this.cbonus * this.consecutive);
            console.log(`CBonus: ${this.cbonus}, consecutive: ${this.consecutive}, bonus: ${this.bonus}`);
            console.log (`score: ${this.score}`);
            this.score += this.bonus;
        } else {
            this.bonus += (this.cbonus * this.consecutive);
            console.log(`CBonus: ${this.cbonus}, consecutive: ${this.consecutive}, bonus: ${this.bonus}`);
            console.log (`score: ${this.score}`);
            this.score += this.bonus;
            this.consecutive = 0;
        }
        this.ask();
    },

    countdown() {
            game.secondsRemaining--;
            view.render(view.timer,game.secondsRemaining);
            if(game.secondsRemaining < 0) {
                game.gameOver();
            }
    },

    gameOver() {
        console.log('gameOver() invoked');
        view.render(
        view.info,
        `Game Over, you scored ${this.score} point${this.score !== 1 ? "s" : ""}`
        );
        view.teardown();
        clearInterval(this.timer);
    },

    hiScore() {
        const hi = localStorage.getItem('highScore') || 0;
        if(this.score > hi || hi === 0) {
            localStorage.setItem('highScore', this.score);

            // TODO: get username from db, add to high score display
            view.render(view.info, '** NEW HIGH SCORE! **', {'class':'bghotpink'});
        }
        return localStorage.getItem('highScore');
    },
}