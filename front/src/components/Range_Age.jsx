import { Component } from "react"

export default class Range_Age extends Component {

    render() {
        return (
            <div>
                <div className={this.props.classNameSmallSpaceRange}>
                    <span className={this.props.classNameColorFontAge}>{this.props.description}</span>
                </div>
                <input
                    type={this.props.type}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    name={this.props.name1}
                    value={this.props.value1}
                    onChange={this.props.onChange}
                />
                <input
                    type={this.props.type}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    name={this.props.name2}
                    value={this.props.value2}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}