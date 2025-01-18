const readyButton = document.getElementById("ready-btn");
const firstContainer = document.getElementById("first-container");
const secondContainer = document.getElementById("second-container");
const submitBtn = document.getElementById("submit");

function hide() {
    firstContainer.style.display = "none";
    secondContainer.style.display = "block";
}

//Second Container

const quizData = [{
        question: "1. Teamwork requires co-operation and co-ordination. Which behaviour enables the other behaviours?",
        a: "A: Communication",
        b: "B: Co-operation ",
        c: "C: Co-ordination",
        d: "D: None of the above",
        correct: "a",
        rationale: "A: Communication enables other behaviours because effective communication – both verbal and written – between team members and between different teams is essential to ensure co-operation and co-ordination of care",
    },
    {
        question: "2. If team members share a mental model, then:",
        a: "A: They have different perceptions of what is going on around them ",
        b: "B: They have different views on what is required to manage the situation ",
        c: "C: They have the same views on what is required to manage the situation ",
        d: "D: Serious safety events are more likely",
        correct: "c",
        rationale: "C: Poor communication in teams leads to team members having different perceptions of situations and what is required to manage them. Such differing perceptions of a situation among team members may be viewed as the lack of a shared mental model. If team members share a mental model, then they have the same views and understanding of the plan required to manage the situation.",
    },
    {
        question: "3. Which statement is false?",
        a: "A: Mutual support involves trust in other team members and confidence in their actions",
        b: "B: Situation monitoring involves adjusting, adapting, and reallocating tasks and responsibilities as required",
        c: "C: Effective communication should use subjective language",
        d: "D: Leadership in effective teamwork involves communicating team roles and responsibilities",
        correct: "c",
        rationale: "C: Effective communication involves using objective language, correct terminology and structured processes or tools, where available, so the statement that effective communication should use subjective language is incorrect.",
    },
    {
        question: "4. Teams may be hindered by the presence of: ",
        a: "A: Similar communication styles ",
        b: "B: Mutual support ",
        c: "C: An authority gradient ",
        d: "D: Situation monitoring",
        correct: "c",
        rationale: "C: An authority gradient. A hierarchical system exists in healthcare which results in an authority gradient. An authority gradient further down the hierarchy may be hesitant to challenge those further up the hierarchy, raise concerns or ask questions. In a situation where one member of the team feels there may be a patient safety issue, or has concerns of some kind, they may not feel comfortable raising this or discussing their concerns with the team. So the expectations of the team and patient safety may be hindered by the presence of an authority gradient.",
    },
    {
        question: "5. Which is not a form of team briefing?",
        a: "A: Pre- or post-shift pauses ",
        b: "B: Read-back protocols ",
        c: "C: Debriefings ",
        d: "D: Huddles",
        correct: "b",
        rationale: "B: Read-back protocols. Pre or post-shift pauses, debriefings and huddles are a form of team briefings which involve the team coming together at the end of a shift or procedure to discuss what went wrong and what went well. Read-back is verbally repeating back important clinical information from one healthcare professional to another and is not part of a team briefing.",
    },
];

loadQuiz();

function loadQuiz() {
    quizData.forEach((item, i) => {
        con.innerHTML += `
        <div class="row border-bottom py-2">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <h4 id="question">${item.question}</h4>
            <input type="radio" id="a" name="${i}" value="a" class="answer"/>
            <label for="a" id="a_text">${item.a}</label><br/>
            <input type="radio" id="b" name="${i}" value="b" class="answer"/>
            <label for="b" id="b_text">${item.b}</label><br/>
            <input type="radio" id="c" name="${i}" value="c" class="answer"/>
            <label for="b" id="b_text">${item.c}</label><br/>
            <input type="radio" id="d" name="${i}" value="d" class="answer"/>
            <label for="b" id="b_text">${item.d}</label><br />
            
            <div class="row">
                <div class="col-6">
                <button class="btn btn-sm btn-outline-primary my-2" type="button" onclick="score()" value="Submit form">Submit</button> <br />
                </div>
                <div class="col-6">
                <h4 id="alertbox${i}"></h4>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
            <button class="btn btn-warning" onclick="showans(${i})">Show Answer</button>
                <div id="showAnsBtn${i}" class="hide mt-3">
                    <h4>Option ${item.correct}</h4> 
                    <p>${item.rationale}</p> 
                <div>
        </div>
        </div>
        
        `;
    });
}

function showans(i) {
    document.getElementById(`showAnsBtn${i}`).classList.remove("hide");
}

let count, arr;

let radios = document.getElementsByClassName("answer");
function score() {
    arr = [];
    count = 0;
    let i = 0;
    let q = "";
    for (let radio of radios) {
        if (radio.checked) {
            userSelected = radio.value;
            q = radio.name;
            if (userSelected == quizData[i].correct) {
                count++;

                console.log("correct & count is " + count);
                let alert = document.getElementById(`alertbox${q}`);
                alert.innerText = "Correct Answer";
                alert.style.color = "green";
            } else {
                console.log("wrong & count is " + count);
                let alert = document.getElementById(`alertbox${q}`);
                alert.innerText = "Wrong Answer";
                alert.style.color = "red";
            }
            arr.push(userSelected);
            i++;
        }
    }
}

function loadQuizAns() {
    quizData.forEach((item) => {
        con.innerHTML += `<h4 id="question">${item.question}</h4>
        <ul>
        <li>${item.a}</li>
        <li>${item.b}</li>
        <li>${item.c}</li>
        <li>${item.d}</li>
        </ul>
        `;
    });
}

function result() {
    if(count!=undefined) {
        secondContainer.innerHTML = `
        <h2 class="my-5 text-center">Result Page</h2>
        <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6"><script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_aBYmBC.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player></div>
        <div class="col-xs-12 col-sm-12 col-md-6"><div class="container my-3 text-center">
        <div class="bg-light p-5 rounded mt-3">
        <h3>You Have Scored ${count} correct out of ${quizData.length}</h3>
        <a class="btn btn-lg btn-primary" href="quiz.html" role="button">Take Re-test</a>
        </div>
        </div></div>
        </div>


        `; //to load question with answer
        loadQuizAns();
    } else {
        alert("Attempt Atleast one Question")
    }
    
}