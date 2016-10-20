import React from 'react';

import Header from './header';
import Fish from './fish';
import Inventory from './inventory';
import Order from './order';

import SampleFish from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.sampleFish = this.sampleFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState((`${this.props.params.storeId}/fishes`), {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
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

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          params={this.props.params}
          fishes={this.state.fishes}
          order={this.state.order} />
        <Inventory addFish={this.addFish} sampleFish={this.sampleFish} />
      </div>
    )
  }
}

export default App;
