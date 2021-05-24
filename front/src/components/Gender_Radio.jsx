import { Component } from 'react'

export default class Gender_Radio extends Component {

    render() {
        return (
            <div className={this.props.classFlexRadio}>
                <div>
                    <input
                        checked
                        type="radio"
                        name="gender"
                        value="Male"
                        id="male"
                        checked={this.props.check == 'Male'}
                        onChange={this.props.onChange}
                    />
                    <label htmlFor="male" className={this.props.className}> Male</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        id="female"
                        checked={this.props.check == 'Female'}
                        onChange={this.props.onChange}
                    />
                    <label htmlFor="female" className={this.props.className}> Female</label>
                </div>
            </div>
        )
    }
}