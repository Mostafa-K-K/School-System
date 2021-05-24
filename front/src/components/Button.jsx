import { Component } from 'react'

export default class BT extends Component {

    render() {
        return (
            <button
                id={this.props.id}
                className={this.props.className}
                type={this.props.type}
                onClick={this.props.onClick}
                onSubmit={this.props.onSubmit}
            >
                {this.props.description}
            </button>
        )
    }
}