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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
// import Map from "views/Map.js";
// import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
// import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/member",
    name: "직원정보",
    icon: "tim-icons icon-align-left-2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/monthlyAllAttendance",
    name: "월별 출퇴근 현황(전직원)",
    icon: "tim-icons icon-align-left-2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/dailyAllAttendance",
    name: "일별 출퇴근 현황(전직원)",
    icon: "tim-icons icon-align-left-2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/selectAttendance",
    name: "출퇴근 현황(선택)",
    icon: "tim-icons icon-align-left-2",
    component: TableList,
    layout: "/admin"
  },
  // {
  //   path: "/Icon",
  //   name: "Icon",
  //   icon: "tim-icons icon-single-02",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // }
];
export default routes;
