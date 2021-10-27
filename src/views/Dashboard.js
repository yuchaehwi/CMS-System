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
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import apiUrl from 'apiUrl.js'; //api 주소
import SelectCalendar from "views/selectCalendar.js";
import LoadingBar from 'views/loadingBar.js'; //로딩바
import * as common from 'assets/js/common.js';
import 'assets/css/main.css';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartExample1
} from "variables/charts.js";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labels:[],
      workTimeStamp:[],
      homeTimeStamp:[],
      selectDate : common.today,
      selectDateFormat : common.todayDate(),
      loadingIndicator: true
    }
  };

  UNSAFE_componentWillMount() {
    let memberNameList = [];
    let workTimeList = [];
    let homeTimeList = [];
    let url = apiUrl + "info/attendance/all?date=2021-08-05";
      fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(function(member) {
          if(member.status == 2) {
            let workTime = member.work.work_timestamp*1000;
            let homeTime = member.home.home_timestamp*1000;
            workTime == '' ? workTime = '' : workTime = new Date(workTime);
            homeTime == '' ? homeTime = '' : homeTime = new Date(homeTime);
      
            memberNameList.push(member.name+"\n("+member.nickname+")");
            workTimeList.push({y:workTime});
            homeTimeList.push({y:homeTime});
          }
        });
        this.setState({
          labels : memberNameList,
          workTimeStamp : workTimeList,
          homeTimeStamp : homeTimeList,
          loadingIndicator: false
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
  }

  //날짜 선택 값
  takeSelectDate = (dateFormat, date) => {
    let memberNameList = [];
    let workTimeList = [];
    let homeTimeList = [];
    const proxyurl="https://cors-anywhere.herokuapp.com/";
    let url = apiUrl + "info/attendance/all?date=" + dateFormat;
      fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => {
        data.forEach(function(member) {
          if(member.status == 2) {
            let workTime = member.work.work_timestamp*1000;
            let homeTime = member.home.home_timestamp*1000;
            workTime == '' ? workTime = '' : workTime = new Date(workTime);
            homeTime == '' ? homeTime = '' : homeTime = new Date(homeTime);
      
            memberNameList.push(member.name+"\n("+member.nickname+")");
            workTimeList.push({y:workTime});
            homeTimeList.push({y:homeTime});
          }
        });
        this.setState({
          labels : memberNameList,
          workTimeStamp : workTimeList,
          homeTimeStamp : homeTimeList,
          selectDate : date,
          selectDateFormat : dateFormat,
          loadingIndicator: false
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
  }

  render() {
    const { selectDate, selectDateFormat, labels, workTimeStamp, homeTimeStamp, loadingIndicator } = this.state;
    return (
      <>
        <div className="content">
          {/*************** 날짜선택 ****************/}
          <div className="chart-option">
            <SelectCalendar chartClass="dashboard-calendar" takeSelectDate={this.takeSelectDate} />
          </div>
          {/*******  출근  *******/}
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">{selectDateFormat}</h5>
                      <CardTitle tag="h3">전직원 <b><font className="workChart_color">출근</font></b> 현황</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="chart-body">
                {loadingIndicator === true ? <table className="chart-loading"><LoadingBar/></table> : null}
                  <div className="chart-area">
                    <Bar
                      data={
                        {
                          labels:labels,
                          datasets : [
                            {
                              label: "출근 ",
                              borderColor: function(context){
                                var index = context.dataIndex;
                                var value = context.dataset.data[index];
                                if(value != null) {
                                  return (new Date(selectDate.getFullYear(),selectDate.getMonth(),selectDate.getDate(),10,0,59) < value.y) ? 'red' : "#1f8ef1"
                                }
                              },
                              borderWidth: 2,
                              pointBorderColor: "rgba(255,255,255,0)",
                              barThickness:4,
                              data: workTimeStamp
                            }
                          ]
                        }
                      }
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/*******  퇴근  *******/}
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">{selectDateFormat}</h5>
                      <CardTitle tag="h3">전직원 <b><font className="homeChart_color">퇴근</font></b> 현황</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="chart-body">
                  {loadingIndicator === true ? <table className="chart-loading"><LoadingBar/></table> : null}
                  <div className="chart-area">
                    <Bar
                      data={
                        {
                          labels:labels,
                          datasets : [
                            {
                              label: "퇴근 ",
                              borderColor: function(context){
                                var index = context.dataIndex;
                                var value = context.dataset.data[index];
                                if(value != null) {
                                  return (new Date(selectDate.getFullYear(),selectDate.getMonth(),selectDate.getDate(),19,0) < value.y) ? 'red' : "#1f8ef1"
                                }
                              },
                              borderWidth: 2,
                              pointBorderColor: "rgba(255,255,255,0)",
                              barThickness:4,
                              data: homeTimeStamp
                            }
                          ]
                        }
                      }
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          {/* <Row>
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Tasks(5)</h6>
                  <p className="card-category d-inline"> today</p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Update the Documentation</p>
                            <p className="text-muted">
                              Dwuamish Head, Seattle, WA 8:47 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip636901683"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">GDPR Compliance</p>
                            <p className="text-muted">
                              The GDPR is a regulation that requires businesses
                              to protect the personal data and privacy of Europe
                              citizens for transactions that occur within EU
                              member states.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip457194718"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Solve the issues</p>
                            <p className="text-muted">
                              Fifty percent of all respondents said they would
                              be more likely to shop at a company
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip362404923"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip362404923"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Release v2.0.0</p>
                            <p className="text-muted">
                              Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip818217463"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip818217463"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Export the processed files</p>
                            <p className="text-muted">
                              The report also shows that consumers will not
                              easily forgive a company once a breach exposing
                              their personal data occurs.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip831835125"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip831835125"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Arival at export process</p>
                            <p className="text-muted">
                              Capitol Hill, Seattle, WA 12:34 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip217595172"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip217595172"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </div>
      </>
    );
  }
}

export default Dashboard;
