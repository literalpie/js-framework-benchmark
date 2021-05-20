import { html, render } from '../node_modules/lit-html/lit-html.js';
import { repeat } from '../node_modules/lit-html/directives/repeat.js';

const adjectives = [
  'pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

let seed = 0;
// random function is replaced to remove any randomness from the benchmark.
const random = (max) => seed++ % max;
const buildData = count => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: did++,
      label: `${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`
    });
  }
  return data;
};

let data = [];
let did = 1;
let selected = null;

const add = () => {
  data = data.concat(buildData(1000));
  _render();
};
const run = () => {
  data = buildData(1000);
  selected = null;
  _render();
};
const runLots = () => {
  data = buildData(10000);
  selected = null;
  _render();
};
const clear = () => {
  data = [];
  selected = null;
  _render();
};
const interact = e => {
  const td = e.target.closest('td');
  const interaction = td.getAttribute('data-interaction');
  const id = parseInt(td.parentNode.id);
  if (interaction === 'delete') {
    del(id);
  } else {
    select(id);
  }
};
const del = id => {
  const idx = data.findIndex(d => d.id === id);
  data.splice(idx, 1);
  _render();
};
const select = id => {
  selected = id;
  _render();
};
const swapRows = () => {
  if (data.length > 998) {
    const tmp = data[1];
    data[1] = data[998];
    data[998] = tmp;
  }
  _render();
};
const update = () => {
  for (let i = 0; i < data.length; i += 10) {
    const item = data[i];
    data[i].label += ' !!!';
  }
  _render();
};

let _render;

const template = () => html`
<div class="container">
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>Lit-HTML</h1>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block" id="run" @click=${run}>Create 1,000 rows</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block" id="runlots" @click=${runLots}>Create 10,000 rows</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary
                        btn-block" id="add" @click=${add}>Append 1,000 rows</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary
                        btn-block" id="update" @click=${update}>Update every 10th row</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary
                        btn-block" id="clear" @click=${clear}>Clear</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary
                        btn-block" id="swaprows" @click=${swapRows}>Swap Rows</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table @click=${interact} class="table table-hover table-striped test-data">
    <tbody>${repeat(data,
  item => item.id,
  item => html`
      <tr id=${item.id} class=${item.id === selected ? 'danger' : ''}>
        <td class="col-md-1">${item.id}</td>
        <td class="col-md-4">
          <a>${item.label}</a>
        </td>
        <td data-interaction='delete' class="col-md-1">
          <a>
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
        </td>
        <td class="col-md-6"></td>
      </tr>`)}
    </tbody>
  </table>
  <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
</div>`;

class BenchmarkApp extends HTMLDivElement {
  constructor() {
    super();
    _render = () => render(template(), this);
    _render();
  }
}

customElements.define("benchmark-app", BenchmarkApp, { extends: "div" });