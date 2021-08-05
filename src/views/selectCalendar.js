import React, { PureComponent } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import * as common from 'assets/js/common.js';

class SelectCalendar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggle : false,
            style : 'none',
            date : common.today,
            dateFormat: common.todayDate()
        }
    }

    handleClick = () => {
        const { toggle } = this.state;
        toggle===false ?
            this.setState({
                toggle : true,
                style : 'block'
            }) : 
            this.setState({
                toggle : false,
                style : 'none'
            })
    }

    handleChange = (date) => {
        const { takeSelectDate } = this.props;
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        this.setState({
            dateFormat: year+"-"+month+"-"+day,
            toggle : false,
            style : 'none',
            date : date
        });
        takeSelectDate((year+"-"+month+"-"+day),date);
    }

    preDate = () => {
        const { takeSelectDate } = this.props;
        let date = this.state.date;
        date.setDate(date.getDate()-1); 
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        this.setState({
            date : date,
            dateFormat : year + "-" + month + "-" + day
        })
        takeSelectDate((year+"-"+month+"-"+day),date);
    }

    nextDate = () => {
        const { takeSelectDate } = this.props;
        let date = this.state.date;
        date.setDate(date.getDate()+1); 
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        this.setState({
            date : date,
            dateFormat : year + "-" + month + "-" + day
        })
        takeSelectDate((year+"-"+month+"-"+day),date);
    }

    render(){
        const { style, dateFormat } = this.state;
        const { chartClass } = this.props;
        const calendarStyle={
            position:"absolute",
            display:style
        }
        return(
            <div className={"dropdown marginTop "+chartClass}>
                <i className="tim-icons icon-minimal-left calendarBtn" onClick={this.preDate} />
                <button className="btn btn-secondary dropdown-toggle" type="button" onClick={this.handleClick}>
                    {dateFormat}
                </button>
                <i className="tim-icons icon-minimal-right calendarBtn" onClick={this.nextDate}/>
                <div style={calendarStyle} className="calendar-div">
                    <Calendar onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}

export default SelectCalendar;