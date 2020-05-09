const postsContainer = document.getElementById('posts-container');
const input = document.querySelector('.input');
const btn = document.getElementById('submit-button');
const randomBtn = document.getElementById('random-article');

input.addEventListener('keypress', enterPressed);
btn.addEventListener('click', user);
randomBtn.addEventListener('click', getRandomArticle);


function enterPressed() {
    if (event.key === "Enter") {
        btn.click();
    }
}

function user() {
    if(postsContainer.childNodes[0]){ 
        postsContainer.querySelectorAll('*').forEach(n => n.remove()) 
    }

    let searchQuery = input.value; 
    if(searchQuery == "") { return; }
    else {
        showResults(searchQuery);
        input.value = "";
        return; 
    }   
}

function showResults(searchQuery) {
    var url = "https://en.wikipedia.org/w/api.php"; 
    let userInput = input;
    
    var params = {
        action: "query",
        prop: "extracts",
        exsentences: "3",
        exlimit: "max",
        exintro: "true",
        explaintext: "true",
        generator: "search",
        gsrsearch: "",
        format: "json"
    };
    url = url + "?origin=*";
    
    params.gsrsearch = searchQuery;

    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
    fetchMeUrl(url);
}

function fetchMeUrl(url) {
    fetch(url)
    // get url and then return the data
    .then(function(response){ 
        return response.json();
    })
    .then(function(response) {
        var searchData = response.query.pages;
        var results = Object.keys(searchData); 

        // for each search result create and append info in a div
        results.forEach(function (page) {
            const postEl = document.createElement('div');
            postEl.classList.add('post');
            postEl.innerHTML = `
            <div class="post-info">
                <h2 class="post-title"><code>${searchData[page].title}</code></h2>
                <p class="post-body"><code>${searchData[page].extract}</code</p>
            </div>`;

            postsContainer.appendChild(postEl);
        })
        console.log(searchData);
        console.log(postsContainer.childNodes);

    })
    // throw an error if no response from url
    .catch(function(error){console.log(error);});
}


// Show loader and fetch more posts 
// function showLoading() {
//     loading.classList.add('show');

//     setTimeout(() => {
//         loading.classList.remove('show');

//         setTimeout(() => {
//             page++;
//             showPosts();
//         }, 300)
//     }, 1000);
// }