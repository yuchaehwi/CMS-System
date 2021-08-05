/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { PureComponent } from "react";
import Select from 'views/select.js'; //직원 선택
import SelectCalendar from 'views/selectCalendar.js'; //일 선택 달력
import SelectMonthCalendar from 'views/selectMonthCalendar.js'; //월 선택 달력
import Radio from 'views/radio.js'; //라디오버튼
import apiUrl from 'apiUrl.js'; //api 주소
import Modal from 'views/modal.js'; //모달창
import LoadingBar from 'views/loadingBar.js'; //로딩바
import 'assets/css/main.css';
import MemberList from 'views/memberList.js'; //전체직원정보
import DaySelectMember from 'views/daySelectMember.js'; //선택직원 출퇴근현황(일별)
import * as common from 'assets/js/common.js';
import * as items from 'items.js';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

//메뉴별 테이블 head(항목) 설정
function tableHead(path) {
  if(path==='member') {
    return(
      items.member.map(
        (member) => (<th key={member}>{member}</th>)
      )
    )
  } else if(path==='monthlyAllAttendance') {
    return(
      items.monthlyAttendance.map(
        (member) => (<th key={member}>{member}</th>)
      )
    )
  } else if(path === 'dailyAllAttendance') {
    return(
      items.allAttendance.map(
        (member) => (<th key={member}>{member}</th>)
      )
    )
  } else {
    return(
      items.attendance.map(
        (member) => (<th key={member}>{member}</th>)
      )
    )
  }
}

class Tables extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        memberProfile: [],
        selectMemberAttendance:[],
        selectMemberSlackId : '',
        selectMemberId : '',
        selectMemberName : '',
        selectMemberNickname : '',
        selectMemberArray : [], //이름,닉네임
        selectDate : ((this.props.location.pathname).substring(7) === 'dailyAllAttendance') ? common.todayDate() : common.todayMonth(),
        selectType : 'month',
        allMemberDayAttendance : [],
        width : '',
        loadingIndicator: ''
    }
  }

  /**  직원정보, 일별출퇴근(전직원) 출력  **/
  UNSAFE_componentWillMount() {
    const { location } = this.props;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = '';
    let path = (location.pathname).substring(7);
    if(path==='member' || path==='selectAttendance'){
      url = apiUrl + "profile/all";
      fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        memberProfile : data,
        loadingIndicator: false
      }))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

      if(path==='member') {
        this.setState({
          loadingIndicator: true
        })
      }
    } else if(path === 'dailyAllAttendance') {
      this.setState({
        loadingIndicator: true
      })

      url = apiUrl + "info/attendance/all?date="+this.state.selectDate;
      fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        allMemberDayAttendance : data,
        loadingIndicator: false
      }))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }
    
    /**  브라우저 width state 지정 **/
    this.setState({
      width: window.screen.width
    })
  }

  //직원 선택 값
  takeSelectMember = (memberId,memberName,memberNickname) => {
    this.setState({
      selectMemberId : memberId,
      selectMemberName : memberName,
      selectMemberNickname : memberNickname
    })
  }
  
  //날짜 선택 값
  takeSelectDate = (date) => {
    const { location } = this.props;
    let path = (location.pathname).substring(7);
    this.setState({
      selectDate : date
    })

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = '';
    if(path === 'dailyAllAttendance') {
      url = apiUrl + "info/attendance/all?date="+date;
      fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        allMemberDayAttendance : data
      }))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }
  }

  //타입 선택 값(월별,일별) -> 타입 변경될 때 초기화
  takeSelectType = (month) => {
    this.setState({
      selectType : (month === true) ? "month" : "day",
      selectDate : (month === true) ? common.todayMonth() : common.todayDate(),
      selectMemberAttendance:[]
    })
  }

  //선택직원 출퇴근 api 요청
  attendanceData = () => {
    const { selectMemberId, selectType, selectDate, selectMemberNickname, selectMemberName } = this.state;
    this.setState({
      loadingIndicator: true
    })
    const proxyurl="https://cors-anywhere.herokuapp.com/";
    let url='';
    url = apiUrl + "info/attendance?uuid="+selectMemberId+"&return_type="+selectType+"&date=" + selectDate
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({
        selectMemberAttendance:data,
        loadingIndicator: false,
        selectMemberArray : [selectMemberNickname, selectMemberName]
      }))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  handleModal = (id) => {
    this.setState({
      selectMemberSlackId : id
    })
  }

  render() { 
    const { location, type } = this.props;
    const { selectMemberArray, selectType, selectMemberSlackId, memberProfile, width, selectMemberAttendance, loadingIndicator } = this.state;
    const path = (location.pathname).substring(7);
    let memberName, selectOption = '';
    //특정직원 일별 출퇴근 현황
    if(path==='selectAttendance') {
      memberName = <h4 className="selectMemberName">{selectMemberArray[1]} {selectMemberArray[0]}</h4>;
    }

    // 사이드바 선택에 따른 옵션선택 출력
    if(path === "selectAttendance") {
      if(selectType==="month" || selectType==="") {
        selectOption = <SelectMonthCalendar takeSelectDate={this.takeSelectDate} />;
      } else {
        selectOption = <SelectCalendar takeSelectDate={this.takeSelectDate} />
      }
    } else if(path === 'monthlyAllAttendance'){
      selectOption = <SelectMonthCalendar takeSelectDate={this.takeSelectDate} />;
    } else if(path === 'dailyAllAttendance') {
      selectOption = <SelectCalendar takeSelectDate={this.takeSelectDate} />
    }
    
    return (
      <>
        {
          selectMemberSlackId !== '' && 
          <Modal className="modal" id={selectMemberSlackId} handleModal={this.handleModal}/>
        }
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Member Information</CardTitle>
                  <div className="headerAlign">
                    {
                      path === 'selectAttendance' && 
                        <Radio takeSelectType={this.takeSelectType}></Radio>
                    }
                    <div className="headerAlign row">
                    { selectOption }
                    {
                      path === 'selectAttendance' && 
                        <Select takeSelectMember={this.takeSelectMember} type={type} memberProfile={memberProfile}></Select>
                    }
                    </div>
                    {
                      path === 'selectAttendance' && 
                      <button className="btn btn-outline-info" onClick={this.attendanceData}>검색</button>
                    }
                  </div>
                </CardHeader>
                {memberName}
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr className={path + " " + this.state.selectType}>
                      {
                        tableHead(path)
                      }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        /* 직원정보출력 */
                        path==='member' &&
                          <MemberList memberProfile={memberProfile} width={width} handleModal={this.handleModal}/>
                      }
                      {
                        /* 출퇴근현황(일별)출력 */
                        (path==='selectAttendance' && selectType === "day") &&
                        this.state.selectMemberAttendance.map((member)=>{
                          return <DaySelectMember date={member.date} workTime={member.work.work_time_string} homeTime={member.home.home_time_string} status={member.status} type="selectMember" selectType="day" />
                        })
                      }
                      {
                        /* 출퇴근현황(월별)출력 */
                        (path==='selectAttendance' && selectType === "month") &&
                        this.state.selectMemberAttendance.map((member)=>{
                          return <DaySelectMember date={member.date} workTime={member.work.work_time_string} homeTime={member.home.home_time_string} status={member.status} type="selectMember" selectType="month" />
                        })
                      }
                      {
                        (path==='dailyAllAttendance' && this.state.allMemberDayAttendance != null) && 
                        this.state.allMemberDayAttendance.map((member)=>{
                          return <DaySelectMember name={member.name} nickname={member.nickname} workTime={member.work.work_time_string} homeTime={member.home.home_time_string} desc={member.work.desc} status={member.status} type="allMember"/>
                        })
                      }
                      {
                        /* 로딩바 */
                        loadingIndicator === true ? <LoadingBar /> : null
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
