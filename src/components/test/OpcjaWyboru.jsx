import React, { PureComponent } from 'react';

class OpcjaWyboru extends PureComponent {
  state = { 
    pressed: false,
  }
  
  render(){
    const { opcja, obecnieWybranaOpcja, onZaznaczOpcję } = this.props;
    let btnStyle = obecnieWybranaOpcja.id === opcja.id  ? "aktywna btn-indigo" : "btn";
    return ( 
        <button className={ btnStyle + " test__zadania_zadanie_opcja-wyboru m-1 btn btn-sm btn-block text-left"} onClick={ () => onZaznaczOpcję(opcja) }>
          <span className="test__zadania_zadanie_id-pytania">{this.props.opcja.id}</span>{this.props.opcja.tresc}
        </button>
     );
  }
}
 
export default OpcjaWyboru;