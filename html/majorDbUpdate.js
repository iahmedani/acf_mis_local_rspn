window.$ = window.jQuery = require('jquery');
const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const uuid = require('uuid/v4');
const fs = require('fs');
const db = require('../mainfunc/db');

require('../mainfunc/_uuidProcess');