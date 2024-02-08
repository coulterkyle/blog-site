let title = document.getElementById('new-title')
let text = document.getElementById('new-text')

function test() {
}

async function writeBlogpost() {
    let data = {
        "title": `${title.value}`,
        "text": `${text.value}`
    }

    const updateRequest = await fetch(`/api/blogposts`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)

    })

    if (updateRequest.ok) {
        document.location.assign(`/dashboard`);
    }
}



async function deletePost(id) {
    if (id) {
        const deleteRequest = await fetch(`/api/blogposts/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });

        if (deleteRequest.ok) {
            document.location.assign('/dashboard');
        }
    }
}