'use strict';

const body = document.querySelector('body');
const select = document.querySelector('.visually-hidden');
const option = document.querySelectorAll('option');
let collectionInputCheckbox = null;

const header = document.createElement('header');
const tenders = document.createElement('p');
const textarea = document.createElement('input');
const wrapCheckbox = document.createElement('div');
const footer = document.createElement('footer');

function loadTextarea() {
	body.prepend(header);

	header.append(tenders);
	tenders.classList.add('tenders');
	tenders.innerText = 'Тендеры в роли Поставщика';

	header.append(textarea);
	textarea.classList.add('textarea');
}

function showSelector() {
	const wrapBack = document.createElement('div');
	const main = document.createElement('main');

	if (select.classList.contains('visually-hidden')) {
		header.classList.add('headerShow');

		header.append(wrapBack);
		wrapBack.classList.add('wrapBack');
		
		wrapBack.append(tenders);
		tenders.innerText = 'Реализуемые товары';

		header.append(textarea);

		header.after(main);
		main.classList.add('main');

		main.append(wrapCheckbox);
		wrapCheckbox.classList.add('wrapCheckbox');

		createCheckboxes();

		main.append(select);
		select.classList.remove('visually-hidden');
		select.size = '7';

		main.after(footer);
		footer.style.display = 'flex';
		footer.classList.add('footer');

		selectOptionByCheckbox();
	}
}

function createCheckboxes() {
	if (collectionInputCheckbox === null) {
		option.forEach(item => {
			const inputCheckbox = document.createElement('input');

			inputCheckbox.classList.add('inputCheckbox');
			inputCheckbox.id = `${item.value}`;
			inputCheckbox.type = 'checkbox';

			wrapCheckbox.append(inputCheckbox);
		});
	}
	
	collectionInputCheckbox = document.querySelectorAll('.inputCheckbox');
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

function selectOptionByCheckbox() {
	collectionInputCheckbox.forEach(checkbox => {
		checkbox.addEventListener('click', () => onCheckboxClick(checkbox));
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

document.addEventListener("DOMContentLoaded", loadTextarea);
textarea.addEventListener('click', () => {
	showSelector();
});

option.forEach(item => {
	item.addEventListener('click', () => {
		rollUpOptions(getDeepSelectors(item.value));
	});
});

select.addEventListener('change', e => console.log(e.target.value));