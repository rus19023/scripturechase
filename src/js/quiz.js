import * as util from '../js/utilities.js';

const url1 = 'rus19023.github.io/scripturechase/json/lds-scriptures.json';
const url6 = 'https://raw.githubusercontent.com/rus19023/scripturechase/main/json/scripturechase.json';

const url5 = [
    { ques: "Superman", ans: "Clark Kent" },
    { ques: "Wonder Woman", ans: "Diana Prince" },
    { ques: "Batman", ans: "Bruce Wayne" },
    { ques: "Flash", ans: "Barry Allen" },
    { ques: "Cyborg", ans: "Victor Stone" },
    { ques: "IronMan", ans: "Tony Stark" },
    { ques: "Catwoman", ans: "Selena Kyle" },
    { ques: "Riddler", ans: "Edward Nygma" },
    { ques: "SpiderMan", ans: "Peter Parker" },
    { ques: "Green Goblin", ans: "Norman Osborne" },
    { ques: "Penguin", ans: "Oswald Cobblepot" },
    { ques: "Scarecrow", ans: "Dr Jonathan Crane" },
    { ques: "Dr Manhattan", ans: "Jonathan Osterman" },
    { ques: "Rorschach", ans: "Walter Kovacs" },
    { ques: "Gambit", ans: "Remy LeBeau" },
    { ques: "Wolverine", ans: "James Logan" },
    { ques: "Mystique", ans: "Raven Darkholme" },
    { ques: "Magneto", ans: "Max Eisenhardt" },
    { ques: "Professor X", ans: "Charles Xavier" },
    { ques: "Phoenix", ans: "Jean Gray" },
    { ques: "NightCrawler", ans: "Kurt Wagner" },
    { ques: "Beast", ans: "Hank McCoy" },
    { ques: "Storm", ans: "Ororo Munroe" },
    { ques: "Rogue", ans: "Anna Marie DAncanto" },
    { ques: "The Hulk", ans: "Bruce Banner" },
    { ques: "Spider-man", ans: "Peter Parker" },
    { ques: "Cyclops", ans: "Scott Summers" }
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
//var langpref = util.qs('#langpref').value;

const buildUrl = (volume, book, chapter, startverse, endverse) => {
    if (endverse.length > 0) {
        var verses = `${startverse}-${endverse}`;
    } else {
        var verses = startverse;
    }
    return `${baseurl}/${volume}/${book}/${chapter}/${verses}?lang=${langpref}`;
}

const getQuiz = async (url) => {
    if (!('fetch' in window)) {
        console.log('Your browser does not support this app. Please use a modern browser such as Chrome, Safari, Opera, Brave, FireFox or Edge.');
        return;
    }
    // fetch(url6)
    // .then(res => res.json())
    // .then(quiz => {
    //     view.start.addEventListener('click', () => game.start(quiz.questions), false);
    //     view.response.addEventListener('click', (event) => game.check(event), false);
    // });
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        } else {
            const getQuizArray = await response.json();
            let newArray = [];
            console.log(getQuizArray);
            getQuizArray.forEach(el => {
                console.log(el);
            });
            // Create a new json file for the mastery scripture passages
            // getQuizArray.forEach(vol => {
            //         vol.bom.forEach(el => {
            //             if (el.mastery) {
            //                 console.log(el);
            //                 newArray.push(el);
            //             }
            //         });
            //         vol.ot.forEach(el => {
            //             if (el.mastery) {
            //                 console.log(el);
            //                 newArray.push(el);
            //             }
            //         });
            //         vol.nt.forEach(el => {
            //             if (el.mastery) {
            //                 console.log(el);
            //                 newArray.push(el);
            //             }
            //         });
            //         vol.dc.forEach(el => {
            //             if (el.mastery) {
            //                 console.log(el);
            //                 newArray.push(el);
            //             }
            //         });
            //     console.log(newArray);
            //     const text = JSON.stringify(newArray);
            //     const name = "sample.json";
            //     const type = "text/plain";
            //     // create file
            //     const a = document.createElement("a");
            //     const file = new Blob([text], { type: type });
            //     a.href = URL.createObjectURL(file);
                   //  auto download the json file
            //     a.download = name;
            //     document.body.appendChild(a);
            //     a.click();
            //     a.remove();
            // });
            const quiz = getQuizArray.filter(quiz => quiz.type === 'multiple');
            view.start.addEventListener('click', () => game.start(quiz.questions), false);
            view.response.addEventListener('click', (event) => game.check(event), false);
        }
        return response;
    } catch (error) {
        console.log('Looks like there was a problem: ', error);
    }
};

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

const quiz = getQuiz(url6);
console.log(quiz);

// View Object
const view = {
    score: util.qs("#score strong"),
    question: util.qs("#question"),
    result: util.qs("#result"),
    info: util.qs("#info"),
    start: util.qs("#start"),
    response: util.qs("#response"),
    timer: util.qs('#timer strong'),
    hiScore: util.qs('#hiScore strong'),
    user: util.qs('#user strong'), // TODO: get username from firebase

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

    // {
    //     "volume_title": "Doctrine and Covenants",
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
    //     "volume": "volume_title",
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
            const options = [this.questions[0].mastery_title, this.questions[1].mastery_title, this.questions[2].mastery_title, this.question.mastery_title];
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