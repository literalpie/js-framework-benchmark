import { createSignal, createSelector, batch } from 'solid-js';
import { render } from 'solid-js/web';

let idCounter = 1;
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
  colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
  nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

let seed = 0;
// random function is replaced to remove any randomness from the benchmark.
const random = (max) => seed++ % max;

function buildData(count) {
  let data = new Array(count);
  for (let i = 0; i < count; i++) {
    const [label, setLabel] = createSignal(`${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`);
    data[i] = {
      id: idCounter++,
      label, setLabel
    }
  }
  return data;
}

const App = () => {
  const [data, setData] = createSignal([], false),
    [selected, setSelected] = createSignal(null),
    isSelected = createSelector(selected);

  return <div class='container'>
    <div class='jumbotron'><div class='row'>
      <div class='col-md-6'><h1>SolidJS Keyed</h1></div>
      <div class='col-md-6'><div class='row'>
        <div class='col-sm-6 smallpad'>
          <button id="run" class='btn btn-primary btn-block' type='button' onClick={ run }>Create 1,000 rows</button>
        </div>
        <div class='col-sm-6 smallpad'>
          <button id="runlots" class='btn btn-primary btn-block' type='button' onClick={ runLots }>Create 10,000 rows</button>
        </div>
        <div class='col-sm-6 smallpad'>
          <button id="add" class='btn btn-primary btn-block' type='button' onClick={ add }>Append 1,000 rows</button>
        </div>
        <div class='col-sm-6 smallpad'>
          <button id="update" class='btn btn-primary btn-block' type='button' onClick={ update }>Update every 10th row</button>
        </div>
        <div class='col-sm-6 smallpad'>
          <button id="clear" class='btn btn-primary btn-block' type='button' onClick={ clear }>Clear</button>
        </div>
        <div class='col-sm-6 smallpad'>
          <button id="swaprows" class='btn btn-primary btn-block' type='button' onClick={ swapRows }>Swap Rows</button>
        </div>
      </div></div>
    </div></div>
    <table class='table table-hover table-striped test-data'><tbody>
      <For each={ data() }>{ row => {
        let rowId = row.id;
        return <tr class={isSelected(rowId) ? "danger": ""}>
          <td class='col-md-1' textContent={ rowId } />
          <td class='col-md-4'><a onClick={[setSelected, rowId]} textContent={ row.label() } /></td>
          <td class='col-md-1'><a onClick={[remove, rowId]}><span class='glyphicon glyphicon-remove' aria-hidden="true" /></a></td>
          <td class='col-md-6'/>
        </tr>
      }}</For>
    </tbody></table>
    <span class='preloadicon glyphicon glyphicon-remove' aria-hidden="true" />
  </div>;

  function remove(id) {
    const d = data();
    d.splice(d.findIndex(d => d.id === id), 1);
    setData(d);
  }

  function run() {
    setData(buildData(1000));
    setSelected(null);
  }

  function runLots() {
    setData(buildData(10000));
    setSelected(null);
  }

  function add() { setData(data().concat(buildData(1000))); }

  function update() {
    batch(() => {
      const d = data();
      let index = 0;
      while (index < d.length) {
        d[index].setLabel(d[index].label() + ' !!!');
        index += 10;
      }
    });
  }

  function swapRows() {
    const d = data();
    if (d.length > 998) {
      let tmp = d[1];
      d[1] = d[998];
      d[998] = tmp;
      setData(d);
    }
  }

  function clear() {
    setData([]);
    setSelected(null);
  }
}

render(App, document.getElementById("main"));
