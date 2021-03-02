 async function upload() {
            const file = document.getElementById('thefile').files[0];

            // Make sure a file is selected
            if (!file) return;
            let ObjectId = "1239890asd098_asdasd"
            // Fetch the signed url
            const key = ObjectId + "_" + file.name;
            const response = await axios.get(`https://quiet-gorge-29042.herokuapp.com/uploader/sign?key=${key}&type=${file.type}`);
            const url = response.data.url;

            try {
                // Attempt the upload
                const options = { headers: { 'Content-Type': file.type } };
                await axios.put(url, file, options);
            } catch (e) {
                alert(`Upload failed: ${e}`);
            }
        }