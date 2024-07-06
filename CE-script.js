const itemsPerPageCourseEncyclopedia = 4;
let currentPageCourseEncyclopedia = 1;

const cardContainerCourseEncyclopedia = document.getElementById("courseEncyclopediaCardContainer");
const paginationCourseEncyclopedia = document.getElementById("paginationCourseEncyclopedia");
const searchInputCourseEncyclopedia = document.getElementById("searchInputCourseEncyclopedia");

async function fetchCourses() {
    const response = await fetch('https://raw.githubusercontent.com/oktaprasetya/Course-directory/main/course-encyclopedia.json');
    const coursesEncyclopedia = await response.json();
    displayPaginationCourseEncyclopedia(Math.ceil(coursesEncyclopedia.length / itemsPerPageCourseEncyclopedia));
    displayCardsCourseEncyclopedia(currentPageCourseEncyclopedia, coursesEncyclopedia);
    return coursesEncyclopedia;
}

function displayCardsCourseEncyclopedia(page, courseList) {
    cardContainerCourseEncyclopedia.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPageCourseEncyclopedia;
    const endIndex = startIndex + itemsPerPageCourseEncyclopedia;
    for (let i = startIndex; i < endIndex && i < courseList.length; i++) {
        const course = courseList[i];
        const card = document.createElement("div");
        card.className = "course-encyclopedia-card";
        const link = document.createElement("a");
        link.href = course.link;
        const image = document.createElement("img");
        image.src = course.image;
        image.alt = course.name;
        link.appendChild(image);
        const name = document.createElement("p");
        name.textContent = course.name;
        link.appendChild(name);
        card.appendChild(link);
        cardContainerCourseEncyclopedia.appendChild(card);
    }
}

function displayPaginationCourseEncyclopedia(totalPages) {
    paginationCourseEncyclopedia.innerHTML = "";
    const maxButtons = 3;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    const startPage = Math.max(1, currentPageCourseEncyclopedia - halfMaxButtons);
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (currentPageCourseEncyclopedia > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => {
            currentPageCourseEncyclopedia--;
            displayPaginationCourseEncyclopedia(totalPages);
            displayCardsCourseEncyclopedia(currentPageCourseEncyclopedia, coursesEncyclopedia);
        });
        paginationCourseEncyclopedia.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-button");

        if (i === currentPageCourseEncyclopedia) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPageCourseEncyclopedia = i;
            displayPaginationCourseEncyclopedia(totalPages);
            displayCardsCourseEncyclopedia(currentPageCourseEncyclopedia, coursesEncyclopedia);
        });

        paginationCourseEncyclopedia.appendChild(button);
    }

    if (currentPageCourseEncyclopedia < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => {
            currentPageCourseEncyclopedia++;
            displayPaginationCourseEncyclopedia(totalPages);
            displayCardsCourseEncyclopedia(currentPageCourseEncyclopedia, coursesEncyclopedia);
        });
        paginationCourseEncyclopedia.appendChild(nextButton);
    }
}

function handleSearchCourseEncyclopedia() {
    fetchCourses().then(coursesEncyclopedia => {
        const searchTerm = searchInputCourseEncyclopedia.value.toLowerCase();
        const filteredCourses = coursesEncyclopedia.filter(course =>
            course.name.toLowerCase().includes(searchTerm)
        );
        currentPageCourseEncyclopedia = 1;
        displayPaginationCourseEncyclopedia(Math.ceil(filteredCourses.length / itemsPerPageCourseEncyclopedia));
        displayCardsCourseEncyclopedia(currentPageCourseEncyclopedia, filteredCourses);
    });
}

searchInputCourseEncyclopedia.addEventListener("input", handleSearchCourseEncyclopedia);

const searchButtonCourseEncyclopedia = document.getElementById("searchButtonCourseEncyclopedia");
searchButtonCourseEncyclopedia.addEventListener("click", handleSearchCourseEncyclopedia);

fetchCourses();
