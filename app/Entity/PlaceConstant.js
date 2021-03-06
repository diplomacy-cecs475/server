const placeTypeEnum = {
  TERRITORY: 1,
  WATER: 2,
};

const placeList = [
  {key: 'Boh', country: 'Austria', fullName: 'Bohemia', type: placeTypeEnum.TERRITORY},
  {key: 'Bud', country: 'Austria', fullName: 'Budapest', type: placeTypeEnum.TERRITORY},
  {key: 'Gal', country: 'Austria', fullName: 'Galicia', type: placeTypeEnum.TERRITORY},
  {key: 'Tri', country: 'Austria', fullName: 'Trieste', type: placeTypeEnum.TERRITORY},
  {key: 'Tyr', country: 'Austria', fullName: 'Tyrolia', type: placeTypeEnum.TERRITORY},
  {key: 'Vie', country: 'Austria', fullName: 'Vienna', type: placeTypeEnum.TERRITORY},

  {key: 'Cly', country: 'England', fullName: 'Clyde', type: placeTypeEnum.TERRITORY},
  {key: 'Edi', country: 'England', fullName: 'Edinburgh', type: placeTypeEnum.TERRITORY},
  {key: 'Lvp', country: 'England', fullName: 'Liverpool', type: placeTypeEnum.TERRITORY},
  {key: 'Lon', country: 'England', fullName: 'London', type: placeTypeEnum.TERRITORY},
  {key: 'Wal', country: 'England', fullName: 'Wales', type: placeTypeEnum.TERRITORY},
  {key: 'Yor', country: 'England', fullName: 'Yorkshire', type: placeTypeEnum.TERRITORY},

  {key: 'Bre', country: 'France', fullName: 'Bretagne', type: placeTypeEnum.TERRITORY},
  {key: 'Bur', country: 'France', fullName: 'Burgundy', type: placeTypeEnum.TERRITORY},
  {key: 'Gas', country: 'France', fullName: 'Gascony', type: placeTypeEnum.TERRITORY},
  {key: 'Mar', country: 'France', fullName: 'Marseilles', type: placeTypeEnum.TERRITORY},
  {key: 'Par', country: 'France', fullName: 'Paris', type: placeTypeEnum.TERRITORY},
  {key: 'Pic', country: 'France', fullName: 'Picardy', type: placeTypeEnum.TERRITORY},

  {key: 'Ber', country: 'Germany', fullName: 'Berlin', type: placeTypeEnum.TERRITORY},
  {key: 'Kie', country: 'Germany', fullName: 'Kiel', type: placeTypeEnum.TERRITORY},
  {key: 'Mun', country: 'Germany', fullName: 'Munich', type: placeTypeEnum.TERRITORY},
  {key: 'Pre', country: 'Germany', fullName: 'Prussia', type: placeTypeEnum.TERRITORY},
  {key: 'Ruh', country: 'Germany', fullName: 'Ruhr', type: placeTypeEnum.TERRITORY},
  {key: 'Sil', country: 'Germany', fullName: 'Silesia', type: placeTypeEnum.TERRITORY},

  {key: 'Apu', country: 'Italy', fullName: 'Apulia', type: placeTypeEnum.TERRITORY},
  {key: 'Nap', country: 'Italy', fullName: 'Naples', type: placeTypeEnum.TERRITORY},
  {key: 'Pie', country: 'Italy', fullName: 'Piedmont', type: placeTypeEnum.TERRITORY},
  {key: 'Rom', country: 'Italy', fullName: 'Rome', type: placeTypeEnum.TERRITORY},
  {key: 'Tus', country: 'Italy', fullName: 'Tuscany', type: placeTypeEnum.TERRITORY},
  {key: 'Ven', country: 'Italy', fullName: 'Venice', type: placeTypeEnum.TERRITORY},

  {key: 'Fin', country: 'Russia', fullName: 'Finland', type: placeTypeEnum.TERRITORY},
  {key: 'Lvn', country: 'Russia', fullName: 'Livonia', type: placeTypeEnum.TERRITORY},
  {key: 'Mos', country: 'Russia', fullName: 'Moscow', type: placeTypeEnum.TERRITORY},
  {key: 'Sev', country: 'Russia', fullName: 'Sevastopol', type: placeTypeEnum.TERRITORY},
  {key: 'StP', country: 'Russia', fullName: 'St. Petersburg', type: placeTypeEnum.TERRITORY},
  {key: 'Ukr', country: 'Russia', fullName: 'Ukraine', type: placeTypeEnum.TERRITORY},
  {key: 'War', country: 'Russia', fullName: 'Warsaw', type: placeTypeEnum.TERRITORY},

  {key: 'Ank', country: 'Turkey', fullName: 'Ankara', type: placeTypeEnum.TERRITORY},
  {key: 'Arm', country: 'Turkey', fullName: 'Armenia', type: placeTypeEnum.TERRITORY},
  {key: 'Con', country: 'Turkey', fullName: 'Constantinople', type: placeTypeEnum.TERRITORY},
  {key: 'Smy', country: 'Turkey', fullName: 'Smyrna', type: placeTypeEnum.TERRITORY},
  {key: 'Syr', country: 'Turkey', fullName: 'Syria', type: placeTypeEnum.TERRITORY},

  {key: 'Alb', country: 'Albania', fullName: 'Albania', type: placeTypeEnum.TERRITORY},
  {key: 'Bel', country: 'Belgium', fullName: 'Belgium', type: placeTypeEnum.TERRITORY},
  {key: 'Bul', country: 'Bulgaria', fullName: 'Bulgaria', type: placeTypeEnum.TERRITORY},
  {key: 'Den', country: 'Denmark', fullName: 'Denmark', type: placeTypeEnum.TERRITORY},
  {key: 'Gre', country: 'Greece', fullName: 'Greece', type: placeTypeEnum.TERRITORY},
  {key: 'Hol', country: 'Holland', fullName: 'Holland', type: placeTypeEnum.TERRITORY},
  {key: 'Nwy', country: 'Norway', fullName: 'Norway', type: placeTypeEnum.TERRITORY},
  {key: 'NAf', country: 'ƒ', fullName: 'North Africa', type: placeTypeEnum.TERRITORY},
  {key: 'Por', country: 'Portugal', fullName: 'Portugal', type: placeTypeEnum.TERRITORY},
  {key: 'Rum', country: 'Rumania', fullName: 'Rumania', type: placeTypeEnum.TERRITORY},
  {key: 'Ser', country: 'Servia', fullName: 'Servia', type: placeTypeEnum.TERRITORY},
  {key: 'Spa', country: 'Spain', fullName: 'Spain', type: placeTypeEnum.TERRITORY},
  {key: 'Swe', country: 'Sweden', fullName: 'Sweden', type: placeTypeEnum.TERRITORY},
  {key: 'Tun', country: 'Tunis', fullName: 'Tunis', type: placeTypeEnum.TERRITORY},

  {key: 'Adr', fullName: 'Adriatic Sea', type: placeTypeEnum.WATER},
  {key: 'Aeg', fullName: 'Aegean Sea', type: placeTypeEnum.WATER},
  {key: 'Bal', fullName: 'Baltic Sea', type: placeTypeEnum.WATER},
  {key: 'Bar', fullName: 'Barents Sea', type: placeTypeEnum.WATER},
  {key: 'Bla', fullName: 'Black Sea', type: placeTypeEnum.WATER},
  {key: 'Eas', fullName: 'Eastern Mediterranean', type: placeTypeEnum.WATER},
  {key: 'Eng', fullName: 'English Channel', type: placeTypeEnum.WATER},
  {key: 'Bot', fullName: 'Gulf of Bothnia', type: placeTypeEnum.WATER},
  {key: 'GoL', fullName: 'Gulf of Lyon', type: placeTypeEnum.WATER},
  {key: 'Hel', fullName: 'Helgoland Bight', type: placeTypeEnum.WATER},
  {key: 'Ion', fullName: 'Ionian Sea', type: placeTypeEnum.WATER},
  {key: 'Iri', fullName: 'Irish Sea', type: placeTypeEnum.WATER},
  {key: 'Mid', fullName: 'Mid-Atlantic Ocean', type: placeTypeEnum.WATER},
  {key: 'NAt', fullName: 'North Atlantic Ocean', type: placeTypeEnum.WATER},
  {key: 'Nth', fullName: 'North Sea', type: placeTypeEnum.WATER},
  {key: 'Nrg', fullName: 'Norwegian Sea', type: placeTypeEnum.WATER},
  {key: 'Ska', fullName: 'Skagerrak', type: placeTypeEnum.WATER},
  {key: 'Tyn', fullName: 'Tyrrhenian Sea', type: placeTypeEnum.WATER},
  {key: 'Wes', fullName: 'Western Mediterranean', type: placeTypeEnum.WATER},
];

module.exports = {
  placeList: placeList,
  startingPosition: [
    {country: 'Austria', city: [{key: 'Vie', army: true, fleet: false}, {key: 'Bud', army: true, fleet: false}, {key: 'Tri', army: false, fleet: true}]},
    {country: 'England', city: [{key: 'Lon', army: false, fleet: true}, {key: 'Edi', army: false, fleet: true}, {key: 'Lvp', army: true, fleet: false}]},
    {country: 'France', city: [{key: 'Par', army: true, fleet: false}, {key: 'Mar', army: true, fleet: false}, {key: 'Bre', army: false, fleet: true}]},
    {country: 'Germany', city: [{key: 'Ber', army: true, fleet: false}, {key: 'Mun', army: true, fleet: false}, {key: 'Kie', army: false, fleet: true}]},
    {country: 'Italy', city: [{key: 'Rom', army: true, fleet: false}, {key: 'Ven', army: true, fleet: false}, {key: 'Nap', army: false, fleet: true}]},
    {country: 'Russia', city: [{key: 'Mos', army: true, fleet: false}, {key: 'Sev', army: false, fleet: true}, {key: 'War', army: true, fleet: false}, {key: 'StP', army: false, fleet: true}]},
    {country: 'Turkey', city: [{key: 'Ank', army: false, fleet: true}, {key: 'Con', army: true, fleet: false}, {key: 'Smy', army: true, fleet: false}]},
  ]
};
