import React, { PureComponent } from "react";
import apiUrl from 'apiUrl.js';
import * as common from 'assets/js/common.js';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Form,
    Row,
    Col
  } from "reactstrap";

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            memberProfile: []
        }
    }
    UNSAFE_componentWillMount() {
        const proxyurl="https://cors-anywhere.herokuapp.com/";
        const url = apiUrl + "profile?slack_id=" + this.props.id;
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => this.setState({
            memberProfile: data
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    handleModal = () => {
        this.props.handleModal('');
    }

    render() {
        const { memberProfile } = this.state;
        let memberDetailProfile = memberProfile.map((member, index) => {
            return (
                <>
                <div className="content">
                    <Row>
                        <Col md="8">
                        <Card>
                            <CardBody>
                            <Form>
                                <Row>
                                <Col className="pr-md-1" md="6">
                                    <label>이름</label>
                                    <div className="modal-input">{member.name}</div>
                                </Col>
                                <Col className="px-md-1" md="6">
                                    <label>닉네임</label>
                                    <div className="modal-input">{member.nickname}</div>
                                </Col>
                                </Row>
                                <Row>
                                    <Col className="col-md-12" md="4">
                                        <label htmlFor="exampleInputEmail1">
                                            이메일
                                        </label>
                                        <div className="modal-input">{member.email}</div>
                                    </Col>
                                </Row>
                                <Row>
                                <Col className="pr-md-1" md="6">
                                    <label>입사일</label>
                                    <div className="modal-input">{member.first_day_of_work}</div>
                                </Col>
                                <Col className="pl-md-1" md="6">
                                    <label>퇴사일</label>
                                    <div className="modal-input">{member.last_day_of_work}</div>
                                </Col>
                                </Row>
                                <Row>
                                <Col md="pr-md-1 col-md-4">
                                    <label>휴가일수</label>
                                    <div className="modal-input">{member.available_annual_leave}</div>
                                </Col>
                                <Col className="pr-md-1" md="4">
                                    <label>근무지</label>
                                    <div className="modal-input">{common.workPlace(member.work_place)}</div>
                                </Col>
                                <Col className="px-md-1" md="4">
                                    <label>관리자레벨</label>
                                    <div className="modal-input">{common.adminLevel(member.admin_level)}</div>
                                </Col>
                                </Row>
                            </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="primary" type="submit" onClick={this.handleModal}>
                                    close
                                </Button>
                            </CardFooter>
                        </Card>
                        </Col>
                    </Row>
                    </div>
                </>
            )
        })
        return (
            <>
                <div class="layerWindow" onClick={this.handleModal}></div>
                <div class="modal-profile">
                    {memberDetailProfile}
                </div>
            </>
        )
    }
}

export default Modal;