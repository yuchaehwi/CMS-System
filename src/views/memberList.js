import React, { PureComponent } from "react";
import * as common from 'assets/js/common.js';

class MemberList extends PureComponent{
    render() {
        const { width, memberProfile, handleModal } = this.props;
        let memberList;
        if(Number(width)<=768) {
            memberList = memberProfile.map((member) => (
                <tr key={member.name + member.phone} onClick={handleModal.bind(this, member.slack_id)} className={member.status === 0 && "status-leave"}>
                    <td>{member.name}</td>
                    <td>{member.nickname}</td>
                    <td>{member.phone}</td>
                    <td className="memberList pc-view">{member.email}</td>
                    <td className="memberList pc-view">{member.first_day_of_work}</td>
                    <td className="memberList pc-view">{member.last_day_of_work}</td>
                    <td className="memberList pc-view">{member.available_annual_leave}</td>
                    <td className="memberList pc-view">{common.workPlace(member.work_place)}</td>
                    <td className="memberList pc-view">{common.adminLevel(member.admin_level)}</td>
                </tr>
            ))
        } else {
            memberList = memberProfile.map((member) => (
            <>
            <tr key={member.name + member.phone} className={member.status === 0 && "status-leave"}>
                <td>{member.name}</td>
                <td>{member.nickname}</td>
                <td>{member.phone}</td>
                <td className="memberList pc-view">{member.email}</td>
                <td className="memberList pc-view">{member.first_day_of_work}</td>
                <td className="memberList pc-view">{member.last_day_of_work}</td>
                <td className="memberList pc-view">{member.available_annual_leave}</td>
                <td className="memberList pc-view">{common.workPlace(member.work_place)}</td>
                <td className="memberList pc-view">{common.adminLevel(member.admin_level)}</td>
            </tr>
            </>
        ));
        }
        return (
            <>
                {memberList}
            </>
        )
    }
}

export default MemberList;