//api github https://api.github.com/

const profile = document.querySelector('#profile')
const userName = document.querySelector('#userName')
const resultado = document.querySelector('.resultado')
const btnSearch = document.querySelector('#btnSearch')

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

			if (name === undefined) {
				resultado.innerHTML = `
				<div class="card undefined">
					<p class="undefined">${userName.value} não encontrado</p>
				</div>`
			} else {
				const novaLista = document.createElement('resultado')
				novaLista.innerHTML = `
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
