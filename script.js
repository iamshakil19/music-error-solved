const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const input = elementById("keyword");
  const cleanArtistContainer = elementById("artists");
  const albumContainer = document.getElementById("albums");

  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${input.value}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
    input.value = '';
    cleanArtistContainer.innerHTML = '';
    albumContainer.innerHTML = '';
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const albumContainer = document.getElementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));

  const artistContainer = elementById("artists");
  // artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const albumContainer = document.getElementById("albums");
  data.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
