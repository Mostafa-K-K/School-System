import { Component } from 'react'

export default class IN extends Component {

    render() {
        return (
            <input
                id={this.props.id}
                className={this.props.className}
                type={this.props.type}
                placeholder={this.props.placeholder}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}