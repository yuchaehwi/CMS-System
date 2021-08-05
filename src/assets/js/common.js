//근무지
export function workPlace(num) { 
    if(num===0) {
      return "강남";
    } else if(num===1) {
      return "선릉";
    } else {
      return "부산";
    }
  }
  
  //관리자권한
  export function adminLevel(num) { 
    if(num==="0") {
      return "Admin";
    } else if(num==="1") {
      return "Manager";
    } else {
      return "Member";
    }
  }
  
  export const today = new Date();
  export const year = today.getFullYear();
  export const month = ("0" + (today.getMonth() + 1)).slice(-2);
  export const day = ("0" + today.getDate()).slice(-2);
  //출퇴근현황(일별) - 오늘날짜 state 지정
  export function todayDate() {
    return year+"-"+month+"-"+day;
  }
  
  //출퇴근현황(월별) - 오늘날짜 state 지정
  export function todayMonth() {
    return year+"-"+month;
  }