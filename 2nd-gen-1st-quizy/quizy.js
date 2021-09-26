'use strict'

// var places = [
//     ['たかなわ', 'たかわ', 'こうわ'],
//     ['かめいど', 'かめと', 'かめど'],
//     ['こうじまち', 'おかとまち', 'かゆまち'],
//     ['おなりもん', 'ごせいもん', 'おかどもん'],
//     ['とどろき', 'たたりき', 'たたら'],
//     ['しゃくじい', 'せきこうい', 'いじい'],
//     ['ぞうしき', 'ざっしき', 'ざっしょく'],
//     ['おかちまち', 'ごしろちょう', 'みとちょう'],
//     ['ししぼね', 'ろっこつ', 'しこね'],
//     ['こぐれ', 'こばく', 'こしゃく'],
// ];

const answers = [];
for (let i = 0; i < places.length; i++) {
    answers.push(places[i][0]);
};

const pictures = [
    'https://d1khcm40x1j0f.cloudfront.net/quiz/34d20397a2a506fe2c1ee636dc011a07.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/512b8146e7661821c45dbb8fefedf731.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/ad4f8badd896f1a9b527c530ebf8ac7f.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/ee645c9f43be1ab3992d121ee9e780fb.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/6a235aaa10f0bd3ca57871f76907797b.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/0b6789cf496fb75191edf1e3a6e05039.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/23e698eec548ff20a4f7969ca8823c53.png',
    'https://d1khcm40x1j0f.cloudfront.net/quiz/50a753d151d35f8602d2c3e2790ea6e4.png',
    'https://d1khcm40x1j0f.cloudfront.net/words/8cad76c39c43e2b651041c6d812ea26e.png',
    'https://d1khcm40x1j0f.cloudfront.net/words/34508ddb0789ee73471b9f17977e7c9c.png',
];

for (let i = 0; i < places.length; i++) {


    //----------------------↓↓↓ shuffling "places[i]" ↓↓↓----------------------------------------------
    var unshuffled = [0, 1, 2];
    function shuffle(places, i) {
        for (let j = places[i].length - 1; j >= 0; j--) {
            let rand = Math.floor(Math.random() * (j + 1));
            [places[i][j], places[i][rand]] = [places[i][rand], places[i][j]];
            [unshuffled[j], unshuffled[rand]] = [unshuffled[rand], unshuffled[j]];
        };
        return places
    };
    places = shuffle(places, i);
    //----------------------↑↑↑ shuffling "places[i]" ↑↑↑----------------------------------------------   


    //----------------------↓↓↓ Making HTML 1st ↓↓↓----------------------------------------------------
    var questionHTML = '<section class="quiz box-container">'
        + `<h2 id='heading${i}'>${i + 1}. この地名はなんて読む？</h2>`
        + `<img src='${pictures[i]}' alt='問題${i + 1}の画像' class='quiz-image'>`
        + `<ul id='question${i}'>`
        + `<li id='place${i}-${unshuffled[0]}'>${places[i][0]}</li>`
        + `<li id='place${i}-${unshuffled[1]}'>${places[i][1]}</li>`
        + `<li id='place${i}-${unshuffled[2]}'>${places[i][2]}</li>`
        + '</ul>'
        + '</section>';
    document.getElementById('quiz-title').insertAdjacentHTML('beforeend', questionHTML);

    const addlist = document.createElement('li');
    addlist.id = `answerLi${i}`;
    addlist.classList.add('answerLi');
    const addp = document.createElement('p');
    const addp_detail = document.createElement('p');
    addp_detail.classList.add('answerP_detail');
    //----------------------↑↑↑ Making HTML 1st ↑↑↑----------------------------------------------------


    //----------------------↓↓↓ From "click" To "scroll" ↓↓↓-------------------------------------------
    document.getElementById(`question${i}`).addEventListener('click', e => {
        if (e.target.id === `place${i}-${unshuffled[0]}`) {
            addclass(unshuffled[0], i);
            answer(unshuffled[0]);
            changeid(i);
        } else if (e.target.id === `place${i}-${unshuffled[1]}`) {
            addclass(unshuffled[1], i);
            answer(unshuffled[1]);
            changeid(i);
        } else if (e.target.id === `place${i}-${unshuffled[2]}`) {
            addclass(unshuffled[2], i);
            answer(unshuffled[2]);
            changeid(i);
        } else {
            return;
        };
        document.getElementById(`question${i}`).appendChild(addlist);
        document.getElementById(`answerLi${i}`).appendChild(addp);
        answer_detail(i);
        scroll(i);
    });
    //----------------------↑↑↑ From "click" To "scroll" ↑↑↑-------------------------------------------


    //----------------------↓↓↓ Functions 1 ↓↓↓--------------------------------------------------------
    function answer(clicked) {
        if (clicked === 0) {
            addp.textContent = '正解！';
            addp.classList.add('answerP_correct');
        } else if (clicked === 1) {
            addp.textContent = '不正解！';
            addp.classList.add('answerP_incorrect');
        } else if (clicked === 2) {
            addp.textContent = '不正解！';
            addp.classList.add('answerP_incorrect');
        };
    };
    
    function answer_detail(i) {
        addp_detail.textContent = `正解は「${answers[i]}」です！`;
        document.getElementById(`answerLi${i}`).appendChild(addp_detail);
    };
    //----------------------↑↑↑ Functions 1 ↑↑↑--------------------------------------------------------
};

    
//----------------------↓↓↓ Functions 2 ↓↓↓--------------------------------------------------------
function changeid(i) {
    document.getElementById(`place${i}-0`).id = `pushed${i}-0`;
    document.getElementById(`place${i}-1`).id = `pushed${i}-1`;
    document.getElementById(`place${i}-2`).id = `pushed${i}-2`;
};

function addclass(clicked, i) {
    if (clicked === 0) {
        document.getElementById(`place${i}-0`).classList.add('pushed-correct');
    } else if (clicked === 1) {
        document.getElementById(`place${i}-0`).classList.add('pushed-correct');
        document.getElementById(`place${i}-1`).classList.add('pushed-incorrect');
    } else if (clicked === 2) {
        document.getElementById(`place${i}-0`).classList.add('pushed-correct');
        document.getElementById(`place${i}-2`).classList.add('pushed-incorrect');
    };
};

function scroll(i) {
    var target = document.getElementById(`pushed${i}-0`);
    var rect = target.getBoundingClientRect();
    var position = rect.top;
    window.scrollBy({
        top: position,
        behavior: 'smooth'
    });
};
//----------------------↑↑↑ Functions 2 ↑↑↑--------------------------------------------------------