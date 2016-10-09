import React from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';

import SampleFish from '../sample-fishes';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.sampleFish = this.sampleFish.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  sampleFish() {
    this.setState({
      fishes: SampleFish
    });
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
        </div>
        <Order />
        <Inventory addFish={this.addFish} sampleFish={this.sampleFish} />
      </div>
    )
  }
}

export default App;
