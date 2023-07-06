window.addEventListener('DOMContentLoaded', () => {
    initialRender()

})

function initialRender(){
    fetch('http://acnhapi.com/v1a/songs')
    .then(res => res.json())
    .then(data => {
        const listContainer = document.getElementById('tracklist')

        updatePlayer(data[0])

        data.forEach(e => {
            const trackContainer = document.createElement('div')
            const imgContainer = document.createElement('div')
            const titleContainer = document.createElement('div')
            const img = document.createElement('img')
            const playButton = document.createElement('button')

            trackContainer.className = 'track-container'
            imgContainer.className = 'img-container'
            titleContainer.className = 'title-container'
            playButton.className = 'play-button'
            playButton.id = e.id
            img.className = 'album-art'
            titleContainer.textContent = e.name['name-USen']
            img.src = e.image_uri
            playButton.textContent = 'Play ▶️'

            playButton.addEventListener('click', handlePlayButtonClick)

            imgContainer.appendChild(img)
            trackContainer.append(imgContainer, titleContainer, playButton)
            listContainer.appendChild(trackContainer)
        });
    })

}

function handlePlayButtonClick(e){
    fetch(`http://acnhapi.com/v1a/songs/${e.target.id}`)
    .then(res => res.json())
    .then(data => updatePlayer(data))
}

function updatePlayer(song){
    const playerContainer = document.getElementById('player-div')

    playerContainer.innerHTML = ''

    const fig = document.createElement('figure')
    const figcap = document.createElement('figcaption')
    const audio = document.createElement('audio')
    const albumArt = document.createElement('img')

    playerContainer.className = 'center'
    fig.className = 'center'
    figcap.className = 'center'
    audio.className = 'center'
    albumArt.className = 'center'
    audio.controls = true
    audio.id = 'player'
    audio.src = song['music_uri']
    figcap.textContent = song.name['name-USen']
    albumArt.src = song['image_uri']
        
    fig.append(figcap, audio)
    playerContainer.append(albumArt, fig)
}