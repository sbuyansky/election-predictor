
import React, { Component } from "react"

class ElectionHeader extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        const selectedState = this.props.selectedState;

        return (
            <div className="row">
                <h1 className="display-4 font-weight-normal col-12 text-center"> 2018 Senate Election - {this.props.selectedStateName}</h1>
                <div className="d-flex justify-content-around  col-12">
                {selectedState.candidates && selectedState.candidates.map((candidate) => 
                    <div key={candidate.name} className="card flex-row flex-wrap" style={{width: "18rem"}}>
                        <div className="Card-header border-0">
                            <img src={this.GetCandidateImg(candidate)} style={{width: "100px"}} alt="Candidate"/>
                        </div>
                        <div className="card-block px-2">
                            <h5 className="card-title">{candidate.name}</h5>
                            <p className="card-text">{candidate.party}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        );
    }

    GetCandidateImg(candidate){
        return "img/candidates/" + candidate.name.replace(/\s+/g, '') + ".jpg";
    }
}

export default ElectionHeader