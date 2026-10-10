// Создаем закрытую, самовызывающуюся функцию
(function () {
    const Choice = {
        // Создаем пустой массив для размещения распарсенных данных из полученного "JSON"
        quizzes: [],
        // Создаем функцию инициализации полей выбора
        init() {
            checkUserData(); //проверка адресной строки на наличие данных пользователя (см. файлы: "form.js" и "common.js")

            const xhr = new XMLHttpRequest(); //Создаем переменную для запросов на сервер
            xhr.open('GET', 'https://testologia.ru/get-quizzes', false); //создаем запрос списка вопросов на бэкэнд
            xhr.send(); //отправляем запрос

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quizzes = JSON.parse(xhr.responseText); //если данные корректны - парсим JSON и размещаем в "quizzes"
                } catch (e) {
                    location.href = 'index.html'; // если не парсятся - перебрасываем на первую страницу
                }
                this.processQuizzes();
            } else {
                location.href = 'index.html';
            }
        },
        processQuizzes() {
            const choiceOptionsElement = document.getElementById('choice-options');
            if (this.quizzes && this.quizzes.length > 0) {
                this.quizzes.forEach(quiz => {
                    const that = this;
                    const choiceOptionElement = document.createElement('article');
                    choiceOptionElement.className = 'choice-option';
                    choiceOptionElement.setAttribute('data-id', quiz.id);
                    // И добавляем к этому полю обработчик события по клику
                    choiceOptionElement.onclick = function () {
                        that.chooseQuiz(this);
                    };

                    const choiceOptionTextElement = document.createElement('p');
                    choiceOptionTextElement.className = 'choice-option-text';
                    choiceOptionTextElement.innerText = quiz.name;

                    const choiceOptionArrowElement = document.createElement('picture');
                    choiceOptionArrowElement.className = 'choice-option-arrow';

                    const choiceOptionImageElement = document.createElement('img');
                    choiceOptionImageElement.setAttribute('src', 'assets/image/arrow.png');
                    choiceOptionImageElement.setAttribute('alt', 'стрелка');

                    choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                    choiceOptionElement.appendChild(choiceOptionTextElement);
                    choiceOptionElement.appendChild(choiceOptionArrowElement);

                    choiceOptionsElement.appendChild(choiceOptionElement);
                });
            }
        },
        chooseQuiz(element) {
            const dataId = element.getAttribute('data-id');
            if (dataId) {
                location.href = 'test.html' + location.search + '&id=' + dataId;
            }
        }
    }
    Choice.init();
})();