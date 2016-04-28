import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cn from 'classnames'

import { TileType, TRANSITION_BOARD_MS } from 'constants'
import { Tiles } from 'tiles'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        nextTile: TileType,
        onTileClick: Type.func
    },

    render() {
        return <div>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row }>
                    { rowTiles.map((tile, col) => {
                        // Don't show transitions for empty tiles (whether replacing an empty
                        // tile or restarting the board with empty tiles)
                        const isEmptyTile = tile.type === Tiles.EMPTY

                        return <ReactCSSTransitionGroup key={ col }
                                                 className={ cn(tileStyles.background, styles.col) }
                                                 transitionName="board"
                                                 transitionEnter={ !isEmptyTile }
                                                 transitionLeave={ !isEmptyTile }
                                                 transitionEnterTimeout={ TRANSITION_BOARD_MS }
                                                 transitionLeaveTimeout={ TRANSITION_BOARD_MS }>
                            <Tile tile={ tile }
                                  className={ isEmptyTile ? '' : 'is-non-empty' }
                                  key={ tile.animationId }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />
                        </ReactCSSTransitionGroup>
                    }) }
                </div>
            )) }
        </div>
    }
})
