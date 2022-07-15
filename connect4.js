 var WIDTH = 7;
 var HEIGHT = 6;
 
 var currPlayer = 1; // active player: 1 or 2
 var board = []; // array of rows, each row is array of cells  (board[y][x])
 
 
 function makeBoard() {
    var row = [];
    for (i = 0; i < HEIGHT; i++){
        row = [];
        for (j = 0; j <WIDTH; j++){
             row.push(0);
            }
    
        board.push(row);
    }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
    const htmlBoard = document.querySelector("#board")
 
   // TODO: add comment for this code
   var top = document.createElement("tr");   
   top.setAttribute("id", "column-top");              //creates element placeholder for top row and names it column-top
   top.addEventListener("click", handleClick);
 
   for (var x = 0; x < WIDTH; x++) {                 //for loop creates the top row in the correct amount
     var headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);                           // adds the top row to html, not to be edited again
 
   // TODO: add comment for this code
   for (var y = 0; y < HEIGHT; y++) {               //for loop iterates over each row and creates an element for each
     const row = document.createElement("tr");
     for (var x = 0; x < WIDTH; x++) {              //nested for loop adds new column placeholder to each row
       const cell = document.createElement("td");   //creates the new column placeholder in each loop
       cell.setAttribute("id", `${y}-${x}`);        //adds id to determine x and y coordinates
       row.append(cell);                            //adds the column element to the row
     }
     htmlBoard.append(row);                        //appends the new row to the board
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
    const topFilled = board.findIndex(row => {return row[x] != 0}) - 1;
    if (topFilled == -1){return null};
    if (topFilled == -2){return HEIGHT-1};
    return topFilled ;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
    const position = document.getElementById(y + '-' + x);
    const newDiv = document.createElement("div");
    currPlayer == 1? newDiv.setAttribute("class",'red'): newDiv.setAttribute("class",'blue');
    position.append(newDiv);

 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   var x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   var y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   placeInTable(y, x);
   board[y][x] = currPlayer;
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
   
   if (board[0].every(El => (El != 0))){
    endGame(`It's a draw!!`);
   }

   currPlayer == 1? currPlayer = 2: currPlayer = 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {   //two loops iterating over every element
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //winning conditions happen when one of these three blocks returns all the same number
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 