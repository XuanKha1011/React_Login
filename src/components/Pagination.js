import React from 'react'

const Pagination = ({totalRows, limit, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows/ limit);i++){
        pageNumbers.push(i);
    }
 
  return (
    <nav className='g-2'>
        <ul className='pagination'>
            {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                    <a className='page-link' onClick={() => pagination(number)} href="##">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination;