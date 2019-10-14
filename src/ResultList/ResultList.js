import React from 'react';
import Book from '../Book/Book';

export default function ResultList( props ) {
    
    const { bookResults } = props;
    const listOfBooks = bookResults.items
                        .map(( book, index ) => <Book 
                                                    book={ book } 
                                                    key={ index } />);           
    return (
        <>
        <section className="booklist_container">
            <ul>
                { listOfBooks }
            </ul>
        </section>    
        </>
    );
}