// A suduko puzzle is a 9x9 array with numbers from 0-9.

// Return an empty sudoku
function emptySudoku() {
    return [ [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0]
           , [0,0,0,0,0,0,0,0,0] ];
}

// Convert an array of arrays to a string keeping track of the inner
// arrays.
function arrayToString(arr) {
    return arr.map(row => `[${row}]`).join("<br>");
}

// Compute all 27 blocks of a sudoku. Returns all 9 rows, 9 cols and 9
// 3x3 blocks
function blocks(sud) {
  const f = (arr, i) => arr.slice(i - i % 3, i - i % 3 + 3);

  return sud.flatMap((row, i, arr) => {
    return [row, f(arr, i).flatMap(r => f(r, 3 * (i % 3))), arr.map(r => r[i])];
  });
}

// Check that a block is valid (i.e. that it contains no duplicate
// number 1-9, but multiple 0 is fine).
function isValidBlock(b) {
  return !b.some((num, i, b) => num && b.slice(i + 1).includes(num));
}

// Check that a sudoku is valid by checking that all of its blocks are
// valid.
function isValid(sud) {
  return blocks(sud).every(isValidBlock);
}

// Check if a sudoku is solved by checking that there are no zeroes
// and that it is valid.
function isSolved(sud) {
  return sud.some(r => r.includes(0)) ? false : isValid(sud);
}

// Draw the start sudoku
function init(sud) {
  const flatSud = sud.flat();
  document.querySelectorAll("td").forEach((c, i) =>
    [c.onclick, c.textContent, c.style.backgroundColor] =
      !flatSud[i] ? [klick, null, null] : [null, flatSud[i], "#B6D9EE"]
  );
}

// What to do when the user clicks on a tile (not called "click"
// because that caused some problems with some browsers)
function klick() {
  const inp = Number(prompt("Skriv in en siffra 1-9:"));
  this.textContent =
    0 < inp && inp < 10 && Number.isInteger(inp) ? inp : alert("Ej siffra 1-9.");
  if (!this.textContent) return;

  const sud = getSudoku();
  this.textContent =
      !isValid(sud) ? alert("Siffra ej giltig här.")
    : isSolved(sud) ? (alert("Du löste det!"), inp)
    : inp;
}

// Fetch the current sudoku
function getSudoku() {
  return Array.from(
    document.querySelector("table").rows,
    r => [...r.cells].map(c => c.textContent === "" ? 0 : c.textContent)
  );
}

