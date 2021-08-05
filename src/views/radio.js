import React, { PureComponent } from "react";

class Radio extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            monthChecked: true,
            dayChecked: false
        }
    }

    handleClick = () => {
        const { monthChecked,dayChecked } = this.state;
        const { takeSelectType } = this.props;
        this.setState({
            monthChecked : !monthChecked,
            dayChecked : !dayChecked
        })
        takeSelectType(!monthChecked,!dayChecked)
    }

    render(){
        const { monthChecked, dayChecked } = this.state;
        return(
            <div>
                <input type="radio" id="month" name="type" onClick={this.handleClick} checked={monthChecked} readOnly/>
                <label htmlFor="month">월별</label>
                <input type="radio" id="day" name="type" onClick={this.handleClick} checked={dayChecked} readOnly/>
                <label htmlFor="day">일별</label>
            </div>
        )
    }
}

export default Radio;