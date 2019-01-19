/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//Global Variables
document.addEventListener('DOMContentLoaded', () => {
  //Declare Global Variables
  const pageContainer = document.querySelector('.page');
  const pageHeader = document.querySelector('.page-header');
  const classList = document.querySelector('.student-list')
  const students = classList.children;

  //Show and hide page items relating to page selected
  const showPage = (list, page) => {
    const upper = page * 10;
    const lower = upper - 10;
     for (let i=0; i < list.length; i++) {
    if (i >= lower && i < upper) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    } 
  }
}


  //Hide all students
  const hideAllStudents = (list) => {
    for (let i = 0; i < list.length; i++) {
      const li = list[i];
      li.style.display = 'none';
    }
  }

  //Create new elements helper function
  const createElement = (element, attr, value) => {
    const elem = document.createElement(element);
    elem[attr] = value;
    return elem;
  }

  //Append new elements helper function
  const appendNewElem = (parent, elementName, property, value) => {
    const elem = createElement(elementName, property, value);
    parent.appendChild(elem);
    return elem;
  }

  //Create and add search form to the page
  const createSearchForm = () => {
    const div = createElement('div', 'classList', 'student-search');
    const input = createElement('input', 'type', 'text');
    input.placeholder = 'Search for students...';
    div.appendChild(input);
    appendNewElem(div, 'button', 'textContent', 'Search');
    pageHeader.appendChild(div);
  }

  //Construct html of pagination link
  const createLink = text => {
    const li = document.createElement('li');
    const a = createElement('a', 'textContent', text);
    a.setAttribute('href', '#');
    li.appendChild(a);
    return li;
  }

  //Remove pagination links
  const removePagination = () => {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pageContainer.removeChild(pagination);
    }
  }

  //Remove no results message
  const removeErrorMsg = () => {
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }

  //Create pagination links
  const createPagination = list => {
    const pages = Math.ceil(list.length / 10);
    removePagination();
    if (pages > 1) {
      const div = createElement('div', 'classList', 'pagination');
      const ul = document.createElement('ul');
      for (let i = 1; i <= pages; i++) {
        const link = createLink(i);
        ul.appendChild(link);
      }
      ul.firstChild.children[0].classList.add('active');
      div.appendChild(ul);
      pageContainer.appendChild(div);
      return div;
    }
  }

  //Add event listener to pagination links
  const appendPageLinks = (list) => {
    const div = createPagination(list);
    div.addEventListener('click', (e) => {
      e.preventDefault();
      const activeLink = e.target;
      if (activeLink.tagName === 'A') {
        const pageNumber = parseInt(activeLink.textContent);
        const links = document.querySelectorAll('.pagination a');
        showPage(list, pageNumber);
        for (let i = 0; i < links.length; i++) {
          if (links[i] == activeLink) {
            links[i].classList.add('active');
          } else {
            links[i].classList.remove('active');
          }
        }
      }
    });
  }

  const filtering = () => {
    const inputValue = document.querySelector('input').value;
    removeErrorMsg();
    const results = [];
    for (let i = 0; i < students.length; i++) {
      const li = students[i];
      const h3 = li.querySelector('h3');
      if (h3.textContent.includes(inputValue)) {
        results.push(li);
      }
    }
    hideAllStudents(students);
    if (results.length == 0) {
      removePagination();
      const errorDiv = createElement('div', 'classList', 'error-message');
      errorDiv.textContent = "There are not matching results to your search.";
      pageContainer.appendChild(errorDiv);
    } else if(results.length < 10) {
      removePagination();
      showPage(results, 1);
    }  else {
      showPage(results, 1);
      appendPageLinks(results);
    }
  }

  //Initialize pagination on page load
  createSearchForm();
  showPage(students, 1);
  appendPageLinks(students);

  //Add event listener for search input
  document.querySelector('input').addEventListener('keyup', function () {
    filtering();
  });
  document.querySelector('.student-search button').addEventListener('click', function () {
    filtering();
  });
});






// Remember to delete the comments that came with this file, and replace them with your own code comments.