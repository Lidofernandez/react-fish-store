import React from 'react';
import AddFishForm from './add_fish_form';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <p>Inventory</p>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.sampleFish}>
          Add Sample Fish
        </button>
      </div>
    )
  }
}

export default Inventory;
