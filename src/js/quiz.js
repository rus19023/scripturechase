 import { qs } from './utilities.js';
const url1 = 'rus19023.github.io/scripturechase/json/lds-scriptures.json';
const url6 = 'https://raw.githubusercontent.com/rus19023/scripturechase/main/json/scripturechase.json';

const url5 = [
    { ques: "Superman", ans: "Clark Kent" },
    { ques: "Wonder Woman", ans: "Diana Prince" },
    { ques: "Batman", ans: "Bruce Wayne" }
];

//console.log(url5);

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
];

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card

// Todo: concatenate all unit questions into one array

// get the questions from the units chosen in the home page
const getQuiz = async (url) => {
    if (!('fetch' in window)) {
        console.log('Your browser does not support this app. Please use a modern browser such as Chrome, Safari, Opera, Brave, FireFox or Edge.');
        return;
    } else { console.log('getQuiz() invoked'); }
    try {
        const fetchResponse = await fetch(url);
        console.log('fetch/try invoked');
        if (!fetchResponse.ok) {
            throw Error(`${fetchResponse.status} ${fetchResponse.statusText}`);
        } else {
            const getQuizArray = await fetchResponse.json();
            //console.log(getQuizArray);
            console.log('getQuizArray/try invoked');
            const questions = [];
            let quiz = { "questions": questions };
            //console.log(getQuizArray);
            // todo: get the quizunits from home page checkboxes as string
            //let quizunits = Array.from(document.querySelectorAll('.chkbtn').selectedOptions).map(option => option.value);
            //let quizunits = Array.from(document.querySelectorAll('.chkbtn'));
            let quizunits = ["ot", "nt", "bom", "dc"];
            //console.log(quizunits);
            getQuizArray.forEach(el => {
                let notDef = el.keywords;
                //console.log(notDef, el.verse_title);
                // Push only the questions that are in the units selected to the quiz array
                if ((quizunits.includes(el.unit)) && (typeof el.keywords !== 'undefined') && (el.keywords.length > 0)) {
                    //console.log(el);
                    //console.log(el.unit);
                    //console.log(quizunits);
                    //console.log(quizunits.includes(el.unit));
                    //console.log('KEYWORDS:  ' + el.keywords);
                    let obj = {
                        ques: 'What scripture reference contains the following? <br><br>' + el.keywords[0],
                        ans: el.verse_title,
                        hint1: el.keywords[1],
                        hint2: el.keywords[2],
                        hint3: el.keywords[3],
                        hint4: el.keywords[4],
                        hint5: el.keywords[5],
                        hint6: el.context,
                        hint7: el.description,
                        hint8: el.scripture_text,
                    };
                    //console.log(obj);
                    questions.push(obj);
                }
                quiz = { "questions": questions };
                //console.log(quiz);
            });
            //console.log(quiz);
            //this.quiz = newArray;
            view.start.addEventListener('click', () => game.start(quiz.questions), false);
            //view.startflip.addEventListener('click', () => game.startflip(quiz.questions), false);
            view.hint.addEventListener('click', () => game.hint(quiz.questions.keywords), false);
            view.next.addEventListener('click', () => game.next(quiz.questions), false);
            view.response.addEventListener('click', (event) => game.check(event), false);
        }
        //return quiz;
    } catch (error) {
        console.log('Looks like there was a problem: ', error);
    }
};

window.addEventListener("load", () => {
    getQuiz(url6);
});

const random = (a, b=1) => {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a, b] = [b, a];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}

const shuffle = (array) => {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

// View Object
const view = {
    score: qs("#score strong"),
    start: qs("#start"),
    next: qs("#next"),
    hint: qs("#hint"),
    question: qs("#question"),
    result: qs("#result"),
    info: qs("#info"),
    response: qs("#response"),
    front: qs("#front"),
    back: qs("#back"),
    timer: qs('#timer strong'),
    hused: qs("#hused"),
    tused: qs("#tused"),
    ccc: qs("#ccc"),
    tbonus: qs("#tbonus strong"),
    hbonus: qs("#hbonus strong"),
    cbonus: qs("#cbonus"),

    hiScore: qs('#hiScore strong'),
    user: qs('#user strong'), // TODO: get username from firebase

    render(target, content, attributes) {
        //console.log('render(target, content, attributes) invoked');
        //console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
        for (const key in attributes) {
            //console.log('target: ' + target + ' content: ' + content + ' attributes: ' + attributes);
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },

    show(element) {
        // console.log('show(' + element + ') invoked');
        // element.style.display = "flexbox";
        // element.style.border = "1px solid white";
        // element.style.backgroundColor = "white";
        // console.log(element.classList);
        element.classList.remove("hide");
        element.classList.add("todo-bordered");
    },

    hide(element) {
        console.log('hide(' + element + ') invoked');
        element.classList.add('hide');
        element.classList.remove("todo-bordered");
    },

    setup() {
        console.log('setup() invoked');
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.show(this.next);
        this.show(this.hint);
        this.render(this.score, game.score);
        this.render(this.result, "");
        this.render(this.info, "Each correct answer scores 100 points. You get a maximum of 8 hints possible per question. The fewer hints you use, the higher your Hint Bonus. The more consecutive answers you get correct, the higher your Consecutive Bonus. The more time is left on the timer, the higher your Time Bonus. ");

        
        this.hide(this.info);
        this.render(this.hiScore, game.hiScore(), '');
        this.render(this.hbonus, game.hbonus, '');
        this.render(this.tbonus, game.tbonus, '');
        this.render(this.cbonus, game.cbonus, '');
        this.render(this.tused, game.secondsRemaining, '');
        this.render(this.hused, game.hintsUsed, '');
        this.render(this.ccc, game.consecutive, '');
    },

    buttons(array) {
        //console.log(array.map(value => `<button>${value}</button>`).join(''));
        return array.map(value => `<button class="quizbutton">${value}</button>`).join('');
    },

    // front() {
    //     if (isElement()) {

    //     }
    // },

    // back() {

    // },

    teardown() {
        console.log('teardown() invoked');
        this.hide(this.question);
        this.hide(this.response);
        this.hide(this.next);
        this.hide(this.hint);
        this.show(this.start);
        this.render(this.hiScore, game.hiScore(), {'class':'normal-text'});
    },
};

const game = {
    start(quiz) {
        this.gametype = 'quiz';
        console.log('start() invoked');
        this.score = 0;
        this.bonus = 0;
        this.isConsecutive = false;
        this.consecutive = 0;
        this.correct = 0;
        this.hintsUsed = 0;
        this.hintcount = 0;
        this.cbonus = 0;
        this.hbonus = 0;
        this.tbonus = 0;
        this.questions = [...quiz];
        //console.log(this.questions);
        view.setup();
        this.ask();
        this.length = quiz.length;
        this.totalTime = this.length * 15;
        this.secondsRemaining = this.totalTime;
        this.timeUsed = 0;
        this.timer = setInterval( this.countdown , 1000 );
        //console.log(quiz + " quiz.js, line 253 ");
    },
    //     TODO: toggle? to choose which type of quiz: ["clues", "context", "topic", "keywords", "scripture_text"]
    //     "context": "context",
    //     "principle": "principle"
    //     "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5", "keyword 6"],
    //     TODO: query scripture API to populate text field
    //     TODO: scrambled words, use shuffle function, drag and drop: https://blog.jscrambler.com/build-a-simple-game-in-vanilla-js-with-the-drag-and-drop-api
    // },


    ask(ques) {
        console.log('ask() invoked');
        qs('#hint').disabled = false;
        this.hintcount = 0;
        if (this.questions.length > 2) {
            shuffle(this.questions);
        }
        if (this.questions.length < 1 || this.secondsRemaining < 1) {
            this.gameOver();
        } else {
            this.question = this.questions.pop();
            const options = [this.questions[0].ans, this.questions[1].ans, this.questions[2].ans, this.question.ans];
            //console.log(this.questions[0].ques);
            //const keywords = this.questions[0].hint1 + ", " + this.questions[0].hint2 + ", " + this.questions[0].keyword[2] + ", " + this.questions[0].keyword[3] + ", " + this.questions[0].keyword[4];
            console.log('options', options);
           //console.log(keywords);
            shuffle(options);
            const question = this.question.ques;  //  + this.gametype
            console.log('question', question);
            view.render(view.question, question);
            //console.log(view.buttons(options));
            if (this.gametype === "flip") {
                // render flipcard
                view.render(view.front, view.front(question), {'class':'flip-card-front'});
                view.render(view.back, view.back(keywords), {'class':'flip-card-back'});
            } else if (this.gametype === "scramble") {
                // render scrambled words
            } else if (this.gametype === "quiz") {
                // render quiz
                view.render(view.response, view.buttons(options), {'class':'buttonbox'});
            }
        }
    },

    hint() {
        console.log('hint() invoked');
        this.hintcount += 1;
        console.log('this.question: ', this.question);

        switch (this.hintcount) {
            case 1:
                qs('#question').innerHTML += `, ${this.question.hint1}`;
                this.hintsUsed += 1;
                break;
            case 2:
                qs('#question').innerHTML += `, ${this.question.hint2}`;
                this.hintsUsed += 1;
                break;
            case 3:
                qs('#question').innerHTML += `, ${this.question.hint3}`;
                this.hintsUsed += 1;
                break;
            case 4:
                console.log("hint4: " + this.question.hint4);
                if (this.question.hint4 === undefined) {
                    this.hintsUsed -= 1;
                    qs('#question').innerHTML += "";
                } else {
                    qs('#question').innerHTML += `, ${this.question.hint4}`;
                    this.hintsUsed += 1;
                }
                break;
            case 5:
                console.log("hint5: " + this.question.hint5);
                if (this.question.hint5 === undefined) {
                    this.hintsUsed -= 1;
                    qs('#question').innerHTML += "";
                } else {
                    qs('#question').innerHTML += `, ${this.question.hint5}`;
                    this.hintsUsed += 1;
                }
                break;
            case 6:
                console.log("hint6: " + this.question.hint6);
                if (this.question.hint6 === undefined) {
                    this.hintsUsed -= 1;
                    qs('#question').innerHTML += "";
                } else {
                    qs('#question').innerHTML += `, ${this.question.hint6}`;
                    this.hintsUsed += 1;
                }
                break;
            case 7:
                console.log("hint7: " + this.question.hint7);
                if (this.question.hint7 === undefined) {
                    this.hintsUsed -= 1;
                    qs('#question').innerHTML += "";
                } else {
                    qs('#question').innerHTML += `, ${this.question.hint7}`;
                    this.hintsUsed += 1;
                }
                break;
            case 8:
                qs('#hint').disabled = true;
                qs('#question').innerHTML += `<br><br> Scripture text: ${this.question.hint8}`;
                this.hintsUsed += 1;
                break;
            default:
                break;
        }
        console.log("this.hintsUsed: " + this.hintsUsed);
        this.render('#hused', this.hintcount, '');
    },

    next() {
        console.log('next() invoked');
        this.ask();
    },

    calcBonus(bonusType) {
        console.log('calcBonus() invoked');

        // Consecutive correct answers bonus
        console.log(bonusType);
        if (this.consecutive > 49) {
            this.cbonus =100;
        } else if (this.consecutive > 39) {
            this.cbonus = 75;
        } else if (this.consecutive > 24) {
            this.cbonus = 50;
        } else if (this.consecutive > 19) {
            this.cbonus = 40;
        } else if (this.consecutive > 14) {
            this.cbonus = 30;
        } else if (this.consecutive > 9) {
            this.cbonus = 20;
        } else if (this.consecutive > 4) {
            this.cbonus = 100;
        }
        this.score += this.cbonus * this.consecutive;
        console.log(this.score);

        // Time bonus
        switch (this.secondsRemaining) {
            case 500:
                this.tbonus = 10000;
                break;
            case 400:
                this.tbonus = 8000;
                break;
            case 300:
                this.tbonus = 6000;
                break;
            case 200:
                this.tbonus = 4000;
                break;
            case 100:
                this.tbonus = 2000;
                break;
            case 50:
                this.tbonus = 1000;
                break;
            case 25:
                this.tbonus = 500;
                break;
            case 10:
                this.tbonus = 250;
                break;
            case 0:
                this.tbonus = 0;
                break;
            default:
                break;
        }
        this.score += this.tbonus;
        console.log(this.score);

        // Hint bonus
        if (this.hintsUsed <= 10) {
            this.hbonus = 10000;
        } else if (this.hintsUsed <= 100) {
            this.hbonus = 8000;
        } else if (this.hintsUsed <= 200) {
            this.hbonus = 6000;
        } else if (this.hintsUsed <= 300) {
            this.hbonus = 4000;
        } else if (this.hintsUsed <= 400) {
            this.hbonus = 2000;
        } else if (this.hintsUsed <= 500) {
            this.hbonus = 1000;
        } else {
            this.hbonus = 0;
        }
        this.score += this.hbonus;
        console.log(this.score);
    },

    check(event) {
        console.log('check(event) invoked');
        const response = event.target.textContent;
        const answer = this.question.ans;
        if(response === answer) {
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score += 100;
            view.render(view.score, this.score);
            this.correct++;
            this.isConsecutive = true;
        } else {
            this.isConsecutive = false;
            view.render(view.result,`Sorry, the correct answer was ${answer}`,{'class':'wrong'});
        }
        if (this.isConsecutive) {
            this.consecutive++;
            if (this.consecutive > 49) {
                this.cbonus =100;
            } else if (this.consecutive > 39) {
                this.cbonus = 75;
            } else if (this.consecutive > 24) {
                this.cbonus = 50;
            } else if (this.consecutive > 19) {
                this.cbonus = 40;
            } else if (this.consecutive > 14) {
                this.cbonus = 30;
            } else if (this.consecutive > 9) {
                this.cbonus = 20;
            } else if (this.consecutive > 4) {
                this.cbonus = 10;
            }
            this.bonus = (this.cbonus * this.consecutive);
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
        //console.log('countdown() invoked');
        game.secondsRemaining--;
        game.timeUsed++;
        view.render(view.timer, game.secondsRemaining);
        view.render(view.tused, game.timeUsed);
    },

    gameOver() {
        console.log('gameOver() invoked');
        game.calcBonus();
        view.render(view.info, `Game Over! You scored ${this.score} point${this.score !== 1 ? "s" : ""}` );
        view.teardown();
        clearInterval(this.timer);
    },

    hiScore() {
        console.log('hiScore() invoked');
        const hi = localStorage.getItem('highScore') || 0;
        if(this.score > hi || hi === 0) {
            localStorage.setItem('highScore', this.score);
            // TODO: get username, hiScore from db, add to high score display
            view.render(view.info, '** NEW HIGH SCORE! **', {'class':'bghotpink'});
        }
        return localStorage.getItem('highScore');
    },
}