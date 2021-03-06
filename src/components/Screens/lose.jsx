import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func,
        score: React.PropTypes.number,
        targetScore: React.PropTypes.number
    },

    render() {
        return <div className={ styles.main }>
            <div className="funky-text is-red is-title">
                <div className={ styles.word1 }>Game</div>
                &nbsp;
                <div className={ styles.word2 }>Over</div>
            </div>

            <div className={ styles.subtitle }>
                Score: { this.props.score } &middot; Target: { this.props.targetScore }
            </div>

            <div>
                <Button onClick={ this.props.onRestartClick }>
                    <span className="funky-text is-green">Restart</span>
                </Button>
            </div>
        </div>
    }
})
