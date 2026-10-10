(function () {
    const Answer = {
        //Создаем пустой массив для данных пользователя
        userData: [],
        // Создаем объект данных прохождения теста
        testResult: JSON.parse(sessionStorage.getItem('testResult')),
        //Создаем пустой массив для правильных ответов
        correctAnswer: [],

        init: function () {
            this.userData.push({name: sessionStorage.getItem('name')});
            this.userData.push({lastName: sessionStorage.getItem('lastName')});
            this.userData.push({email: sessionStorage.getItem('email')});
            const testId = sessionStorage.getItem('testId');
            console.log(this.testResult);
            console.log(this.userData);

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.correctAnswer = JSON.parse(xhr.responseText); //если данные корректны - парсим JSON и размещаем в "correctAnswer"
                    } catch (e) {
                        location.href = 'index.html'; // если не парсятся - перебрасываем на первую страницу
                    }
                    this.showSubtitle();
                } else {
                    location.href = 'index.html';
                }
                console.log(this.correctAnswer);
            }
        },
        // Создаем актуальные подзаголовки на странице
        showSubtitle: function () {
            document.getElementById('subtitle-span').innerHTML = this.testResult.quiz.name;
            document.getElementById('test-user').innerHTML = this.userData[0].name + ' ' + this.userData[1].lastName + ', ' + this.userData[2].email;
            this.showQuestion();
        },
        //Создаем функцию, которая отобразит ответы на странице
        showQuestion: function () {
            const answersContainer = document.getElementById('answers-container');
            answersContainer.innerHTML = ''; // очищаем статическую разметку

            this.testResult.quiz.questions.forEach((question) => {

                // Создаём блок вопроса
                const questionSection = document.createElement('section');
                questionSection.className = 'answer-answer';

                // Заголовок вопроса
                const questionTitle = document.createElement('h3');
                questionTitle.className = 'answer-question-title';
                questionTitle.innerHTML = `<span>Вопрос ${question.id}:</span> ${question.question}`;
                questionSection.appendChild(questionTitle);

                // Варианты ответов
                const variantsContainer = document.createElement('article');
                variantsContainer.className = 'answer-variants';

                // Перебираем ответы и заполняем поля
                question.answers.forEach((answer) => {
                    const variant = document.createElement('p');
                    variant.className = 'answer-variant';
                    variant.innerText = answer.answer;

                    //Вызываем функцию "choiceAnswer", чтобы задать классы правильным и неправильным ответам
                    this.choiceAnswer(question, answer, variant);

                    variantsContainer.appendChild(variant);

                });

                questionSection.appendChild(variantsContainer);
                answersContainer.appendChild(questionSection);
            });
        },
        choiceAnswer: function (question, answer, variant) {
            // Что выбрал пользователь по этому вопросу
            const userAnswer = this.testResult.userResult.find(
                (item) => item.questionId === question.id
            );

            const isCorrect = this.correctAnswer.includes(answer.id);          // правильно выбранный ответ
            const isChosen  = userAnswer && userAnswer.chosenAnswerId === answer.id; // пользователь его выбрал

            if (isCorrect && isCorrect === isChosen) {
                variant.classList.add('correct');
            } else if (isChosen) {
                variant.classList.add('incorrect');
            }
        },
    }
    Answer.init();
})();