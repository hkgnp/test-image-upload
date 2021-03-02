// async function upload(objectId) {
//     const file = document.getElementById('thefile').files[0];

//     // Make sure a file is selected
//     if (!file) return;
//     // Fetch the signed url
//     const key = objectId + "_" + file.name;
//     const response = await axios.get(`https://quiet-gorge-29042.herokuapp.com/uploader/sign?key=${key}&type=${file.type}`);
//     const url = response.data.url;

//     try {
//         // Attempt the upload
//         const options = { headers: { 'Content-Type': file.type } };
//         await axios.put(url, file, options);
//     } catch (e) {
//         alert(`Upload failed: ${e}`);
//     }
// }

let sendForm = async (req, res) => {
    let formResponse = await axios({
        method: 'post',
        url: 'https://7000-yellow-lion-m3odfn59.ws-us03.gitpod.io/posts',
        data: {
            "title": document.querySelector("#title").value,
            "description": document.querySelector("#description").value,
            "category": document.querySelector("#category").value,
            "location": document.querySelector("#location").value
        }
    });

    let objectId = await formResponse.data
    const file = document.getElementById('thefile').files[0];
    // Make sure a file is selected
    if (!file) return;
    // Fetch the signed url
    const key = objectId + "_" + file.name;
    const response = await axios.get(`https://7000-yellow-lion-m3odfn59.ws-us03.gitpod.io/uploader/sign?key=${key}&type=${file.type}`);
    const url = response.data.url;

    try {
        // Attempt the upload
        const options = { headers: { 'Content-Type': file.type } };
        await axios.put(url, file, options);
    } catch (e) {
        alert(`Upload failed: ${e}`);
    }
    alert("Post successful");

}

