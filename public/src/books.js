//returns the author object that has the matching ID
function findAuthorById(authors, id) {
  return authors.find((account) => account.id === id)
}

//returns the book object that has the matching ID
function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

//return an array with two array inside of it. one contains book objects that represent the books that are currently checked out, and the other contains book objects that represent the books that have been returned 
function partitionBooksByBorrowedStatus(books) {
  const filterByBorrowedStatus = (status) => books.filter((book) => {
    const [recentTransaction] = book.borrows;
    return recentTransaction.returned === status;
  });

  const checkedOutBooks = filterByBorrowedStatus(false);
  const returnedBooks = filterByBorrowedStatus(true);
  return [checkedOutBooks, returnedBooks];
}


//return an array of ten or fewer account objects that represents the accounts given by the Id's in the provided book's borrows array. 
function getBorrowersForBook(book, accounts) {
  const findAccountById = (id) => accounts.find((account) => account.id === id);

  return book.borrows.map((borrow) => {
    const account = findAccountById(borrow.id);
    return {...borrow, ...account};
  }).slice(0, 10);
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
