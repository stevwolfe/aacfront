import React from 'react';
import { connect } from "react-redux";
import {updatePageNumber} from "../../redux/actions";
import '../../assets/search.css'

const Pagination = ({ cardsPerPage, totalPosts, paginate, updatePageNumber, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number}
            className='page-item active-page'
          >
            <a
              href={`/search#${number}`}
              onClick={() => updatePageNumber(number)} className={number == pageNumber? 'active-page page-link':'page-link'}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  pageNumber: state.pageNumber
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: (number) => {
    dispatch(updatePageNumber(number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
