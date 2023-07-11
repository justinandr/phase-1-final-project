window.addEventListener('DOMContentLoaded', () => {
    updatePage()
    document.getElementById('language').addEventListener('change', updateLanguage)
})


// The updatePage function accepts one parameter for language and is 
// called in two instances during the execution of this program. 
// 1. When the DOMContentLoaded event triggers
// 2. When the user selects a different language from the dropdown
// It fetches the data for all songs as an array then iterates over
// that data to update the DOM with the tracklist 
function updatePage(lang = 'name-USen'){
    fetch('http://acnhapi.com/v1a/songs')
    .then(res => res.json())
    .then(data => {
        const listContainer = document.getElementById('tracklist')
        listContainer.innerHTML = ''

        updatePlayer(data[94], false, lang)

        data.forEach(e => {
            const trackContainer = document.createElement('div')
            const imgContainer = document.createElement('div')
            const titleContainer = document.createElement('div')
            const img = document.createElement('img')
            const playButton = document.createElement('button')

            trackContainer.className = 'track-container'
            trackContainer.id = e.id
            imgContainer.className = 'img-container'
            titleContainer.className = 'title-container'
            playButton.classList.add('play-button')
            playButton.classList.add(lang)
            playButton.id = e.id
            img.className = 'album-art'
            titleContainer.textContent = `${e.id}. ${e.name[lang]}`
            img.src = e.image_uri
            playButton.textContent = 'Play ▶️'

            playButton.addEventListener('click', handlePlayButtonClick)
            

            imgContainer.appendChild(img)
            trackContainer.appendChild(imgContainer)
            trackContainer.appendChild(titleContainer)
            trackContainer.appendChild(playButton)
            listContainer.appendChild(trackContainer)
        });
    })

}

// The handlePlayButtonClick is an event handler for when the play button
// on a track was clicked. The play button's id matches that of it's associate
// song so the correct song's data can be retrieved. That data is then passed 
// to the updatePlayer function along with a true value for the autoplay parameter
// and the current selected language.
function handlePlayButtonClick(e){
    fetch(`http://acnhapi.com/v1a/songs/${e.target.id}`)
    .then(res => res.json())
    .then(data => updatePlayer(data, true, e.target.classList[1]))
}

// The updatePlayer function accepts three parameters: song, autoplay and lang.
// It takes that data and updates the DOM with the album art, title of the song
// an loads the src of the song into the auido element
function updatePlayer(song, autoPlay = false, lang = 'name-USen'){
    const playerContainer = document.getElementById('player-div')
    playerContainer.innerHTML = ''

    const fig = document.createElement('figure')
    const figcap = document.createElement('figcaption')
    const audio = document.createElement('audio')
    const albumArt = document.createElement('img')

    playerContainer.className = 'center'
    audio.autoplay = autoPlay
    audio.controls = true
    audio.id = `${song.id}`
    audio.className = lang
    audio.src = song['music_uri']
    figcap.textContent = song.name[lang]
    albumArt.src = song['image_uri']
    albumArt.className = 'center'
        
    fig.append(figcap, audio)
    playerContainer.append(albumArt, fig)

    audio.addEventListener('ended', playNextTrack)
}

// The updateLanguage function is an event handler for when the language
// selection is changed in the dropdown menu. It takes that value and 
// passes it to the updatePage function to update the tracklist accordingly.
function updateLanguage(e){
    updatePage(e.target.value)
}

// The playNextTrack is an event handler for the 'ended' event added to the
// audio HTML element. When the song ends, this function checks the track
// number agains the the total tracks and plays the next song automatically. 
function playNextTrack(e){
    let trackNumber = e.target.id

    if (trackNumber < 95){
        trackNumber++
    }
    else trackNumber = 1

    fetch(`http://acnhapi.com/v1a/songs/${trackNumber}`)
    .then(res => res.json())
    .then (data => updatePlayer(data, true, e.target.className))
}