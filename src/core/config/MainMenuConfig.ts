import axios from 'axios';

export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

let MainMenuConfig: Array<MenuItem> = [];
// fetchDataAndCreateMenu();
// console.log(MainMenuConfig)
// async function fetchDataAndCreateMenu() {
// try {
//   const response1 = await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi');
//     const UserRule_Id = response1.data[0]['UserRule_Id'];

//     let sub1: MenuItem[] = [];
//     let sub2: MenuItem[] = [];

//     const response2 = await axios.get(`http://localhost:3100/api/ListMenuById/${UserRule_Id}`);
//     for (let i in response2.data[0]['MainMenu']) {
//       // console.log(response2.data[0]['MainMenu'][i]['MainMenu_Name'])
//       for (let j in response2.data[0]['MainMenu'][i]['SubMenu']) {
//         // console.log(response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Name'])
//         if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '1') {
//           if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '1' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub1.push({
//               heading: "รายการขอเบิก",
//               route: "/csh_withdrawal_request_sea/index",
//             })
//           }
//         } else if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '2') {
//           if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '7' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub2.push({
//               heading: "ตั้งค่าสิทธิ์",
//               route: "/csh_rule_sea/index"
//             })
//           } else if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '8' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub2.push({
//               heading: "ผู้ใช้งาน",
//               route: "/csh_user_sea/index"
//             })
//           }
//         }

//       }
//     }
//     MainMenuConfig = [
//       {
//         heading: "เมนูหลัก",
//         route: "/apps",
//         pages: [
//           {
//             sectionTitle: "เมนูเงินสดย่อย",
//             route: "/csh_withdrawal_request_sea",
//             keenthemesIcon: "element-plus",
//             bootstrapIcon: "bi-archive",
//             sub: sub1,
//           }
//         ],
//       },
//       {
//         pages: [
//           {
//             sectionTitle: "สิทธิ์ผู้ใช้งาน",
//             route: "/apps",
//             keenthemesIcon: "element-plus",
//             bootstrapIcon: "bi-archive",
//             sub: sub2,
//           }
//         ]
//       },
//     ];
// } catch (error) {
  
// }

// }
let UserRule_Id

let response1 = await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi');

 UserRule_Id = response1.data[0]['UserRule_Id']

let sub1: MenuItem[] = []
let sub2: MenuItem[] = []

// UserRule_Id = "1"
 
  axios.get(`http://localhost:3100/api/ListMenuById/${UserRule_Id}`).then((response2) => {
    // console.log(response2)
    for (let i in response2.data[0]['MainMenu']) {
      // console.log(response2.data[0]['MainMenu'][i]['MainMenu_Name'])
      for (let j in response2.data[0]['MainMenu'][i]['SubMenu']) {
        // console.log(response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Name'])
        if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '1') {
          if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '1' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
            sub1.push({
              heading: "รายการขอเบิก",
              route: "/csh_withdrawal_request_sea/index",
            })
          }
        } else if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '2') {
          if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '7' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
            sub2.push({
              heading: "ตั้งค่าสิทธิ์",
              route: "/csh_rule_sea/index"
            })
          } else if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '8' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
            sub2.push({
              heading: "ผู้ใช้งาน",
              route: "/csh_user_sea/index"
            })
          }
        }

      }
    }
  })
  MainMenuConfig = [
    {
      heading: "เมนูหลัก",
      route: "/apps",
      pages: [
        {
          sectionTitle: "เมนูเงินสดย่อย",
          route: "/csh_withdrawal_request_sea",
          keenthemesIcon: "element-plus",
          bootstrapIcon: "bi-archive",
          sub: sub1,
        }
      ],
    },
    {
      pages: [
        {
          sectionTitle: "สิทธิ์ผู้ใช้งาน",
          route: "/apps",
          keenthemesIcon: "element-plus",
          bootstrapIcon: "bi-archive",
          sub: sub2,
        }
      ]
    },
  ];




// async function MainMenuConfig() {
//   let MainMenuConfigME: Array<MenuItem> = [];
//   let UserRule_Id = "";
//   let sub1: MenuItem[] = [];
//   let sub2: MenuItem[] = [];

//   try { 
//     const response1 = await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi');
//     const responseData1 = response1.data[0];
//     UserRule_Id = responseData1.UserRule_Id;

//     const response2 = await axios.get(`http://localhost:3100/api/ListMenuById/${UserRule_Id}`);
//     for (let i in response2.data[0]['MainMenu']) {
//       // console.log(response2.data[0]['MainMenu'][i]['MainMenu_Name'])
//       for (let j in response2.data[0]['MainMenu'][i]['SubMenu']) {
//         // console.log(response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Name'])
//         if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '1') {
//           if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '1' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub1.push({
//               heading: "รายการขอเบิก",
//               route: "/csh_withdrawal_request_sea/index",
//             })
//           }
//         } else if (response2.data[0]['MainMenu'][i]['MainMenu_Id'] == '2') {
//           if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '7' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub2.push({
//               heading: "ตั้งค่าสิทธิ์",
//               route: "/csh_rule_sea/index"
//             })
//           } else if (response2.data[0]['MainMenu'][i]['SubMenu'][j]['SubMenu_Id'] == '8' && response2.data[0]['MainMenu'][i]['SubMenu'][j]['Active'] == '1') {
//             sub2.push({
//               heading: "ผู้ใช้งาน",
//               route: "/csh_user_sea/index"
//             })
//           }
//         }

//       }
//     }
//     MainMenuConfigME = [
//       {
//         heading: "เมนูหลัก",
//         route: "/apps",
//         pages: [
//           {
//             sectionTitle: "เมนูเงินสดย่อย",
//             route: "/csh_withdrawal_request_sea",
//             keenthemesIcon: "element-plus",
//             bootstrapIcon: "bi-archive",
//             sub: sub1,
//           }
//         ],
//       },
//       {
//         pages: [
//           {
//             sectionTitle: "สิทธิ์ผู้ใช้งาน",
//             route: "/apps",
//             keenthemesIcon: "element-plus",
//             bootstrapIcon: "bi-archive",
//             sub: sub2,
//           }
//         ]
//       },
//     ];
//     return MainMenuConfigME;

//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }

// }

export default MainMenuConfig;
