const questions = {
  'Afghanistan': 'Kabul',
  'Albania': 'Tirana',
  'Algeria': 'Algiers',
  'Andorra': 'Andorra la Vella',
  'Angola': 'Luanda',
  'Antigua and Barbuda': 'Saint John\'s',
  'Argentina': 'Buenos Aires',
  'Armenia': 'Yerevan',
  'Australia': 'Canberra',
  'Austria': 'Vienna',
  'Azerbaijan': 'Baku',
  'The Bahamas': 'Nassau',
  'Bahrain': 'Manama',
  'Bangladesh': 'Dhaka',
  'Barbados': 'Bridgetown',
  'Belarus': 'Minsk',
  'Belgium': 'Brussels',
  'Belize': 'Belmopan',
  'Benin': 'Porto-Novo',
  'Bhutan': 'Thimphu',
  'Bolivia': 'Sucre',
  'Bosnia': 'Sarajevo',
  'Botswana': 'Gaborone',
  'Brazil': 'Brasilia',
  'Brunei': 'Bandar Seri Begawan',
  'Bulgaria': 'Sofia',
  'Burkina Faso': 'Ouagadougou',
  'Burundi': 'Bujumbura',
  'Cambodia': 'Phnom Penh',
  'Cameroon': 'Yaounde',
  'Canada': 'Ottawa',
  'Cape Verde': 'Praia',
  'Central African Republic': 'Bangui',
  'Chad': 'N\'Djamena',
  'Chile': 'Santiago',
  'China': 'Beijing',
  'Colombia': 'Bogota',
  'Comoros': 'Moroni',
  'Republic of the Congo': 'Brazzaville',
  'Democratic Republic of the Congo': 'Kinshasa',
  'Costa Rica': 'San Jose',
  'Cote d\'Ivoire': 'Yamoussoukro',
  'Croatia': 'Zagreb',
  'Cuba': 'Havana',
  'Cyprus': 'Nicosia',
  'Czech Republic': 'Prague',
  'Denmark': 'Copenhagen',
  'Djibouti': 'Djibouti',
  'Dominica': 'Roseau',
  'Dominican Republic': 'Santo Domingo',
  'Timor-Leste': 'Dili',
  'Ecuador': 'Quito',
  'Egypt': 'Cairo',
  'El Salvador': 'San Salvador',
  'Equatorial Guinea': 'Malabo',
  'Eritrea': 'Asmara',
  'Estonia': 'Tallinn',
  'Ethiopia': 'Addis Ababa',
  'Fiji': 'Suva',
  'Finland': 'Helsinki',
  'France': 'Paris',
  'Gabon': 'Libreville',
  'The Gambia': 'Banjul',
  'Georgia': 'Tbilisi',
  'Germany': 'Berlin',
  'Ghana': 'Accra',
  'Greece': 'Athens',
  'Grenada': 'Saint George\'s',
  'Guatemala': 'Guatemala City',
  'Guinea': 'Conakry',
  'Guinea-Bissau': 'Bissau',
  'Guyana': 'Georgetown',
  'Haiti': 'Port-au-Prince',
  'Honduras': 'Tegucigalpa',
  'Hungary': 'Budapest',
  'Iceland': 'Reykjavik',
  'India': 'New Delhi',
  'Indonesia': 'Jakarta',
  'Iran': 'Tehran',
  'Iraq': 'Baghdad',
  'Ireland': 'Dublin',
  'Israel': 'Jerusalem',
  'Italy': 'Rome',
  'Jamaica': 'Kingston',
  'Japan': 'Tokyo',
  'Jordan': 'Amman',
  'Kazakhstan': 'Astana',
  'Kenya': 'Nairobi',
  'Kiribati': 'Tarawa Atoll',
  'North Korea': 'Pyongyang',
  'South Korea': 'Seoul',
  'Kosovo': 'Pristina',
  'Kuwait': 'Kuwait City',
  'Kyrgyzstan': 'Bishkek',
  'Laos': 'Vientiane',
  'Latvia': 'Riga',
  'Lebanon': 'Beirut',
  'Lesotho': 'Maseru',
  'Liberia': 'Monrovia',
  'Libya': 'Tripoli',
  'Liechtenstein': 'Vaduz',
  'Lithuania': 'Vilnius',
  'Luxembourg': 'Luxembourg',
  'Macedonia': 'Skopje',
  'Madagascar': 'Antananarivo',
  'Malawi': 'Lilongwe',
  'Malaysia': 'Kuala Lumpur',
  'Maldives': 'Male',
  'Mali': 'Bamako',
  'Malta': 'Valletta',
  'Marshall Islands': 'Majuro',
  'Mauritania': 'Nouakchott',
  'Mauritius': 'Port Louis',
  'Mexico':' Mexico City',
  'Federated States of Micronesia': 'Palikir',
  'Moldova': 'Chisinau',
  'Monaco': 'Monaco',
  'Mongolia': 'Ulaanbaatar',
  'Montenegro': 'Podgorica',
  'Morocco': 'Rabat',
  'Mozambique': 'Maputo',
  'Myanmar': 'Naypyidaw',
  'Burma': 'Rangoon',
  'Namibia': 'Windhoek',
  'Nauru': 'Yaren',
  'Nepal': 'Kathmandu',
  'Netherlands': 'Amsterdam',
  'New Zealand': 'Wellington',
  'Nicaragua': 'Managua',
  'Niger': 'Niamey',
  'Nigeria': 'Abuja',
  'Norway': 'Oslo',
  'Oman': 'Muscat',
  'Pakistan': 'Islamabad',
  'Palau': 'Melekeok',
  'Panama': 'Panama City',
  'Papua New Guinea': 'Port Moresby',
  'Paraguay': 'Asuncion',
  'Peru': 'Lima',
  'Philippines': 'Manila',
  'Poland': 'Warsaw',
  'Portugal': 'Lisbon',
  'Qatar': 'Doha',
  'Romania': 'Bucharest',
  'Russia': 'Moscow',
  'Rwanda': 'Kigali',
  'Saint Kitts and Nevis': 'Basseterre',
  'Saint Lucia': 'Castries',
  'Saint Vincent and the Grenadines': 'Kingstown',
  'Samoa': 'Apia',
  'San Marino': 'San Marino',
  'Sao Tome and Principe': 'Sao Tome',
  'Saudi Arabia': 'Riyadh',
  'Senegal': 'Dakar',
  'Serbia': 'Belgrade',
  'Seychelles': 'Victoria',
  'Sierra Leone': 'Freetown',
  'Singapore': 'Singapore',
  'Slovakia': 'Bratislava',
  'Slovenia': 'Ljubljana',
  'Solomon Islands': 'Honiara',
  'Somalia': 'Mogadishu',
  'South Africa': 'Cape Town',
  'South Sudan': 'Juba' ,
  'Spain': 'Madrid',
  'Sri Lanka': 'Sri Jayewardenepura Kotte',
  'Sudan': 'Khartoum',
  'Suriname': 'Paramaribo',
  'Swaziland': 'Mbabane',
  'Sweden': 'Stockholm',
  'Switzerland': 'Bern',
  'Syria': 'Damascus',
  'Taiwan': 'Taipei',
  'Tajikistan': 'Dushanbe',
  'Tanzania': 'Dodoma',
  'Thailand': 'Bangkok',
  'Togo': 'Lome',
  'Tonga': 'Nuku\'alofa',
  'Trinidad and Tobago':' Port-of-Spain',
  'Tunisia': 'Tunis',
  'Turkey': 'Ankara',
  'Turkmenistan': 'Ashgabat',
  'Tuvalu': 'Funafuti',
  'Uganda': 'Kampala',
  'Ukraine': 'Kyiv',
  'United Arab Emirates': 'Abu Dhabi',
  'United Kingdom': 'London',
  'United States': 'Washington, D.C.',
  'Uruguay': 'Montevideo',
  'Uzbekistan': 'Tashkent',
  'Vanuatu': 'Port-Vila',
  'Vatican City': 'Vatican City',
  'Venezuela': 'Caracas',
  'Vietnam': 'Hanoi',
  'Yemen': 'Sanaa',
  'Zambia': 'Lusaka',
  'Zimbabwe': 'Harare'
};

const questionData =  Object.entries(questions);

const seedData = questionData.map((q, index) => {
  if(index === questionData.length -1) {
    return {
      question: q[0],
      answer: q[1],
      next: null
    };
  }

  return {
    question: q[1],
    answer: q[0],
    next: index + 1
  };
});

module.exports = seedData.sort();
// module.exports = [
//   {
//     question: 'KABUL',
//     answer: 'AFGHANISTAN',
//     next: 1
//   },
//   {
//     question: 'BRUSSELS',
//     answer: 'BELGIUM',
//     next: 2
//   },
//   {
//     question: 'SUCRE',
//     answer: 'BOLIVIA',
//     next: 3
//   },
//   {
//     question: 'OTTAWA',
//     answer: 'CANADA',
//     next: 4
//   },
//   {
//     question: 'SANTIAGO',
//     answer: 'CHILE',
//     next: 5
//   },
//   {
//     question: 'QUITO',
//     answer: 'ECUADOR',
//     next: 6
//   },
//   {
//     question: 'CAIRO',
//     answer: 'EGYPT',
//     next: 7
//   },
//   {
//     question: 'SUVA',
//     answer: 'FIJI',
//     next: 8
//   },
//   {
//     question: 'HELSINKI',
//     answer: 'FINLAND',
//     next: 9
//   },
//   {
//     question: 'ATHENS',
//     answer: 'GREECE',
//     next: 10
//   },
//   {
//     question: 'GEORGETOWN',
//     answer: 'GUYANA',
//     next: 11
//   },
//   {
//     question: 'BAGHDAD',
//     answer: 'IRAQ',
//     next: 12
//   },
//   {
//     question: 'TOKYO',
//     answer: 'JAPAN',
//     next: 13
//   },
//   {
//     question: 'BEIRUT',
//     answer: 'LEBANON',
//     next: 14
//   },
//   {
//     question: 'VILNIUS',
//     answer: 'LITHUANIA',
//     next: 15
//   },
//   {
//     question: 'MONACO',
//     answer: 'MONACO',
//     next: 16
//   },
//   {
//     question: 'ISLAMABAD',
//     answer: 'PAKISTAN',
//     next: 17
//   },
//   {
//     question: 'MOSCOW',
//     answer: 'RUSSIA	',
//     next: 18
//   },
//   {
//     question: 'RIYADH',
//     answer: 'SAUDI ARABIA',
//     next: 19
//   },
//   {
//     question: 'VICTORIA',
//     answer: 'SEYCHELLES',
//     next: 20
//   },
//   {
//     question: '	LJUBLJANA',
//     answer: 'SLOVENIA',
//     next: 21
//   },
//   {
//     question: 'MADRID',
//     answer: 'SPAIN',
//     next: 23
//   },
//   {
//     question: 'DUSHANBE',
//     answer: 'TAJIKISTAN',
//     next:24
//   },
//   {
//     question: 'WASHINGTON, D.C.',
//     answer: 'UNITED STATES',
//     next: 25
//   },
//   {
//     question: 'ROME',
//     answer: 'ITALY',
//     next: 26
//   },
//   {
//     question: 'SOFIA',
//     answer: 'BULGARIA',
//     next: 27
//   },
//   {
//     question: 'VIENNA',
//     answer: 'AUSTRIA',
//     next: 28
//   },
//   {
//     question: 'ALGIERS',
//     answer: 'ALGERIA',
//     next: 29
//   },
//   {
//     question: 'BUENOS AIRES',
//     answer: 'ARGENTINA',
//     next: null
//   },
// ];