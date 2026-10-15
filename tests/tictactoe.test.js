import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Tic-Tac-Toe Game Suite', () => {
    let dom;
    let window;
    let document;
    let boxes;
    let gameInfo;
    let newGameBtn;
    let game;

    beforeEach(() => {
        // Construct a fresh DOM instance before each test
        dom = new JSDOM(htmlContent, {
            runScripts: 'dangerously',
            resources: 'usable'
        });
        window = dom.window;
        document = window.document;

        // Load index.js into the JSDOM window context
        const scriptCode = fs.readFileSync(path.resolve(__dirname, '../index.js'), 'utf8');
        const scriptEl = document.createElement('script');
        scriptEl.textContent = scriptCode;
        document.body.appendChild(scriptEl);

        boxes = Array.from(document.querySelectorAll('.box'));
        gameInfo = document.querySelector('.game-info');
        newGameBtn = document.querySelector('.btn');
        game = window;
    });

    it('1. Board initializes correctly with 9 empty cells, Player X active, and hidden reset button', () => {
        expect(boxes.length).toBe(9);
        boxes.forEach((box) => {
            expect(box.innerText).toBe('');
            expect(box.disabled).toBe(false);
            expect(box.classList.contains('win')).toBe(false);
        });
        expect(gameInfo.innerText).toBe('Current Player - X');
        expect(newGameBtn.classList.contains('active')).toBe(false);
    });

    it('2. Players can make valid moves and turns alternate between X and O', () => {
        // Move 1: Player X chooses cell 0
        boxes[0].click();
        expect(boxes[0].innerText).toBe('X');
        expect(gameInfo.innerText).toBe('Current Player - O');

        // Move 2: Player O chooses cell 4
        boxes[4].click();
        expect(boxes[4].innerText).toBe('O');
        expect(gameInfo.innerText).toBe('Current Player - X');

        // Move 3: Player X chooses cell 2
        boxes[2].click();
        expect(boxes[2].innerText).toBe('X');
        expect(gameInfo.innerText).toBe('Current Player - O');
    });

    it('3. Invalid moves are prevented on already occupied cells', () => {
        boxes[0].click(); // Player X
        expect(boxes[0].innerText).toBe('X');
        expect(gameInfo.innerText).toBe('Current Player - O');

        // Player O attempts to click the same cell 0
        boxes[0].click();
        // Cell should remain 'X' and turn should remain Player O
        expect(boxes[0].innerText).toBe('X');
        expect(gameInfo.innerText).toBe('Current Player - O');
    });

    it('4. Detects winning combination: Row 1 [0, 1, 2]', () => {
        // X: 0, O: 3, X: 1, O: 4, X: 2
        boxes[0].click(); // X
        boxes[3].click(); // O
        boxes[1].click(); // X
        boxes[4].click(); // O
        boxes[2].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[0].classList.contains('win')).toBe(true);
        expect(boxes[1].classList.contains('win')).toBe(true);
        expect(boxes[2].classList.contains('win')).toBe(true);
        expect(newGameBtn.classList.contains('active')).toBe(true);
    });

    it('5. Detects winning combination: Row 2 [3, 4, 5]', () => {
        boxes[3].click(); // X
        boxes[0].click(); // O
        boxes[4].click(); // X
        boxes[1].click(); // O
        boxes[5].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[3].classList.contains('win')).toBe(true);
        expect(boxes[4].classList.contains('win')).toBe(true);
        expect(boxes[5].classList.contains('win')).toBe(true);
    });

    it('6. Detects winning combination: Row 3 [6, 7, 8]', () => {
        boxes[6].click(); // X
        boxes[0].click(); // O
        boxes[7].click(); // X
        boxes[1].click(); // O
        boxes[8].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[6].classList.contains('win')).toBe(true);
        expect(boxes[7].classList.contains('win')).toBe(true);
        expect(boxes[8].classList.contains('win')).toBe(true);
    });

    it('7. Detects winning combination: Column 1 [0, 3, 6]', () => {
        boxes[0].click(); // X
        boxes[1].click(); // O
        boxes[3].click(); // X
        boxes[2].click(); // O
        boxes[6].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[0].classList.contains('win')).toBe(true);
        expect(boxes[3].classList.contains('win')).toBe(true);
        expect(boxes[6].classList.contains('win')).toBe(true);
    });

    it('8. Detects winning combination: Column 2 [1, 4, 7]', () => {
        boxes[1].click(); // X
        boxes[0].click(); // O
        boxes[4].click(); // X
        boxes[2].click(); // O
        boxes[7].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[1].classList.contains('win')).toBe(true);
        expect(boxes[4].classList.contains('win')).toBe(true);
        expect(boxes[7].classList.contains('win')).toBe(true);
    });

    it('9. Detects winning combination: Column 3 [2, 5, 8]', () => {
        boxes[2].click(); // X
        boxes[0].click(); // O
        boxes[5].click(); // X
        boxes[1].click(); // O
        boxes[8].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[2].classList.contains('win')).toBe(true);
        expect(boxes[5].classList.contains('win')).toBe(true);
        expect(boxes[8].classList.contains('win')).toBe(true);
    });

    it('10. Detects winning combination: Diagonal [0, 4, 8]', () => {
        boxes[0].click(); // X
        boxes[1].click(); // O
        boxes[4].click(); // X
        boxes[2].click(); // O
        boxes[8].click(); // X -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - X');
        expect(boxes[0].classList.contains('win')).toBe(true);
        expect(boxes[4].classList.contains('win')).toBe(true);
        expect(boxes[8].classList.contains('win')).toBe(true);
    });

    it('11. Detects winning combination: Anti-Diagonal [2, 4, 6] for Player O', () => {
        boxes[0].click(); // X
        boxes[2].click(); // O
        boxes[1].click(); // X
        boxes[4].click(); // O
        boxes[7].click(); // X
        boxes[6].click(); // O -> Wins!

        expect(gameInfo.innerText).toBe('Winner Player - O');
        expect(boxes[2].classList.contains('win')).toBe(true);
        expect(boxes[4].classList.contains('win')).toBe(true);
        expect(boxes[6].classList.contains('win')).toBe(true);
    });

    it('12. Detects draw correctly when board is full without a winner', () => {
        // Tie game moves:
        // X O X
        // X X O
        // O X O
        // Order:
        // 0(X), 1(O), 2(X), 5(O), 3(X), 6(O), 4(X), 8(O), 7(X)
        const moves = [0, 1, 2, 5, 3, 6, 4, 8, 7];
        moves.forEach((idx) => boxes[idx].click());

        expect(gameInfo.innerText).toBe('Game Tied !');
        expect(newGameBtn.classList.contains('active')).toBe(true);
        boxes.forEach((box) => {
            expect(box.disabled).toBe(true);
        });
    });

    it('13. Prevents further moves after a win', () => {
        // X wins on row 1
        boxes[0].click(); // X
        boxes[3].click(); // O
        boxes[1].click(); // X
        boxes[4].click(); // O
        boxes[2].click(); // X (win)

        expect(gameInfo.innerText).toBe('Winner Player - X');

        // Attempt move on remaining cell 8
        boxes[8].click();
        expect(boxes[8].innerText).toBe('');
        expect(gameInfo.innerText).toBe('Winner Player - X');
    });

    it('14. New Game button resets board, clears win highlights, and resets player to X', () => {
        // Play until win
        boxes[0].click(); // X
        boxes[3].click(); // O
        boxes[1].click(); // X
        boxes[4].click(); // O
        boxes[2].click(); // X wins

        expect(boxes[0].classList.contains('win')).toBe(true);
        expect(newGameBtn.classList.contains('active')).toBe(true);

        // Click New Game button
        newGameBtn.click();

        // Check reset
        boxes.forEach((box) => {
            expect(box.innerText).toBe('');
            expect(box.classList.contains('win')).toBe(false);
            expect(box.disabled).toBe(false);
        });
        expect(gameInfo.innerText).toBe('Current Player - X');
        expect(newGameBtn.classList.contains('active')).toBe(false);
    });

    it('15. Supports keyboard navigation via Enter and Space keydown events', () => {
        // Press Enter on cell 0
        const enterEvent = new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        boxes[0].dispatchEvent(enterEvent);
        expect(boxes[0].innerText).toBe('X');
        expect(gameInfo.innerText).toBe('Current Player - O');

        // Press Space on cell 1
        const spaceEvent = new window.KeyboardEvent('keydown', { key: ' ', bubbles: true });
        boxes[1].dispatchEvent(spaceEvent);
        expect(boxes[1].innerText).toBe('O');
        expect(gameInfo.innerText).toBe('Current Player - X');
    });
});

