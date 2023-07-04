window.addEventListener('DOMContentLoaded', () => initialRender())

function initialRender(){
    fetch('http://acnhapi.com/v1/songs')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('tracklist')

        for (const x in data){
            const trackContainer = document.createElement('div')
            const imgContainer = document.createElement('div')
            const titleContainer = document.createElement('div')
            const img = document.createElement('img')
            const playButton = document.createElement('button')

            trackContainer.className = 'track-container'
            imgContainer.className = 'img-container'
            titleContainer.className = 'title-container'
            playButton.className = 'play-button'
            playButton.id = data[x].id
            img.className = 'album-art'
            titleContainer.textContent = data[x].name['name-USen']
            img.src = data[x].image_uri
            playButton.textContent = 'Play ▶️'

            playButton.addEventListener('click', handlePlayButtonClick)

            imgContainer.appendChild(img)
            trackContainer.append(imgContainer, titleContainer, playButton)
            container.appendChild(trackContainer)
        }
    })

}

function handlePlayButtonClick(e){
    console.log(e)
}