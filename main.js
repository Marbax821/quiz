// Создаем массив объектов с вопросами, вариантами ответов и номером правильного ответа
var questionsAll = [
	{
		question: "Какого цвета небо?",
		answers: ["синего", "красного", "зеленого"],
		correct: 1
	},
	{
		question: "Как зовут короля джунглей?",
		answers: ["Шерхан", "Маугли", "Симба"],
		correct: 3
	},
	{
		question: "Сколько будет два плюс два?",
		answers: ["четыре", "пять", "шесть"],
		correct: 1
	},
	{
		question: "Как зовут главного героя фильма 'Назад в будущее'?",
		answers: ["Марти Макфлай", "Доктор Браун", "Бифф Таннен"],
		correct: 1
	},
	{
		question: "Какой город является столицей Франции?",
		answers: ["Берлин", "Лондон", "Париж"],
		correct: 3
	},
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	}
];

// Создаем функцию для получения рандомного количества вопросов
function getRandomQuestions() {
	// Получаем рандомное количество вопросов (от 1 до 3)
	var count = Math.floor(Math.random() * 9) + 1;

	// Создаем новый массив для хранения рандомных вопросов
	var randomQuestions = [];

	// Добавляем рандомные вопросы в новый массив
	for (var i = 0; i < count; i++) {
		// Получаем рандомный индекс вопроса
		var randomIndex = Math.floor(Math.random() * questionsAll.length);

		// Добавляем рандомный вопрос в новый массив
		randomQuestions.push(questionsAll[randomIndex]);

		// Удаляем выбранный вопрос из исходного массива, чтобы он не повторился
		questionsAll.splice(randomIndex, 1);
	}

	// Возвращаем новый массив с рандомными вопросами
	return randomQuestions;
}


// Пример использования
var randomQuestions = getRandomQuestions();
//console.log(randomQuestions);


let questions = []
questions = questions.concat(randomQuestions)
console.log(randomQuestions);


// Находим елементы
const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// Переменные игры
let score = 0 //кол-во правильных ответов
let questionIndex = 0 // текущий вопрос

clearPage()
showQuestion()

submitBtn.addEventListener('click', checkAnswer)

function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {
	// Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title

	// Варинаты ответов
	let answerNumber = 1
	for (answerText of questions[questionIndex]['answers']) {
		const qustionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>
		`

		const answerHTML = qustionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber)

		//listContainer.innerHTML = listContainer.innerHTML + answerHTML
		// та же запись, оптимизированна
		listContainer.innerHTML += answerHTML
		answerNumber++
	}
}

function checkAnswer() {
	// Находим выбранную радио кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	// Если ответ не выбран - ничего неделаем, выходим из функции
	if (!checkedRadio) {
		submitBtn.blur()
		return
	}

	// Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)

	// Если ответ верно - увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		//console.log('Это НЕ последний вопрос');
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		//console.log('Это последний вопрос');
		clearPage()
		showResults()
	}
}

function showResults() {
	console.log(score);

	const resultsTemplate = `
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
	`

	let title, message

	// Варианты заголовков и текста
	if (score === questions.length) {
		title = 'Поздравляем! 🎆'
		message = 'Вы ответили верно на все вопросы! 😎'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😊'
		message = 'Вы дали более половины правильных ответов 😊🤟'
	} else {
		title = 'Стоит постараться ☝👐'
		message = 'Пока у вас меньше половины правильных ответов 🥺'
	}

	// Результат
	let result = `${score} из ${questions.length}`

	// Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result)

	headerContainer.innerHTML = finalMessage

	// Меняем кнопку на "Играть снова"
	submitBtn.blur()
	submitBtn.innerText = 'Начать заново'
	submitBtn.addEventListener('click', function () {
		console.log('222');
		history.go()
	})
}