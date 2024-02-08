let comment = document.getElementById('new-comment')

function test(id) {
    console.log(comment.value)
    console.log(id)
}

async function leaveComment(id) {
    console.log('clicked')
    let data = {
        "text": `${comment.value}`,
        "blog_id": `${id}`
    }
    console.log(data)
    if (id) {
        const updateRequest = await fetch(`/api/comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        });

        if (updateRequest.ok) {
            document.location.assign(`/blogposts/${id}`);
        }
    }
}