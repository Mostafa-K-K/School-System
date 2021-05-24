import { Component } from 'react'

export default class LB extends Component {

    render() {
        return (
            <label className={this.props.className} htmlFor={this.props.htmlFor}>
                {this.props.description}
            </label>
        )
    }
}