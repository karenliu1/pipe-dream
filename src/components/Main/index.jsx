import React from 'react'

import TileHelper from 'tileHelper'
import Board from 'components/Board'
import Queue from 'components/Queue'

export default React.createClass({
    getInitialState() {
        const board = TileHelper.generateEmptyBoard()
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()
        board[row][col] = { type: startTile }

        return {
            board,
            queue: TileHelper.generateQueue(),
            gooPosition: null,
            startPosition: { row, col }
        }
    },

    onTileClick(row, col) {
        const board = this.state.board
        board[row][col] = this.state.queue.shift()
        this.state.queue.push({ type: TileHelper.generateRandomTile() })
        this.setState({ board, queue: this.state.queue })
    },

    onStep() {
        // If no goo yet, initialize goo position to the start tile.
        if (!this.state.gooPosition) {
            const { row, col } = this.state.startPosition
            const startTile = this.state.board[row][col]
            const gooPosition = {
                row, col,
                exitDirection: startTile.type.openings[0]
            }
            this.state.board[row][col].hasGoo = true
            this.setState({ gooPosition, board: this.state.board })
            return
        }

        // Flow to the next position
        const { row, col, exitDirection } = this.state.gooPosition
        console.log(row, col, exitDirection)
        const nextGooPosition = TileHelper.getNextPosition(row, col, exitDirection)

        // Check if the next position is on the board
        if (TileHelper.isOutOfBounds(nextGooPosition.row, nextGooPosition.col)) {
            console.log('game over, out of bounds')
            return
        }

        // Check if next position has an opening where the goo would enter
        const nextGooTile = this.state.board[nextGooPosition.row][nextGooPosition.col].type
        const enterDirection = TileHelper.getOppositeDirection(exitDirection)
        if (nextGooTile.openings.indexOf(enterDirection) === -1) {
            console.log('game over, next tile does not have opening')
            return
        }

        // Fill the next position with goo
        this.state.board[nextGooPosition.row][nextGooPosition.col].hasGoo = true
        nextGooPosition.exitDirection = TileHelper.getExitDirection(nextGooTile, enterDirection)
        this.setState({ gooPosition: nextGooPosition })
    },

    render() {
        return <div>
            <Queue tiles={ this.state.queue } />
            <Board board={ this.state.board }
                   onTileClick={ this.onTileClick }
                   nextTile={ this.state.queue[0] } />
            <ul>
                <li>Current goo position:</li>
                <li>Row: { this.state.gooPosition && this.state.gooPosition.row }</li>
                <li>Col: { this.state.gooPosition && this.state.gooPosition.col }</li>
                <li>Exit Direction: { this.state.gooPosition && this.state.gooPosition.exitDirection }</li>
            </ul>
            <button onClick={ this.onStep }>Next</button>
        </div>
    }
})
