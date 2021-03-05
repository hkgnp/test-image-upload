let sendForm = async (req, res) => {
  /// Send to collection 'POST DETAILS'
  let postDetails = await axios({
    method: 'post',
    url: 'https://7000-white-grouse-7nsbyiqe.ws-us03.gitpod.io/posts',
    data: {
      title: document.querySelector('#title').value,
      description: document.querySelector('#description').value,
      category: document.querySelector('#category').value,
      location: document.querySelector('#location').value,
    },
  });

  /// Send to S3
  let postObjectId = await postDetails.data;
  const file = document.getElementById('thefile').files[0];
  // Make sure a file is selected
  if (!file) return;
  // Fetch the signed url
  const key = postObjectId + '_' + file.name;
  const response = await axios.get(
    `https://7000-white-grouse-7nsbyiqe.ws-us03.gitpod.io/uploader/sign?key=${key}&type=${file.type}`
  );
  const url = response.data.url;

  try {
    // Attempt the upload
    const options = { headers: { 'Content-Type': file.type } };
    await axios.put(url, file, options);
  } catch (e) {
    alert(`Upload failed: ${e}`);
  }

  // Send S3 URL to collection 'MEDIA
  // - Include ObjectID of post-details
  // data: {media: "https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/" + objectId + '_' + file.name}
  let mediaDetails = await axios({
    method: 'post',
    url: 'https://7000-white-grouse-7nsbyiqe.ws-us03.gitpod.io/media',
    data: {
      postId: postObjectId,
      mediaUrl:
        'https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/' +
        postObjectId +
        '_' +
        file.name,
    },
  });
  alert('Post successful');
};

let getResults = async () => {
  let response = await axios.get(
    'https://7000-white-grouse-7nsbyiqe.ws-us03.gitpod.io/posts'
  );
  console.log(response.data);
  let html;
  for (let i of response.data) {
    html = `
    ${i.description}`;
  }

  document.querySelector('#results').innerHTML += html;
};

getResults();
