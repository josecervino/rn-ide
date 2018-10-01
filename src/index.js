// import FormContainer from "./js/components/container/FormContainer";

import * as monaco from 'monaco-editor';

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

let button = document.createElement('button');
button.innerHTML = 'save';
button.onclick = saveText;
let body = document.getElementsByTagName('body')[0];
body.appendChild(button)
const editor = monaco.editor.create(document.getElementById('container'), {
	value: [
		'function x() {',
		'\tconsole.log("Whatup world!");',
		'}'
	].join('\n'),
	language: 'javascript'
});

function saveText (){
	console.log(editor.getValue());
}

// saveText()
