import { Component } from 'react'
import image_slider_1 from '../images/image_slider_1.jpg'
import image_slider_2 from '../images/image_slider_2.jpg'
import image_slider_3 from '../images/image_slider_3.jpg'

export default class Home extends Component {

    state = {
        i: 0,
        slider: [image_slider_1, image_slider_2, image_slider_3]
    }

    left = () => {
        let { i, slider } = this.state;
        var length = slider.length;
        (i > 0) ? i-- : i = length - 1;
        this.setState({ i, slider });
    }

    right = () => {
        let { i, slider } = this.state;
        var length = slider.length;
        (i < length - 1) ? i++ : i = 0;
        this.setState({ i, slider });
    }

    render() {
        let { slider, i } = this.state;
        return (
            <>
                <a class="prev" onClick={this.left}>&#10094;</a>
                <a class="next" onClick={this.right}>&#10095;</a>
                <img src={slider[i]} className="mySlides fade" alt="Welcome to Al-Manara School" />
            </>
        )
    }
}