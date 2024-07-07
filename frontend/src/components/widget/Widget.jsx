
import React, { useEffect, useState } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
const backend=process.env.REACT_APP_BACKEND;
const Widget = ({ type }) => {
  const [count, setCount] = useState(0);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case 'students':
            response = await fetch(`${backend}/api/students/count`);
            console.log(response);
            response = await response.json();
            setCount(response.count);
            setDiff(response.diff);
            break;
          case 'mentors':
            response = await fetch(`${backend}/api/mentors/count`);
            response = await response.json();
            setCount(response.count);
            setDiff(0); // Replace with actual calculation if needed
            break;
          case 'investors':
            response = await fetch(`${backend}/api/investors/count`);
            response = await response.json();
            setCount(response.count);
            setDiff(response.diff);
            break;
          default:
            console.error('Invalid type');
            return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type]);

  const data = {
    students: {
      title: 'STUDENTS',
      isMoney: false,
      link: 'View all students',
      icon: (
        <PersonOutlinedIcon
          className="icon"
          style={{ color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2)' }}
        />
      ),
    },
    mentors: {
      title: 'MENTORS',
      isMoney: false,
      link: 'View all mentors',
      icon: (
        <PersonOutlinedIcon
          className="icon"
          style={{ color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2)' }}
        />
      ),
    },
    investors: {
      title: 'INVESTORS',
      isMoney: false,
      link: 'View all investors',
      icon: (
        <PersonOutlinedIcon
          className="icon"
          style={{ color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2)' }}
        />
      ),
    },
  }[type];

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && '$'} {count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
