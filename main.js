'use strict';

const body = document.querySelector('body');
const select = document.querySelector('.visually-hidden');
const option = document.querySelectorAll('option');

const header = document.createElement('header');
const back = document.createElement('span');
const tenders = document.createElement('p');
const textarea = document.createElement('input');
const wrapCheckbox = document.createElement('div');
const wrapBack = document.createElement('div');
const main = document.createElement('main');
const footer = document.createElement('footer');
const apply = document.createElement('button');
const clear = document.createElement('button');

function load() {
	body.prepend(header);
	header.append(wrapBack);

	wrapBack.append(back);
	back.classList.add('visually-hidden');

	wrapBack.append(tenders);
	tenders.innerText = 'Тендеры в роли Поставщика';

	header.append(textarea);

	header.after(main);
	main.append(wrapCheckbox);
	wrapCheckbox.classList.add('visually-hidden');

	main.append(select);
	select.classList.add('visually-hidden');

	main.after(footer);
	footer.classList.add('visually-hidden');

	footer.append(apply);
	footer.append(clear);
}

function showSelector() {
	if (select.classList.contains('visually-hidden')) {
		back.classList.remove('visually-hidden');
		wrapCheckbox.classList.remove('visually-hidden');
		select.classList.remove('visually-hidden');
		footer.classList.remove('visually-hidden');
		tenders.innerText = 'Реализуемые товары';
	}
}

function createCheckboxes() {
	option.forEach(item => {
		const inputCheckbox = document.createElement('input');

		inputCheckbox.classList.add('inputCheckbox');
		inputCheckbox.id = `${item.value}`;
		inputCheckbox.type = 'checkbox';

		wrapCheckbox.append(inputCheckbox);
	});
}

function hideSelector() {
	header.classList.remove('headerShow');
	back.classList.add('visually-hidden');
	tenders.innerText = 'Тендеры в роли Заказчика';
	wrapCheckbox.classList.add('visually-hidden');
	select.classList.add('visually-hidden');
	footer.classList.add('visually-hidden');
}

function selectOptionByCheckbox() {
	document.querySelectorAll('.inputCheckbox').forEach(checkbox => {
		checkbox.addEventListener('click', () => onCheckboxClick(checkbox));
	});
}

function onCheckboxClick(checkbox) {
	option.forEach(item => {
		if (!item.classList.contains('checked') &&
			item.getAttribute('value') === checkbox.id) {
			setDeepSelectors(getDeepSelectors(item.value));

			textarea.value = item.label;
			textarea.classList.add('textChecked');
		} else if (item.classList.contains('checked') &&
			item.getAttribute('value') === checkbox.id) {
			removeDeepSelectors(getDeepSelectors(item.value));

			textarea.value = '';
			textarea.classList.remove('textChecked');
		}
	});
}

function getDeepSelectors(upLevel) {
	const selectors = [];

	[...option].forEach(item => {
		if (item.value.startsWith(upLevel)) selectors.push(item)
	});

	return selectors;
}

function setDeepSelectors(selectors) {
	selectors.forEach(item => {
		item.classList.add('checked');
		item.selected = true;

		document.getElementById(item.value).checked = true;
	});

	applySelectedPoint();
}

function removeDeepSelectors(selectors) {
	selectors.forEach(item => {
		item.classList.remove('checked');
		item.selected = false;

		document.getElementById(item.value).checked = false;
	});

}

function rollUpOptions(items) {
	for (let i = 1; i < items.length; i++) {
		let size = items[1].value.split('.').length;
		const item = items[i];

		if (size === item.value.split('.').length) {
			item.classList.toggle('visually-hidden');
			document.getElementById(items[i].value).classList.toggle('visually-hidden');
		} else {
			size = item.value.split('.').length;
			item.classList.toggle('ed');
			document.getElementById(items[i].value).classList.toggle('ed');
		}
	}
}

function applySelectedPoint() {
	document.getElementById('apply')
		.addEventListener('click', hideSelector);
}

function clearSelectedPoint(items) {
	document.getElementById('clear')
		.addEventListener('click', () => {
			textarea.value = '';

			[...items].forEach(item => {
				item.classList.remove('checked');
				item.selected = false;

				document.getElementById(item.value).checked = false;
			})
		});
}

document.addEventListener("DOMContentLoaded", () => {
	load();
	createCheckboxes();
	selectOptionByCheckbox();
	
	header.classList.add('headerShow');
	wrapBack.classList.add('wrapBack');
	
	back.classList.add('material-icons');
	back.innerText = 'arrow_back';
	
	tenders.classList.add('tenders');
	textarea.classList.add('textarea');
	main.classList.add('main');
	wrapCheckbox.classList.add('wrapCheckbox');
	select.size = '7';
	
	footer.classList.add('footer');
	
	apply.classList.add('actBtn');
	apply.innerText = 'Применить';
	apply.id = 'apply';
	
	clear.classList.add('actBtn');
	clear.innerText = 'Очистить';
	clear.id = 'clear';

	clearSelectedPoint(document.getElementsByClassName('checked'));
});

back.addEventListener('click', hideSelector);

textarea.addEventListener('click', () => {
	showSelector();
});

option.forEach(item => {
	item.addEventListener('click', () => {
		rollUpOptions(getDeepSelectors(item.value));
	});
});

select.addEventListener('change', e => console.log(e.target.value));