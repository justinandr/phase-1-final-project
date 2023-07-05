window.addEventListener('DOMContentLoaded', () => initialRender())

function initialRender(){
    fetch('http://acnhapi.com/v1a/songs')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('tracklist')
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
            container.appendChild(trackContainer)
        });
    })

}

function handlePlayButtonClick(e){
    console.log(e)
}