import React, { PureComponent } from "react";

class DaySelectMember extends PureComponent {
    render() {
        const { name, nickname } = this.props;
        let selectDate, workTime, homeTime = '';
        (this.props.workTime === '') ? workTime='X' : workTime = this.props.workTime;
        (this.props.homeTime === '') ? homeTime='X' : homeTime = this.props.homeTime;

        // 특정직원 출퇴근정보 출력(일별)
        if(this.props.type === 'selectMember'){
            selectDate = this.props.date;
            if(this.props.selectType === 'day'){
                return (
                    <tr>
                        <td className="day-select-member pc-view">{selectDate}</td>
                        <td>{workTime}</td>  {/*출근시간*/}
                        <td>{homeTime}</td>  {/*퇴근시간 */}
                        <td>업무종료</td>
                        <td>정상</td>
                        <td>비고</td>
                    </tr>
                )
            } else if(this.props.selectType === 'month') {
                return (
                    <tr>
                        <td className="day-select-member">{selectDate}</td>
                        <td>{workTime}</td>  {/*출근시간*/}
                        <td>{homeTime}</td>  {/*퇴근시간 */}
                        <td className="day-select-member pc-view">업무종료</td>
                        <td className="day-select-member pc-view">정상</td>
                        <td className="day-select-member pc-view">비고</td>
                    </tr>
                )
            }  
        // 전직원 출퇴근정보 출력(일별)
        } else {    
            if(this.props.status > 1) {
                return (
                    <tr>
                        <td className="day-select-member">{name} ({nickname})</td>
                        <td>{workTime}</td>  {/*출근시간*/}
                        <td>{homeTime}</td>  {/*퇴근시간 */}
                        <td className="day-select-member pc-view">업무종료</td>
                        <td className="day-select-member pc-view">정상</td>
                        <td className="day-select-member pc-view">{this.props.desc}</td>
                    </tr>
                )
            } else {
                return (
                    <></>
                )
            }
            
        }     
    }
}

export default DaySelectMember;