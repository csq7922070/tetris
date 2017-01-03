import React from 'react';
import TetrisGame from '../components/tetris/tetris-game';

class Tetris extends React.Component {
    render() {
        return (
            <div>
                <TetrisGame></TetrisGame>
                <TetrisGame></TetrisGame>
            </div>
        );
    }
}

export default Tetris;