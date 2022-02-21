import React from 'react';
// just a different way to write the syntax.
/* class MainView extends React.Component {
  ...
}
export MainView; */
export class MainView extends React.Component {
    render() {
        return (
          <div className="main-view">
            <div>Inception</div>
            <div>The Shawshank Redemption</div>
            <div>Gladiator</div>
          </div>
        );
      }

  /* render() {
    return (
        <>
            <div className="main-view">
                <div>Inception</div>
                <div>The Shawshank Redemption</div>
                <div>Gladiator</div>
            </div>
            <button>Test</button>
        </>
    );
  } */
}