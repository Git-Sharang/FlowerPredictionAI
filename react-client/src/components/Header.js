import React from "react";

function toggleHidden() {
  this.setState({
    isHidden: !this.state.isHidden
  })
}
function Header() {

  return (
    <div>
      <div class="py-5 text-center" className="intro">
        <h1>Prediction App</h1>
      </div>
    </div>
  );
}


export default Header;