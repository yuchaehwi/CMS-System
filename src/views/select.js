import React, { PureComponent } from "react";

class Select extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectMember : 'Member',
            selectMemberNickname : ''
        }
    }

    takeSelectMember = (uuid,name,nickname) => {
        const { takeSelectMember } = this.props;
        takeSelectMember(uuid,name,nickname);
        this.setState({
            selectMember : name,
            selectMemberNickname : "(" + nickname + ")"
        })
    }

    render(){
        const { selectMember, selectMemberNickname } = this.state;
        const { memberProfile } = this.props;
        console.log(memberProfile)
        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle btn-success" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectMember}{selectMemberNickname}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        memberProfile.map(
                            (member) => (
                                member.status > 1 ?
                                <div className="dropdown-item" key={member.name + member.phone} onClick={e=>this.takeSelectMember(member.uuid,member.name,member.nickname)}>
                                    {member.name}({member.nickname})
                                </div> : 
                                <></>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Select;