/*
GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop

Description: Display one line of the Scrabble board to the user along with seven letter tiles
on a tile rack. The user then drags tiles to the board to make a word, report his or her score, 
taking the letter values and bonus squares into consideration.


Peicai Chen, Peicai_Chen@student.uml.edu
Copy (c) 2021 by Peicai Chen. All s reserved.

12/15/2021 
*/

/* ******************* ScrabbleTiles list ******************  */
//https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
var ScrabbleTiles = [] ;
ScrabbleTiles[0] = {"letter": "A", "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9 } ;
ScrabbleTiles[1] = {"letter": "B", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[2] = {"letter": "C", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[3] = {"letter": "D", "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles[4] = {"letter": "E", "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles[5] = {"letter": "F", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[6] = {"letter": "G", "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3 } ;
ScrabbleTiles[7] = {"letter": "H", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[8] = {"letter": "I", "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9 } ;
ScrabbleTiles[9] = {"letter": "J", "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles[10] = {"letter": "K", "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles[11] = {"letter": "L", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles[12] = {"letter": "M", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[13] = {"letter": "N", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles[14] = {"letter": "O", "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8 } ;
ScrabbleTiles[15] = {"letter": "P", "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[16] = {"letter": "Q", "value" : 10, "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles[17] = {"letter": "R", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles[18] = {"letter": "S", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles[19] = {"letter": "T", "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles[20] = {"letter": "U", "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles[21] = {"letter": "V", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[22] = {"letter": "W", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[23] = {"letter": "X", "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles[24] = {"letter": "Y", "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles[25] = {"letter": "Z", "value" : 10, "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles[26] = {"letter": "_", "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2 } ;

//Pick random letter from the list, https://www.codegrepper.com/code-examples/javascript/how+to+pick+random+image+using+javascript
for(var i = 0; i < 7; i++) {
  var index = Math.floor(Math.random() * ScrabbleTiles.length);
  $("<div class='draggable'><img id = '"+ScrabbleTiles[index].letter+"'  class = '"+index+"' src = '"+"img/scrabble_letter/" + index + ".png" +"'>"+"</img>").appendTo("#draggable");
}



/* ******************* Add drag & drop function ******************  */
//https://jqueryui.com/droppable/#default
$( function() {
  displayword();
    $( ".draggable" ).draggable({

      //set revert property
      revert: "invalid",   
      revertDuration: 200,
    
   
    })
    
/* *******************droppable function for scrabble-rack  ******************  */
 
    $( ".droppable1" ).droppable({
      activeClass: 'ui-state-active',
      hoverClass: 'ui-state-hover',
      tolerance: "touch",
      drop: function (event, ui) {

            if (ui.draggable.element !== undefined) {
              //after letter rack move back to scrabble-rack, make the board still droppable for next letter 
              ui.draggable.element.droppable('enable');
          }
        
          //prevent letter rack overlap: http://jsfiddle.net/caferdo/k5XJv/3/
          var $list = $(this);
          $helper = ui.helper;
          
          $($helper).removeClass("selected");
          var $selected = $(".selected");                 
          ui.draggable.element = $(this);
          $(this).droppable('enable');  

          //copy and move dropped letter div to draggable div
          $(ui.draggable).appendTo("#draggable");
          //style draggalbe element again to stay in the rack: http://jsfiddle.net/adamboduch/hP2DA/
            ui.draggable.css({
              top: "-137px",
              left: "49px"
          })
          displayword();
      }

    })

  /* *******************droppable function for scrabble-board  ******************  */
    $( ".droppable" ).droppable({
      activeClass: 'ui-state-active',
      hoverClass: 'ui-state-hover',
      tolerance: "touch",
    
      drop: handleDropEvent,
  
    })


    //modifiy DropEvent
    function handleDropEvent (event, ui) {

          
      //https://stackoverflow.com/questions/15343385/change-position-of-divs-with-jquery-drag-an-drop
      /*Every time user have placed a letter tile in the scrabble-board, show users which droppable block
      are enabled, or else disabled.*/   
       
      if (ui.draggable.element !== undefined) {
          ui.draggable.element.droppable('enable');
      }
    
      $(this).droppable('disable');
     
      ui.draggable.element = $(this);
      //copy and move draggable letter div to droppable div
      $(ui.draggable).appendTo($(this));
      //oriLeft center drag item in the drop box
      ui.draggable.position({of: $(this),my: 'oriLeft',at: 'oriLeft'});

      displayword();
     
  }
});


var word=" ";
/* *******************function to display and calculate word  ******************  */
//https://stackoverflow.com/questions/11137317/how-to-check-if-div-has-id-or-not
function displayword(){
  let score = 0;
  let doublescore = 0;

  // calculate double letter score
  $('#doublescore img').each(function() {  
    for(var i =0; i< $(this).length; i++) 
    {
        doublescore += ScrabbleTiles[this.className].value;
    }
 
  })
  
  //calculate normal letter score
  $('.droppable img').each(function() {  
    // there is an image in droppable div, get its id&className
    for(var i =0; i< $(this).length; i++) 
    {
        word += ScrabbleTiles[this.className].letter;
        score += ScrabbleTiles[this.className].value;
    }
    word_validate(word);
  })

  //output word
  $("#word").html(word);

  //combine double and normal letter score, output score
  score += doublescore;
  $("#score").html(score);

  //clear the word stack
  word = "";
}

/* ******************* function to verify if user's word exists in dictionary  ******************  */
//https://www.codegrepper.com/code-examples/javascript/check+if+a+word+exists+in+dictionary+javascript
//http://www.math.sjsu.edu/~foster/dictionary.txt
// function word_validate(word) {

//   // const url = "http://www.math.sjsu.edu/~foster/dictionary.txt";
//     $.ajax({
//         type: "GET",
//         //url:'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
//         //url:"dictionary.txt",

//     }).done(function (result) {
//       $("#word").css({color:'green'});
//     }).fail(function () {
//       $("#word").css({color:'red'});
//     });
    
// }

function word_validate(word) {

    $.ajax({
        type: "GET",
        url:"https://raw.githubusercontent.com/PeicaiChen/GUI_HW5/main/js/dictionary.txt",

    }).done(function (result) {
      $("#word").css({color:'green'});
    }).fail(function () {
      $("#word").css({color:'red'});
    });
    
}


/* ******************* function to restart the game  ******************  */
//https://www.codegrepper.com/code-examples/html/refresh+the+page+onclick+javascript
function reload() {
    reload = location.reload();
}


