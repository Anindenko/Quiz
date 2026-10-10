//(function() {})(); - это закрытая для пользователей самовызывающаяся функция
(function () {
    const Form = {
        //создаем валидацию наших полей формы
        agreeElement: null,
        //сперва создаем массив fields - в котором будет содержаться каждое наше текстовое поле
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,  //свойство для проверки валидности поля
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                valid: false,
            },
        ],
        // Создаем функцию инициализации наших элементов формы
        init() {
            const that = this; //"that" - переменная для замыкания (в нее будет попадать объект "Form")
            this.fields.forEach(item => {
                // инициализируем каждое поле
                item.element = document.getElementById(item.id);
                // вешаем обработчик события - изменения поля
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            });
            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm();
            };

            this.agreeElement = document.getElementById('agree');
            // Вешаем обработчик на чекбокс
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        },
        //Cоздаем отдельную функцию для валидации каждого поля
        validateField(field, element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red'; //окрашиваем рамку родительского элемента в красный
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style'); //удаляем красную рамку
                field.valid = true;
            }
            this.validateForm();
        },
        // Создаем функцию для валидации всей формы
        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            // Активируем кнопку при условии:
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid;
        },

        //Создаем функцию "processForm", которая будет собирать данные полей и перекидывать их через url(),
        // а также обеспечит переход на следующую страницу
        processForm() {
            if (this.validateForm()) {
                // Создаем строку для заполнения адреса (href) перехода
                let paramString = '';
                this.fields.forEach(item => {
                    paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
                })
                location.href = 'choice.html' + paramString;
            }

        }
    };

    Form.init();
})();