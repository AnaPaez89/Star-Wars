const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: '',
			isLoged: false,
			contacts: [],
			characters: [],
			character: {},
			planets: [],
			planet: {},
			favorites: [],
			alert: {
				text: 'A simple primary alert—check it out!',
				background: 'dark',
				visible: false
			}
		},
		actions: {
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// tratamos el error
					// nuestro back nos devuelve 401
					console.log('Error', response.status, response.statusText);
					return;
				}
				const data = await response.json()
				console.log(data)
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.results))
				setStore({ isLoged: true, user: data.results.email })
			},
			logout: () => {
				setStore({ isLoged: false, user: '' });
				localStorage.removeItem('token')
				localStorage.removeItem('user')
			},
			isLogged: () => {
				const token = localStorage.getItem('token')
				if (token) {
					const userData = JSON.parse(localStorage.getItem('user'));
					console.log(userData)
					setStore({ isLoged: true, user: userData.email})
				}
			},
			accessProtected: async () => {
				const token = localStorage.getItem('token')
				const uri = `${process.env.BACKEND_URL}/api/protected`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					// error
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
			},
			getPosts: async () => {
				const token = localStorage.getItem('token')
				const uri = `${process.env.BACKEND_URL}/api/posts`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					// error
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
			},
			getPost: async (id) => {
				const token = localStorage.getItem('token')
				const uri = `${process.env.BACKEND_URL}/api/posts/${id}`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					// error 40
					if (response.status === 403 ) {
						const data = await response.json()
						setStore({ alert: {
							text: data.message,
							background: 'dark',
							visible: true
						},})
						return
					}
					if (response.status === 404 ) {
						const data = await response.json()
						setStore({ alert: {
							text: data.message,
							background: 'dark',
							visible: true
						},})
						return
					}
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
				const text = data.results.title
				setStore({ alert: {
					text: text,
					background: 'info',
					visible: true
				},})
	},
			//Contact List
			userExists: () => {
				return fetch("https://playground.4geeks.com/contact/agendas/anapaez", {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status === 404) {
							return false;
						}
						return resp.ok;
					})
					.catch(error => {
						console.error("Error:", error);
						return false;
					});
			},

			createUser: () => {
				return fetch("https://playground.4geeks.com/contact/agendas/anapaez", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({})
				})
					.then(resp => {
						if (!resp.ok) {
							if (resp.status === 400) {
								return resp.json().then(errorData => {
									console.error("Error creando el usuario:", errorData.detail);
									return;
								});
							}
							throw new Error(`Error status: ${resp.status}`);
						}
					})
					.catch(error => {
						console.error("Error creando el usuario:", error);
					});
			},

			getContacts: () => {
				const actions = getActions();
				return actions.userExists()
					.then(exists => {
						if (!exists) {
							return actions.createUser();
						}
					})
					.then(() => {
						return fetch("https://playground.4geeks.com/contact/agendas/anapaez/contacts", {
							method: "GET",
							headers: {
								"Content-type": "application/json"
							}
						});
					})
					.then(resp => {
						if (!resp.ok) {
							throw new Error(`Error status: ${resp.status}`);
						}
						return resp.json();
					})
					.then(data => {
						console.log(data);
						setStore({ contacts: data.contacts });
						return getStore().contacts;
					})
					.catch(error => {
						console.error("Error getting contacts:", error);
					});
			},

			createContact: (contact) => {
				return fetch("https://playground.4geeks.com/contact/agendas/anapaez/contacts", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(resp => {
						if (!resp.ok) {
							throw new Error(`Error status: ${resp.status}`);
						}
						return getActions().getContacts();
					})
					.catch(error => {
						console.error("Error creando el contacto:", error);
					});
			},

			deleteContact: (id) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/anapaez/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json"
					}
				})
					.then(resp => {
						if (!resp.ok) {
							throw new Error(`Error status: ${resp.status}`);
						}
						return getActions().getContacts();
					})
					.catch(error => {
						console.error("Error borrando el contacto:", error);
					});
			},

			updateContact: (id, updatedContact) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/anapaez/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(updatedContact)
				})
					.then(resp => {
						if (!resp.ok) {
							throw new Error(`Error status: ${resp.status}`);
						}
						return getActions().getContacts();
					})
					.catch(error => {
						console.error("Error actualizando el contacto:", error);
					});
			},
			//Star Wars 
			getCharacters: async ()=>{
				try {
					const response = await fetch('https://swapi.dev/api/people')
					const data = await response.json()
					console.log(data)
					setStore({
						characters: data.results
					})
				} catch (error) {
					console.log(error)
				}
			},
			getCharacterProfile: async (id)=>{
				try {
					const response = await fetch('https://swapi.dev/api/people/' + id)
					const data = await response.json()
					console.log(data)
					setStore({
						character: data
					})
				} catch (error) {
					console.log(error)
				}
			},
			getPlanets: async ()=>{
				try {
					const response = await fetch('https://swapi.dev/api/planets')
					const data = await response.json()
					console.log(data)
					setStore({
						planets: data.results
					})
				} catch (error) {
					console.log(error)
				}
			},
			getPlanetProfile: async (id)=>{
				try {
					const response = await fetch(`https://swapi.dev/api/planets/${id}`)
					const data = await response.json()
					console.log(data)
					setStore({
						planet: data
					})
				} catch (error) {
					console.log(error)
				}
			},
			getStarships: async () => {
				const url = "https://www.swapi.tech/api/starships"
				const request = {
					method: "GET"
				}

				if (localStorage.getItem("starshipsLocal") === null) {

					const response = await fetch(url,request);
					if (response.ok) {
						const data = await response.json();	
						localStorage.setItem('starshipsLocal', JSON.stringify(data))}
					else { "Error" }
				}
			},
			addFavorite: (favorite) =>{
				const store = getStore()
				setStore({
					favorites: [...store.favorites, favorite]
				})
				console.log(store.favorites)
			},
			deleteFavorite: (favorite) => {
				const store = getStore()
				const newFavorites = store.favorites.filter(fav => fav !== favorite)
				setStore({
					favorites: newFavorites
				})
				console.log(store.favorites)
			}
		}
	};
};

export default getState;