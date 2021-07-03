const currentYearDOM = document.getElementById("current-year"),
	currentMonthDOM = document.getElementById("cur-month"),
	currentDayDOM = document.getElementById("cur-day"),
	currentDateDOM = document.getElementById("cur-date"),
	calendarYearDOM = document.getElementById("cal-year"),
	calendarMonthDOM = document.getElementById("cal-month"),
	tbody = document.querySelector('tbody');

window.onload = function () {
	setDate();
	setTime();
	timeoutHandler();
	document.querySelector('.fa-caret-right').addEventListener('click', nextMonth);
	document.querySelector('.fa-caret-left').addEventListener('click', prevMonth);
}

// window.addEventListener('DOMMouseScroll', wheel);


let now = new Date(),
	todayYear = now.getFullYear(),
	todayMonth = now.getMonth(),//月份從0開始
	todayDay = now.getDay(),
	todayDate = now.getDate(),
	currenttodayMonth = now.getMonth();

function setDate() {
	const daysStr = {
		"0": "Sun",
		"1": "Mon",
		"2": "Tue",
		"3": "Wed",
		"4": "Thr",
		"5": "Fri",
		"6": "Sat"
	};
	const monthsStr = {
		"1": "Jan",
		"2": "Feb",
		"3": "Mar",
		"4": "Apr",
		"5": "May",
		"6": "Jun",
		"7": "Jul",
		"8": "Aug",
		"9": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	};
	currentDayDOM.innerHTML = daysStr[todayDay];
	currentDateDOM.innerHTML = todayDate;
	currentMonthDOM.innerHTML = monthsStr[`${new Date(todayYear, currenttodayMonth, 1).getMonth() + 1}`];
	currentYearDOM.innerHTML = `${new Date(todayYear, currenttodayMonth, 1).getFullYear()}`
	calendarYearDOM.innerHTML = `${new Date(todayYear, todayMonth, 1).getFullYear()}年`;
	calendarMonthDOM.innerHTML = `${new Date(todayYear, todayMonth, 1).getMonth() + 1}月`

	showCalenderInfo(todayYear, todayMonth);
}

function setTime() {
	let time = new Date();
	let todayHours = time.getHours();
	let todayMinutes = time.getMinutes();
	let todaySeconds = time.getSeconds();
	document.querySelector('.time >span:first-child').innerHTML = todayHours.toString().padStart(2, '0');
	document.querySelector('.time >span:nth-child(2)').innerHTML = todayMinutes.toString().padStart(2, '0');
	document.querySelector('.time >span:last-child').innerHTML = todaySeconds.toString().padStart(2, '0');
}

function timeoutHandler() {
	setTime();
	setTimeout(timeoutHandler, 1000); //自己呼叫自己才會一直執行
}

function showCalenderInfo(year, month) {
	tbody.innerHTML = '';

	let firstday = new Date(year, month, 1).getDay();//當月第一天是禮拜幾
	let dayOfMonth = new Date(year, month + 1, 0).getDate();//當月有幾天
	// let show_date
	let day = 1;
	let rows = Math.ceil((firstday + dayOfMonth) / 7);
	let prevmon_col = 0;
	let nextmon_col = 0;

	for (var row = 0; row < rows; row++) {
		let tr = document.createElement('tr');
		for (let col = 0; col < 7; col++) {
			let td = document.createElement('td');
			let span = document.createElement('span');
			if (row == 0 && col < firstday) {
				let prevOfMonth = new Date(year, month, 0).getDate();
				span.innerHTML = prevOfMonth - firstday + 1 + prevmon_col;
				prevmon_col++;
				td.style.backgroundColor = '#EBEBE3';
				td.appendChild(span);
			}
			else if (day > dayOfMonth) {
				nextmon_col++;
				span.innerHTML = nextmon_col;
				td.style.backgroundColor = '#EBEBE3';
				td.appendChild(span);
			}
			else {
				//印出日期
				span.innerHTML = day;
				td.classList.add('add_calendarstyle');
				td.appendChild(span);
				if (day == todayDate && month == currenttodayMonth) {
					td.classList.remove('add_calendarstyle');
					td.classList.add('today_tag');
				}
				//印出行程
				if (localStorage.getItem(`${year}/${month + 1}/${day}`) != null) {
					let ul = document.createElement('ul');
					let todoList = JSON.parse(localStorage.getItem(`${year}/${month + 1}/${day}`))
					//console.log(todoList)
					//排序不同時間行程
					todoList.sort((a, b) => {
						let firstTime = Number((a.time).split(':').join(''));
						let secondTime = Number((b.time).split(':').join(''));
						return firstTime - secondTime;
					})
					//console.log(todoList)
					todoList.forEach(item => {
						let li = document.createElement('li');
						li.innerHTML = item.time + ' ' + item.title;
						li.style.color = item.tag;
						ul.appendChild(li);

						li.addEventListener('click', function (e) {
							// document.getElementById('app-name-landscape').innerText = `${year}/${month + 1}/${e.target.childNodes[0].data}`;
							document.getElementById('infoModalLabel').innerText = item.date;
							document.getElementById('info-todo-color').value = item.tag;
							document.getElementById('info-todo-title').value = item.title;
							document.getElementById('info-todo-time').value = item.time;
							document.getElementById('info-todo-item').value = item.discription;
						})
					})
					td.appendChild(ul);
				}
				//新增活動
				td.addEventListener('click', function (e) {
					// let target;
					// if(e.target.localName=='li' || e.target.localName=='ul' || e.target.localName=='span'){
					// 	target = e.target.offsetParent;
					// }
					// else{
					// 	target=e.target;
					// }
					e.stopPropagation();
					if (e.target.nodeName === 'TD') {
						e.preventDefault();
						document.getElementById('inputModalLabel').innerHTML = `${year}/${month + 1}/${e.target.childNodes[0].childNodes[0].data}`;
						$('#inputModal').modal('show');
					}
					else if (e.target.nodeName === 'LI') {
						$('#infoModal').modal('show');
					}
				})
				day++;
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
}

function SaveTodoItem() {
	// let calendarName = document.getElementById('app-name-landscape').innerText;
	let event_date = document.getElementById('inputModalLabel').innerText;
	let todo_color = document.getElementById('todo-color').value;
	let todo_title = document.getElementById('todo-title').value;
	let todo_time = document.getElementById('todo-time').value;
	let todo_item = document.getElementById('todo-item').value;
	if (todo_time == '' || todo_title == null) {
		alert('請確實填寫標題/時間');
		return;
	}
	let todoObj = {
		// cal_name: calendarName,
		date: event_date,
		tag: todo_color,
		title: todo_title,
		time: todo_time,
		discription: todo_item
	};

	let todoList = [];
	console.log(todoObj)
	//LocalStorage只能用key來找
	if (localStorage.getItem(todoObj.date) == null) {
		todoList.push(todoObj);
	}
	else {
		todoList = JSON.parse(localStorage.getItem(todoObj.date));
		todoList.push(todoObj);
	}
	localStorage.setItem(todoObj.date, JSON.stringify(todoList));
	document.getElementById('todo-color').value = '#000000';
	document.getElementById('todo-title').value = '';
	document.getElementById('todo-time').value = '';
	document.getElementById('todo-item').value = '';
	showCalenderInfo(todayYear, todayMonth);
}

function EditTodoItem() {
	// let show_calendarName = document.getElementById('app-name-landscape').innerText;
	let show_event_date = document.getElementById('infoModalLabel').innerText;
	let show_todo_color = document.getElementById('info-todo-color').value;
	let show_todo_title = document.getElementById('info-todo-title').value;
	let show_todo_time = document.getElementById('info-todo-time').value;
	let show_todo_item = document.getElementById('info-todo-item').value;

	let todoList = [];
	todoList = JSON.parse(localStorage.getItem(show_event_date));
	console.log(todoList)
	let edit_todoitem = todoList.find(x => x.date && x.time &&x.title);
	console.dir(edit_todoitem);

	edit_todoitem.tag = show_todo_color;
	edit_todoitem.title = show_todo_title;
	edit_todoitem.time = show_todo_time;
	edit_todoitem.discription = show_todo_item;
	localStorage.setItem(show_event_date, JSON.stringify(todoList));
	showCalenderInfo(todayYear, todayMonth);
}

function DeleteTodoItem() {
	let yes = confirm('確定要刪除這筆活動ㄇ？');
	if(yes){
		let show_event_date = document.getElementById('infoModalLabel').innerText;

		let todoList=[];
		todoList =JSON.parse(localStorage.getItem(show_event_date));
		//console.dir(todoList)	
		let edit_todoitem = todoList.find(x => x.date && x.time && x.title);
		//console.dir(edit_todoitem)	
		let del_index = todoList.filter(x=>x==edit_todoitem);
		//console.dir(del_index)
		todoList.splice(todoList.indexOf(del_index),1);
		localStorage.setItem(show_event_date,JSON.stringify(todoList));
		showCalenderInfo(todayYear,todayMonth);
	}
}

function nextMonth() {
	todayMonth++;
	//console.log(todayMonth)
	setDate();
}

function prevMonth() {
	todayMonth--;
	setDate();
}






