# GUI_HW5

Implementing a Bit of Scrabble with Drag-and-Drop
Display a Scrabble board to the user along with seven letter tiles on a tile rack. 
The user then drags tiles to the board to make a word, report his or her score.

https://peicaichen.github.io/GUI_HW5/HW5.html

https://github.com/PeicaiChen/GUI_HW5

Features currently working, fully working:

• letter tiles in the player’s “hand” are selected randomly from a data structure with the proper distribution of the letters
• letter tiles can be dragged-and-dropped onto target Scrabble squares
• program identifies which letter tile is dropped onto which Scrabble square
• board includes bonus squares
• score is tallied correctly, Not including consideration of bonus square multipliers
• Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them anywhere else, they will be bounced back to the “rack”.
• Once the tile is placed on the Scrabble board, it can not be moved.
• Except for the first letter, all sub-subsequent letters must be placed directly next to or below another letter with no space. Else, they will bounce back to the “rack”.
• user can always restart the game.

