//returns the account object that has the matching ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id) 
}

//returns a sorted array of the provided account objects. Alphabetical order by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last.toLowerCase();
    const lastNameB = accountB.name.last.toLowerCase();
    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }
    return 0;
  });
}

//returns a number that represents the number of times the account's Id appears in any book's "borrows" array
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let totalBorrows = 0;
  for (let i in books) {
    const book = books[i];
    for (let j in book.borrows) {
      const borrow = book.borrows[j];
      borrow.id === accountId ? totalBorrows++ : totalBorrows;
    }
  }
  return totalBorrows;
}

module.exports = { getTotalNumberOfBorrows };


//returns an array of book objects, including author information that represents all books currently checked out by the account. 
function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  for (let i in books) {
    const book = books[i];
    const borrows = book.borrows;
    const lastTransaction = borrows[0];
    if (lastTransaction.id === account.id && !lastTransaction.returned) {
      const author = authors.find((author) => author.id === book.authorId);
      book.author = author;
      result.push(book);
    }
  }
  return result;
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
