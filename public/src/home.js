//returns a number that represents the number of book objects inside the array
function getTotalBooksCount(books) {
  return books.length
}

//returns a number that represents the number of account objects inside the array
function getTotalAccountsCount(accounts) {
  return accounts.length
}

//returns a number that represents the number of books that are currently checked out of the library
function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i in books) {
    if (!books[i].borrows[0].returned) {
      count++;
    }
  }
  return count;
}

//return an array containing five objects or fewer that represents the most common occuring genres ordered from most to lease common
function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  
  const sortedGenres = Object.entries(genreCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  
  return sortedGenres;
}

//return an array containing fice objects or fewer that represents the most popular books in the library
function getMostPopularBooks(books) {
  const bookBorrows = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  const sortedBooks = bookBorrows.sort((bookA, bookB) => {
    return bookB.count - bookA.count;
  });
  return sortedBooks.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  const authorMap = authors.reduce((map, author) => {
    map[author.id] = `${author.name.first} ${author.name.last}`;
    return map;
  }, {});

  const booksWithAuthor = books.map((book) => {
    return { ...book, author: authorMap[book.authorId] };
  });

  const authorGroups = booksWithAuthor.reduce((groups, book) => {
    if (!groups[book.author]) {
      groups[book.author] = [];
    }
    groups[book.author].push(book);
    return groups;
  }, {});

  const authorCounts = Object.keys(authorGroups).map((author) => {
    const count = authorGroups[author].reduce((acc, book) => {
      return acc + book.borrows.length;
    }, 0);
    return { name: author, count: count };
  });

  const sortedAuthors = authorCounts.sort((a, b) => b.count - a.count);

  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
