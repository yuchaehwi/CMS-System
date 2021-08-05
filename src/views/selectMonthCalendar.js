import React, { PureComponent } from "react";
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css';
import * as common from 'assets/js/common.js';

class SelectMonthCalendar extends PureComponent {
    handleChange = (maskedValue, selectedYear, selectedMonth) => {
        const { takeSelectDate } = this.props;
        takeSelectDate(selectedYear+"-"+("0" + (Number(selectedMonth) + 1)).slice(-2));
    }
    render() {
        return(
            <MonthPickerInput year={common.today.getFullYear()} month={common.today.getMonth()} onChange={this.handleChange} />
        )
    }
}

export default SelectMonthCalendar;