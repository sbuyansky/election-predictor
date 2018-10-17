import React, {Component} from "react"
import Helpers from "./Helpers.js"
import { Octicon, Octicons } from "octicons-react"

class ElectionTable extends Component {
    constructor(props) {
        super(props)    
        this.props = props;
    }

    render(){
        this.GetCandidateFormat = this.GetCandidateFormat.bind(this);

        return (
            <table className ="table table-sm table-striped" style={{margin: "0px auto"}}>
                <thead>
                    <tr>
                        <th scope="col" style={{background: "#222", textShadow: "black 1px 1px 3px", color: "white"}}>State</th>
                        <th scope="col" style={{background: Helpers.GetPartyColor("Democratic"), textShadow: "black 1px 1px 3px", color: "white"}}>Democratic</th>
                        <th scope="col" style={{background: Helpers.GetPartyColor("Republican"), textShadow: "black 1px 1px 3px", color: "white"}}>Republican</th>
                        <th scope="col" style={{background: Helpers.GetPartyColor("Independent"), textShadow: "black 1px 1px 3px", color: "white"}}>Other (Party)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.elections).filter(key => key !== "elections").sort().map(stateName => (
                        <tr key={stateName}>
                            <td>{stateName}</td>
                            {this.getCandidateRows(stateName)}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    getCandidateRows(stateName){
        let candidates = [{}, {}, {}];
        const election = this.props.elections[stateName];
        const handleWinnerSelect = this.props.handleWinnerSelect;

        election.candidates.forEach(candidate => {
            if(candidate.party === "Democratic"){
                // California is running 2 democrats, put the other in the other column
                if(candidate.name === "Kevin de León"){
                    candidates[2] = candidate;
                }
                else{
                    candidates[0] = candidate;
                }
            }
            else if(candidate.party === "Republican"){
                candidates[1] = candidate;
            }
            else{
                candidates[2] = candidate;
            }
        });

        return candidates.map((candidate, i) => {
            return election.projectedWinner && candidate.name === election.projectedWinner.name ? 
                <td key={i} style={{background: Helpers.GetPartyColor(candidate.party), textShadow: "black 1px 1px 3px", color: "white"}}><Octicon icon={Octicons.check}/> {this.GetCandidateFormat(candidate, i)}</td>
             : 
                <td key={i} onClick={() => handleWinnerSelect(candidate, stateName)} style={{cursor: "pointer"}}>{this.GetCandidateFormat(candidate, i)}</td>
            });
    }

    GetCandidateFormat(candidate, i){
        if(!candidate || !candidate.name || !candidate.party){
            return "-"
        }
        else if(i !== 2){
            return candidate.name
        }
        else{
            return candidate.name + " (" + candidate.party + ")"
        }
    }


}

export default ElectionTable