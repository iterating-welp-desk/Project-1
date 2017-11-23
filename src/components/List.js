import React from 'react';

const List = ({ title }) => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
      arr.push(<li key={i}>item {i}</li>);
  }
  return (
      <div className="listsOfJobs">
          <h1>{title}</h1>
          <ul>
              {arr}
          </ul>
      </div>
  )
}

export default List;
