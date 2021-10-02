// selecting required element
const ul = document.querySelector(".pagination ul");
const search = document.querySelector(".arrow");

let totalPages = 202;
let page = 1;

//calling function with passing parameters and adding inside element which is ul tag
ul.innerHTML = createPagination(totalPages, page);

search.addEventListener('click', function() {
    const search = document.querySelector("#search");
    const value = search.value;
    if (value > totalPages || value < 1) {
        search.value = '';
        return;
    }
    createPagination(totalPages, parseInt(value));
})

function createPagination(totalPages, page) {
    if (page < 1 || page > totalPages) {
        return;
    }
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i></span></li>`;

    if (page > 6) { //if page value is less than 2 then add 1 after the previous button
        liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
        liTag += `<li class="dots"><span>...</span></li>`;
    }

    // how many pages or li show before the current li
    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }
    // how many pages or li show after the current li
    if (page >= 1 && page <= 6) {
        afterPage = afterPage + 6 - page;
        beforePage = 1;
    }

    for (var plength = beforePage; plength <= afterPage; plength++) {
        if (plength > totalPages) { //if plength is greater than totalPage length then continue
            continue;
        }
        if (plength == 0) { //if plength is 0 than add +1 in plength value
            plength = plength + 1;
        }
        if (page == plength) { //if page is equal to plength than assign active string in the active variable
            active = "active";
        } else { //else leave empty to the active variable
            active = "";
        }
        liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
    }

    if (page < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
        if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span><i class="fas fa-angle-right"></i></span></li>`;
    ul.innerHTML = liTag; //add li tag inside ul tag
    return liTag; //reurn the li tag
}