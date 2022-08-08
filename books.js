let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");
  booksWrapper.classList += ' .books__loading';

  // gotta add to booksWrapper instead of document.body since .book__loading has df and diff font size
  // it'll effect the entire page
  // since getBooks has a promise function, you need to make renderBooks async and await the function you are waiting for
  // which is getBooks
  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove('.books__loading');

  // is a.saleprice exists, then use that. else use original price. so first statement has priority
  if (filter === "LOW_TO_HIGH") {
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  } else if (filter === "HIGH_TO_LOW") {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  // or instead of creating another array by passing in the book itself(ratingHTML[counter])
  // i coulda just created a function and pass in element.rating(ratingHTML(element.rating))
  // creating an array works. however because we are using a promise and setTimeout, the map function will result unefined since 
  // it wont get data on time
  function ratingHTML(rating) {
    let str = '';
    for (let i = 0; i < Math.floor(rating); i++) {
      str += `<i class="fas fa-star"></i>\n`;
    }
    rating % 1 === 0.5
    ? str += `<i class="fas fa-star-half-alt"></i>\n`
    : str += '';
  return str
  }
  // const ratingHTML = books.map((element) => {
  //   let arr = [];
  //   for (let i = 0; i < Math.floor(element.rating); i++) {
  //     arr.push(`<i class="fas fa-star"></i>`);
  //   }
  //   element.rating % 1 === 0.5
  //     ? arr.push(`<i class="fas fa-star-half-alt"></i>\n`)
  //     : arr.push[""];
  //   return arr.join("");
  // });

  // this method same as sale function but prob takes up more memory since its storing an array
  // const sale = books.map((element) => {
  //   let arr = [];
  //   !element.salePrice ? arr.push(`<span>$${element.originalPrice.toFixed(2)}</span>`)
  //   : arr.push(`<span class="book__price--normal">$${element.originalPrice.toFixed(2)}</span> $${element.salePrice.toFixed(2)}`);
  //   return arr;
  // })

  function sale(original, sale) {
    if (!sale) {
      return `<span>$${original.toFixed(2)}</span>`;
    }
    return `<span class="book__price--normal">$${original.toFixed(2)}</span> $${sale.toFixed(2)}`;
  }

  const booksHTML = books
    .map((element) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${element.url}" alt="" />
    </figure>
    <div class="book__title">${element.title}</div>
    <div class="book__ratings">
    ${ratingHTML(element.rating)}
    </div>
    <div class="book__price">
    ${sale(element.originalPrice, element.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  // toFixed makes number into two decimal places. however, cannot toFixed a null or itll get rid of entire array
  // gotta join it with empty string or else commas pop up on the html website.
  //joining creates a one string with all the arrays without commas
  booksWrapper.innerHTML = booksHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

// reason for set timeout is that renderBooks is being called before the DOM element is loaded
// so before the class books is loaded, the js loads so it comes out as null unless you setTimeout
// now it gets ran after everything loads since it gets pushed to bottom of event loop
setTimeout(() => {
  renderBooks(filter);
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000)
  })
}
