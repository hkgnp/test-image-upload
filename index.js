document.querySelector('#submit').addEventListener('click', async () => {
  let name = document.querySelector('#name').value;
  let username = document.querySelector('#username').value;
  let payLoad = {
    name: name,
    username: username,
  };

  await axios.post(
    'https://7000-rose-termite-iwx5zqih.ws-us03.gitpod.io/test',
    payLoad
  );
});
