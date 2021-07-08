import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeFilterType = e =>{
    this.setState({
      filters: {
        ...this.state.filters,
        type: e
      }
    })
  }

  findPets = () => {
    let url = "/api/pets"
    let pet = this.state.filters.type
    let petUrl = url + `?type=${pet}` 
   
    console.log("first url", url)
    if(this.state.filters.type !== 'all'){
      url = petUrl
    }

    console.log("second url", url)
    fetch(url)
    .then(res => res.json())
    .then(pets => this.setState({pets}))
  }

  handleAdoptPet = petId => {
    console.log("From App.js handleAdoptedPet", petId)
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId]
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.handleChangeFilterType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.handleAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
