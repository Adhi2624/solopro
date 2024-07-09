


// import React, { useEffect, useState } from 'react';
// import './featured.scss';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

// const backend = process.env.REACT_APP_BACKEND;

// const Featured = () => {
//   const [studentsCount, setStudentsCount] = useState(0);
//   const [mentorsCount, setMentorsCount] = useState(0);
//   const [investorsCount, setInvestorsCount] = useState(0);
//   const [studentsDiff, setStudentsDiff] = useState(0);
//   const [mentorsDiff, setMentorsDiff] = useState(0);
//   const [investorsDiff, setInvestorsDiff] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentsResponse = await fetch(`${backend}/api/students/count`);
//         const studentsData = await studentsResponse.json();
//         setStudentsCount(studentsData.count);
//         setStudentsDiff(studentsData.diff);

//         const mentorsResponse = await fetch(`${backend}/api/mentors/count`);
//         const mentorsData = await mentorsResponse.json();
//         setMentorsCount(mentorsData.count);
//         setMentorsDiff(0); // Replace with actual calculation if needed

//         const investorsResponse = await fetch(`${backend}/api/investors/count`);
//         const investorsData = await investorsResponse.json();
//         setInvestorsCount(investorsData.count);
//         setInvestorsDiff(investorsData.diff);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalUsers = studentsCount + mentorsCount + investorsCount;

//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Total Users</h1>
//         <MoreVertIcon fontSize="small" />
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//           <CircularProgressbar value={totalUsers} text={`${totalUsers}`} strokeWidth={5} />
//         </div>
//         <p className="title">Total users registered</p>
//         <p className="amount">{totalUsers}</p>
//         <p className="desc">
//           Data is updated regularly. The current figures represent the latest counts.
//         </p>
//         <div className="summary">
//           <div className="item">
//             <div className="itemTitle">Students</div>
//             <div className={`itemResult ${studentsDiff > 0 ? 'positive' : 'negative'}`}>
//               {studentsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
//               <div className="resultAmount">{studentsCount}</div>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Mentors</div>
//             <div className={`itemResult ${mentorsDiff > 0 ? 'positive' : 'negative'}`}>
//               {mentorsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
//               <div className="resultAmount">{mentorsCount}</div>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Investors</div>
//             <div className={`itemResult ${investorsDiff > 0 ? 'positive' : 'negative'}`}>
//               {investorsDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
//               <div className="resultAmount">{investorsCount}</div>
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
  const [entrepreneursCount, setEntrepreneursCount] = useState(0);
  const [studentsDiff, setStudentsDiff] = useState(0);
  const [mentorsDiff, setMentorsDiff] = useState(0);
  const [investorsDiff, setInvestorsDiff] = useState(0);
  const [entrepreneursDiff, setEntrepreneursDiff] = useState(0);

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
        setMentorsDiff(mentorsData.diff);

        const investorsResponse = await fetch(`${backend}/api/investors/count`);
        const investorsData = await investorsResponse.json();
        setInvestorsCount(investorsData.count);
        setInvestorsDiff(investorsData.diff);

        const entrepreneursResponse = await fetch(`${backend}/api/entrepreneurs/count`);
        const entrepreneursData = await entrepreneursResponse.json();
        setEntrepreneursCount(entrepreneursData.count);
        setEntrepreneursDiff(entrepreneursData.diff);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalUsers = studentsCount + mentorsCount + investorsCount + entrepreneursCount;

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
          <div className="item">
            <div className="itemTitle">Entrepreneurs</div>
            <div className={`itemResult ${entrepreneursDiff > 0 ? 'positive' : 'negative'}`}>
              {entrepreneursDiff > 0 ? <KeyboardArrowUpOutlinedIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              <div className="resultAmount">{entrepreneursCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
