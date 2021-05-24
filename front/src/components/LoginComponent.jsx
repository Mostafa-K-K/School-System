import { Component } from "react"
import { Link } from "react-router-dom"

export default class LoginComponent extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.props.onSubmit} className={this.props.className}>
                    <input
                        placeholder={this.props.placeholderUser}
                        type={this.props.typeUser}
                        name={this.props.nameUser}
                        value={this.props.valueUser}
                        onChange={this.props.onChange}
                    />
                    <input
                        placeholder={this.props.placeholderPass}
                        type={this.props.typePass}
                        name={this.props.namePass}
                        value={this.props.valuePass}
                        onChange={this.props.onChange}
                    />
                    <Link to="/forgot password" className={this.props.classNameLink}>Forgot Password</Link>
                    <button
                        type={this.props.typeButton}
                        className={this.props.classNameButton}
                    >
                        Login
                        </button>
                </form>
            </div>
        )
    }
}