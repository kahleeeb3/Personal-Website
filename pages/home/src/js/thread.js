function test(data) {

    const contentDiv = document.getElementById("content");
    const threadDiv = document.createElement("div");
    threadDiv.classList.add("thread");

    for (const post of data.posts){

        // create post div
        const div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
        <div class="post-header">
            <div class="title-date">
                <a href="${post.link}" class="title">${post.title}</a>
                <p class="date">${post.date}</p>
            </div>
            <div class="image">
                <img src=${post.image} />
            </div>
        </div>
        <div class="abstract">
            <p><b>Description:</b></p>
            <p>${post.description}</p>
        `;
        
        threadDiv.appendChild(div);
    }
    contentDiv.appendChild(threadDiv);
}


loadJSON(`/pages/home/src/json/thread.json`, test);