import { Component } from 'react'

export default class TR extends Component {

    render() {
        return (
            <tr>
                <td > <label for={this.props.for}>{this.props.description}</label></td>
                <td>
                    <input
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        value={this.props.value}
                        id={this.props.id}
                        onChange={this.props.onChange}
                    />
                </td>
            </tr>
        )
    }
}