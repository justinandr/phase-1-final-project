window.addEventListener('DOMContentLoaded', () => {
    updatePage()
    document.getElementById('language').addEventListener('change', updateLanguage)
})

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

function handlePlayButtonClick(e){
    fetch(`http://acnhapi.com/v1a/songs/${e.target.id}`)
    .then(res => res.json())
    .then(data => updatePlayer(data, true, e.target.classList[1]))
}

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

function updateLanguage(e){
    updatePage(e.target.value)
}

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