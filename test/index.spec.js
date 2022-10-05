import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { navigate } from '../templates/login.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
//let root;

// Test 
describe('se espera que si le paso "register me devuelva root con el html que representa register', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    root = dom.window.document.body;
  });

// Test create account button in register page
  it('debería ser una función', () => {
    expect(navigate('register').querySelector('#createAccount')).not.toBeNull();
  });
});



