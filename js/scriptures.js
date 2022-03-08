const bom = 'https://github.com/rus19023/scriptures-json/blob/master/reference/book-of-mormon-reference.json';

const dc = 'https://github.com/rus19023/scriptures-json/blob/master/reference/doctrine-and-covenants-reference.json';

const pgp = 'https://github.com/rus19023/scriptures-json/blob/master/reference/pearl-of-great-price-reference.json';

const nt = 'https://github.com/rus19023/scriptures-json/blob/master/reference/new-testament-reference.json';

const ot = 'https://github.com/rus19023/scriptures-json/blob/master/reference/old-testament-reference.json';

const peopleList = document.getElementById('peopleList');
const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');

const url = bom;
function callApi(url) {
    fetch(url)
        .then(response => {
            peopleList.innerHTML = '';
            return response.json();
        })
        .then(data => {
            // show results in console
            console.log(data);
        data.results.forEach(person => {
            const li = document.createElement('li');
            li.textContent = person.name;
            peopleList.appendChild(li);
        });
        // Forward button
        nextBtn.addEventListener('click', event => {
            event.preventDefault();
            const nextUrl = data.next;
            if (nextUrl) {
                callApi(nextUrl);
            } else {
                peopleList.innerHTML = '<p>No more pages!</p>';
            }
        });
        // Back button
        previousBtn.addEventListener('click', event => {
            event.preventDefault();
            const prevUrl = data.previous;
            if (prevUrl) {
                callApi(prevUrl);
            } else {
                peopleList.innerHTML = '<p>No previous entries!</p>';
            }
        });
    })
    .catch(err => {
        console.log('Error in catch block:', err);
    });
}
callApi(url);




















/* function getPrev() {
    $.ajax({
        type: "GET",
        url: "../Content/test.txt",
        dataType: "json",
        success: function(data) {
            var content = "";
            $.each(data, function(key, val) {
                content += "<p>" + key + ":" + val + "</p>";
            });
            $('#blogcont').html(content);
 
       }
    });
    return false;
https://stackoverflow.com/questions/22095720/json-data-in-a-next-and-previous-button
} */