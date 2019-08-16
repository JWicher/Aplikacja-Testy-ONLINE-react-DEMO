import React from 'react';
import { connect } from 'react-redux';
import { zmieńWersjęJęzykową } from '../../redux/actions/actionsWersjaJęzykowa';

const Flagi = (props) => {

     const widokMenu = props.stanRedux.reducerStronaGłówna.widoczneMenu && window.innerWidth <= 991 ? "ukryj" : "";

     return ( 
        <div className={`strona-glowna__wersja-jezykowa_pojemnik align-self-end d-flex justify-content-around align-items-center ${widokMenu}`}>
            <div className="strona-glowna__wersja-jezykowa_flaga"
                 style={{backgroundImage: `url("/images/avatary/lang_pl.jpg")`, cursor: "pointer"}}
                 onClick={ () => props.zmieńWersjęJęzykową("pl")}
            ></div>
            <div className="strona-glowna__wersja-jezykowa_flaga"
                 style={{backgroundImage: `url("/images/avatary/lang_en.jpg")`, cursor: "pointer"}}
                 onClick={ () => props.zmieńWersjęJęzykową("en")}
            ></div>
        </div>
     );
}
 

const mapStateToProps = (state) => {
     return { stanRedux: state };
   };
   
const mapDispatchToProps = (dispatch) => {
    return {
      zmieńWersjęJęzykową: język => dispatch( zmieńWersjęJęzykową(język) ),
    }
};

export default connect(
     mapStateToProps,
     mapDispatchToProps
)(Flagi)