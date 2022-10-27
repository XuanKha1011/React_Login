// import React from "react";
// import PropTypes from "prop-types";

// const Pagination = (props) => {
//   Pagination.propTypes = {
//     pagination: PropTypes.object.isRequired,
//     onPageChange: PropTypes.func,
//   };

//   Pagination.defaultProps = {
//     onPageChange: null,
//   };
//   const { pagination, onPageChange } = props;
//   const { page, limit, totalRows, skip } = pagination;
//   const totalPages = Math.ceil(totalRows / limit);
//   console.log(totalPages);

//   const handlePageChange = (newPage) => {
//     if (onPageChange) {
//       onPageChange(newPage);
//     }
//   };
//   return (
//     <nav>
//       <ul className="pagination">
//         {page.map((number) => (
//           <li key={number} className="page-item">
//             <a onClick={() => pagination(number)} className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//     // <div>
//     //   <button disabled={page <= 1} onClick={() => handlePageChange(page - 1, skip - 10)}>
//     //     Prev
//     //   </button>
//     //   <button
//     //     disabled={page >= totalPages}
//     //     onClick={() => handlePageChange(page + 1, skip + 10)}
//     //   >
//     //     Next
//     //   </button>
//     // </div>
//   );
// };

// export default Pagination;


import React from 'react'

const Pagination = ({totalRows, limit, pagination}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRows/ limit);i++){
        pageNumbers.push(i);
    }
  
  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                    <a className='page-link' onClick={() => pagination(number)} >
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination;