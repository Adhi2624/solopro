// import "./featured.scss";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

// const Featured = () => {
//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Total Revenue</h1>
//         <MoreVertIcon fontSize="small" />
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//           <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
//         </div>
//         <p className="title">Total sales made today</p>
//         <p className="amount">$420</p>
//         <p className="desc">
//           Previous transactions processing. Last payments may not be included.
//         </p>
//         <div className="summary">
//           <div className="item">
//             <div className="itemTitle">Target</div>
//             <div className="itemResult negative">
//               <KeyboardArrowDownIcon fontSize="small"/>
//               <div className="resultAmount">$12.4k</div>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Last Week</div>
//             <div className="itemResult positive">
//               <KeyboardArrowUpOutlinedIcon fontSize="small"/>
//               <div className="resultAmount">$12.4k</div>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Last Month</div>
//             <div className="itemResult positive">
//               <KeyboardArrowUpOutlinedIcon fontSize="small"/>
//               <div className="resultAmount">$12.4k</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;



import React, { useEffect, useState } from 'react';
import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const backend = process.env.REACT_APP_BACKEND;

const Featured = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [mentorsCount, setMentorsCount] = useState(0);
  const [investorsCount, setInvestorsCount] = useState(0);
  const [studentsDiff, setStudentsDiff] = useState(0);
  const [mentorsDiff, setMentorsDiff] = useState(0);
  const [investorsDiff, setInvestorsDiff] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetch(`${backend}/api/students/count`);
        const studentsData = await studentsResponse.json();
        setStudentsCount(studentsData.count);
        setStudentsDiff(studentsData.diff);

        const mentorsResponse = await fetch(`${backend}/api/mentors/count`);
        const mentorsData = await mentorsResponse.json();
        setMentorsCount(mentorsData.count);
        setMentorsDiff(0); // Replace with actual calculation if needed

        const investorsResponse = await fetch(`${backend}/api/investors/count`);
        const investorsData = await investorsResponse.json();
        setInvestorsCount(investorsData.count);
        setInvestorsDiff(investorsData.diff);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalUsers = studentsCount + mentorsCount + investorsCount;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Users</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={totalUsers} text={`${totalUsers}`} strokeWidth={5} />
        </div>
        <p className="title">Total users registered</p>
        <p className="amount">{totalUsers}</p>
        <p className="desc">
          Data is updated regularly. The current figures represent the latest counts.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Students</div>
            <div className={`itemResult ${studentsDiff > 0 ? 'positive' : 'negative'}`}>
              {studentsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              <div className="resultAmount">{studentsCount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mentors</div>
            <div className={`itemResult ${mentorsDiff > 0 ? 'positive' : 'negative'}`}>
              {mentorsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              <div className="resultAmount">{mentorsCount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Investors</div>
            <div className={`itemResult ${investorsDiff > 0 ? 'positive' : 'negative'}`}>
              {investorsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              <div className="resultAmount">{investorsCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

