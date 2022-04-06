
import { qs } from './utilities.js';
const url1 = 'rus19023.github.io/scripturechase/json/lds-scriptures.json';
const url6 = 'https://raw.githubusercontent.com/rus19023/scripturechase/main/json/scripturechase.json';

const url5 = [
    { ques: "Superman", ans: "Clark Kent" },
    { ques: "Wonder Woman", ans: "Diana Prince" },
    { ques: "Batman", ans: "Bruce Wayne" }
];

console.log(url5);

//  https://abn.churchofjesuschrist.org/study/manual/doctrinal-mastery-core-document-2018/doctrinal-mastery-passages/doctrinal-mastery-passages-by-topic-and-course?lang=eng

//  https://abn.churchofjesuschrist.org/study/manual/doctrinal-mastery-core-document-2018/doctrinal-mastery-passages/doctrinal-mastery-passages-and-key-phrases?lang=eng

//  https://www.churchofjesuschrist.org/study/manual/doctrinal-mastery-core-document-2018/doctrinal-mastery-passages/doctrinal-mastery-passages-by-topic-and-course?lang=spa

// https://www.churchofjesuschrist.org/study/manual/doctrinal-mastery-core-document-2018/doctrinal-mastery-passages/doctrinal-mastery-passages-and-key-phrases?lang=spa

const baseurl = 'https://abn.churchofjesuschrist.org/study/scriptures';
var volume = '';
var book = '';
var chapter = '';
var startverse = '';
var endverse = '';
//var langpref = qs('#langpref').value;

export const buildUrl = (volume, book, chapter, startverse, endverse) => {
    if (endverse.length > 0) {
        var verses = `${startverse}-${endverse}`;
    } else {
        var verses = startverse;
    }
    return `${baseurl}/${volume}/${book}/${chapter}/${verses}?lang=${langpref}`;
}

const quizlist = [
    {
        "unitname":"ot",
        "src":"src/img/ot/mobile/adam_eve_altar-ot-tall.webp",
        "alt": "Image of Adam and Eve at an altar"
    },
    {
        "unitname":"nt",
        "src":"src/img/ot/mobile/jesus_at_the_door.webp",
        "alt": "Image of Jesus Christ knocking at a door"
    },
    {
        "unitname":"bom",
        "src":"src/img/ot/mobile/christ_appearing_nephites.webp",
        "alt": "Image of Christ appearing to the Nephites after His Resurrection"
    },
    {
        "unitname":"dc",
        "src":"src/img/ot/mobile/first_vision.webp",
        "alt": "Image of Joseph Smith's First Vision"
    }
]

// Todo: concatenate all unit questions into one array

// get the questions from the units chosen in the home page
const getQuiz = async (url) => {
    if (!('fetch' in window)) {
        console.log('Your browser does not support this app. Please use a modern browser such as Chrome, Safari, Opera, Brave, FireFox or Edge.');
        return;
    } else { console.log('getQuiz() invoked'); }
    try {
        const response = await fetch(url);
        console.log('fetch/try invoked');
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        } else {
            const getQuizArray = await response.json();
            console.log(getQuizArray);
            console.log('getQuizArray/try invoked');
            let newArray = [];
            console.log(getQuizArray);
            let quizunits = ["ot", "nt", "bom", "dc"];
            getQuizArray.forEach(el => {
                console.log(el.unit);
                console.log(quizunits);
                console.log(quizunits.includes(el.unit));
                if (quizunits.includes(el.unit)) {
                    newArray.push();
                    console.log(newArray);
                }
            });
            const quiz = newArray;
            console.log(quiz);
            this.quiz = quiz;
            view.start.addEventListener('click', () => game.start(quiz.questions), false);
            view.response.addEventListener('click', (event) => game.check(event), false);
        }
        console.log(newArray);
        return newArray;
    } catch (error) {
        console.log('Looks like there was a problem: ', error);
    }
};
window.addEventListener("load", () => {
    getQuiz(url6);
});

// const response = await getQuiz(url);
//     if (response) {
//         // Read the response as json.
//         console.log(await response.json()
//         .then(quiz => {
//             view.start.addEventListener('click', () => game.start(quiz.questions), false);
//             view.response.addEventListener('click', (event) => game.check(event), false);
//         })

//     }

function random(a, b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a, b] = [b, a];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}
//const quiz = getQuiz(url6);
//console.log(quiz);

// View Object
const view = {
    score: qs("#score strong"),
    question: qs("#question"),
    result: qs("#result"),
    info: qs("#info"),
    start: qs("#start"),
    response: qs("#response"),
    timer: qs('#timer strong'),
    hiScore: qs('#hiScore strong'),
    user: qs('#user strong'), // TODO: get username from firebase

    render(target, content, attributes) {
        console.log('render(target, content, attributes) invoked');
        //console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
        for (const key in attributes) {
            console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },

    show(element) {
        console.log('show(element) invoked');
        element.style.display = "block";
    },

    hide(element) {
        console.log('hide(element) invoked');
        element.style.display = "none";
    },

    setup() {
        console.log('setup() invoked');
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
        console.log('teardown() invoked');
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
        console.log(quiz);
    },

    // {
    //     "unit": "Doctrine and Covenants",
    //     "book_title": "Doctrine and Covenants",
    //     "book_short_title": "D&C",
    //     "chapter_number": 1,
    //     "verse_number": 1,
    //     "verse_title": "Doctrine and Covenants 1:1",
    //     "verse_short_title": "D&C 1:1",
    //     "scripture_text": "Hearken, O ye people of my church, saith the voice of him who dwells on high, and whose eyes are upon all men; yea, verily I say: Hearken ye people from afar; and ye that are upon the islands of the sea, listen together."
    // },

    // {
    //     "mastery_title": "full scripture reference",
    //     "volume": "unit",
    //     "book": "book_title",
    //     "chapter": 0,
    //     "v1": 1,
    //     "v2": 2,
    //     "v3": 3,
    //     "v4": 4,
    //     "v5": 5,
    //     "v6": 6,
    //     TODO: start with 1 clue, button to give more clues
    //     "clues": ["clue 1", "clue 2", "clue 3", "clue 4", "clue 5", "clue 6"],
    //     TODO: toggle? to choose which type of quiz: ["clues", "context", "principle", "keywords", "memorization"]
    //     "context": "context",
    //     "principle": "principle"
    //     "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5", "keyword 6"],
    //     TODO: query scripture API to populate text field
    //     TODO: scrambled words, use shuffle function, drag and drop: https://blog.jscrambler.com/build-a-simple-game-in-vanilla-js-with-the-drag-and-drop-api
    // },


    ask(ques) {
        console.log('ask() invoked');
        if(this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [this.questions[0].verse_title, this.questions[1].verse_title, this.questions[2].verse_title, this.question.verse_title];
            //console.log(options);
            shuffle(options);
            const question = `Clues: ${this.question.clues}`;
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
        const answer = this.question.ans;
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
            console.log(`CBonus: ${this.cbonus}, consecutive: ${this.consecutive}, bonus: ${this.bonus}`);
            console.log (`score: ${this.score}`);
            this.consecutive = 0;
        }
        this.ask();
    },

    countdown() {
        console.log('countdown() invoked');
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
        console.log('hiScore() invoked');
        const hi = localStorage.getItem('highScore') || 0;
        if(this.score > hi || hi === 0) {
            localStorage.setItem('highScore', this.score);

            // TODO: get username from db, add to high score display
            view.render(view.info, '** NEW HIGH SCORE! **', {'class':'bghotpink'});
        }
        return localStorage.getItem('highScore');
    },
}