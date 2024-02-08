console.log("linked")

async function deletePost(id) {
    if (id) {
        const deleteRequest = await fetch(`/api/blogposts/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });

        if (deleteRequest.ok) {
            // const rePopulate = await fetch('/mymeals', {
            //     method: "GET",
            //     headers: { 'Content-Type': 'application/json' },
            // })
            document.location.assign('/dashboard');
        }
    }
}