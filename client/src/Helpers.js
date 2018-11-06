import * as constants from './constants';

class Helpers {
  getPartyColor = (partyName) => {
    let partyColor = '';

    switch (partyName) {
      case 'Democratic':
        partyColor = '#415695';
        break;
      case 'Republican':
        partyColor = '#bd3d3c';
        break;
      case 'Independent':
        partyColor = '#666666';
        break;
      case 'Libertarian':
        partyColor = '#C8CF00';
        break;
      case 'Green':
        partyColor = '#17C70E';
        break;
      default:
        partyColor = '#555';
    }

    return partyColor;
  }

 getBaseURL = () => {
    var environment = process.env.NODE_ENV || 'development';
    switch(environment){
        case 'development':
            return 'http://localhost:5000/api';
        case 'production':
            return 'http://minecraft.buyansky.com:5000/api'
        default:
            return {};
    }
  }

  getSeatDivision = (numDemSeats) => {
    const diff = (numDemSeats - 217.5) * 2;
  
    if (diff > 0) {
      return `D+${diff}`;
    }
    return `R+${Math.abs(diff)}`;
  };

  getFriendlyElectionName = (electionType) => {
    switch(electionType){
      case constants.ELECTION_TYPE_GOVERNOR:
        return 'Governor';
      case constants.ELECTION_TYPE_HOUSE:
        return 'House';
      case constants.ELECTION_TYPE_SENATE:
        return 'Senator';
      default:
        return '';
    }
  };
}

export default new Helpers();
