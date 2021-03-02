async function upload() {
    const file = document.getElementById('thefile').files[0];

    // Make sure a file is selected
    if (!file) return;
    // Fetch the signed url
    let objectId = 1234
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
}