// import FormContainer from "./js/components/container/FormContainer";

import * as monaco from 'monaco-editor';
const fs = window.require('fs');
const {ipcRenderer, dialog} = require('electron')

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return '../dist/json.worker.bundle.js';
		}
		if (label === 'css') {
			return '../dist/css.worker.bundle.js';
		}
		if (label === 'html') {
			return '../dist/html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return '../dist/ts.worker.bundle.js';
		}
		return '../dist/editor.worker.bundle.js';
	}
}

const editor = monaco.editor.create(document.getElementById('container'), {
	value: [
		'function x() {',
		'\tconsole.log("Whatup world!");',
		'}'
	].join('\n'),
	language: 'javascript'
});


// In renderer process (web page).

// create save button
let saveButton = document.createElement('button')
saveButton.innerHTML = 'save';
saveButton.onclick = saveText;
let body = document.getElementsByTagName('body')[0];
body.prepend(saveButton)

function saveText() {
	ipcRenderer.send('save-button-clicked', editor.getValue())
}

// create open button
let openButton = document.createElement('button')
openButton.innerHTML = 'open';
openButton.onclick = openText;
body = document.getElementsByTagName('body')[0];
body.prepend(openButton)

function openText() {
	ipcRenderer.send('open-button-clicked')
}

// display the opened file in text editor
ipcRenderer.on('open-button-clicked', (event, arg) => {
	editor.setValue(arg)
})



