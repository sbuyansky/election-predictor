class Helpers {
  getPartyColor(partyName) {
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
}

export default new Helpers();
