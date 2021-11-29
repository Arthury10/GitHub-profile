//api github https://api.github.com/

const profile = document.querySelector('#profile')
const userName = document.querySelector('#userName')
const resultado = document.querySelector('.resultado')
const btnSearch = document.querySelector('#btnSearch')
const btnDelete = document.querySelector('.btn-delete')

btnSearch.addEventListener('click', e => {
	e.preventDefault()
	const user = userName.value
	fetch(`https://api.github.com/users/${user}`)
		.then(r => r.json())
		.then(body => {
			console.log(resultado)
			const {
				name,
				avatar_url,
				bio,
				public_repos,
				followers,
				following
			} = body

			if (name === undefined || name === null) {
				resultado.innerHTML = `
				<span class="btn-delete">X</span>
				<div class="card undefined">
					<p class="undefined">${userName.value} não encontrado</p>
				</div>`

				setTimeout(() => {
					resultado.innerHTML = ''
				}, 1000)
			} else {
				const novaLista = document.createElement('resultado')
				novaLista.innerHTML = `
			<span class="btn-delete">X</span>
				<a href="https://github.com/${user}" target="_blanck" class="card">
            <img src="${avatar_url}" alt="${name}" class="img-avatar">
            <div class="card-body">
						<div class="dados-principal">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${bio}</p>
						</div>		
                <p class="card-text">${public_repos} Repositórios</p>
                <p class="card-text">${followers} Seguidores</p>
                <p class="card-text">Seguindo ${following}</p>
            </div>
        </a>
				`
				resultado.appendChild(novaLista)
			}
		})
})

//btnDelete
if (resultado) {
	resultado.addEventListener('click', e => {
		if (e.target.classList.contains('btn-delete')) {
			e.target.parentElement.remove()
		}
	})
}
