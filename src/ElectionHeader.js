
import React, { Component } from "react"
import { CSSTransitionGroup } from 'react-transition-group'
import './ElectionHeader.css';
import { Octicon, Octicons } from "octicons-react"

class ElectionHeader extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        const selectedState = this.props.selectedState;
        const selectedStateName = this.props.selectedStateName;
        const handleWinnerSelect = this.props.handleWinnerSelect;
        const GetCardStyle = this.GetCardStyle;

        return (
            <div className="row">
                <h1 className="display-4 font-weight-normal col-12 text-center"> 2018 Senate Election - {this.props.selectedStateName}</h1>
                <CSSTransitionGroup className="d-flex justify-content-around col-12" transitionName="example" transitionEnterTimeout={500} transitionLeave={false}>
                {selectedState && selectedState.candidates && selectedState.candidates.map((candidate) => 
                    <div key={candidate.name} className={GetCardStyle(candidate)} style={{minWidth: "250px"}}>
                        <div className="Card-header border-0">
                            <img src={this.GetCandidateImg(candidate)} style={{width: "100px", height: "125px"}} alt="Candidate"/>
                        </div>
                        <div className="card-block px-2">
                            <h5 className="card-title">{candidate.name}</h5>
                            <p className="card-text">{candidate.party}</p>
                            {selectedState.projectedWinner && selectedState.projectedWinner.name === candidate.name ?  
                                <button disabled class="btn btn-success" style={{width: "125px"}}><Octicon icon={Octicons.check}/> Selected</button> :
                                <button onClick={() => handleWinnerSelect(candidate, selectedStateName)} className="btn btn-primary" style={{width: "125px"}}>Select Winner</button>
                            }
                        </div>
                    </div>)}
                    </CSSTransitionGroup>
            </div>
        );
    }

    GetCandidateImg(candidate){
        return "img/candidates/" + candidate.name.replace(/\s+/g, '') + ".jpg";
    }

    GetCardStyle(candidate){
        const baseStyle = "card flex-row flex-wrap";
        return baseStyle + " card-" + candidate.party;
    }
}

export default ElectionHeader