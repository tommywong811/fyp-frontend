import PropTypes from 'prop-types';

export const GET_FLOORS = 'GET_FLOORS';
export const GET_FLOORS_SUCCESS = 'GET_FLOORS_SUCCESS';
export const GET_FLOORS_FAILURE = 'GET_FLOORS_FAILURE';

export function getFloorsAction() {
  return {
    type: GET_FLOORS,
  };
}

export function getFloorsSuccessAction(floors) {
  return {
    type: GET_FLOORS_SUCCESS,
    payload: { floors },
  };
}

export function getFloorsFailureAction() {
  return {
    type: GET_FLOORS_FAILURE,
  };
}

const initialState = {
  loading: false,
  failure: false,
  success: false,
  floors: {
    '1': {
      name: '1',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4400,
      mapHeight: 3200,
      ratio: 0.1,
      defaultX: 2228,
      defaultY: 1499,
      defaultLevel: 3,
      mobileDefaultLevel: 3,
      mobileDefaultX: 2228,
      mobileDefaultY: 1499,
    },
    '2': {
      name: '2',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 3476,
      defaultY: 1247,
      mobileDefaultLevel: 3,
      mobileDefaultX: 3476,
      mobileDefaultY: 1247,
    },
    '3': {
      name: '3',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1556,
      defaultY: 849,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1556,
      mobileDefaultY: 849,
    },
    '4': {
      name: '4',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1556,
      defaultY: 849,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1556,
      mobileDefaultY: 849,
    },
    '5': {
      name: '5',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1556,
      defaultY: 849,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1556,
      mobileDefaultY: 849,
    },
    '6': {
      name: '6',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1556,
      defaultY: 849,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1556,
      mobileDefaultY: 849,
    },
    '7': {
      name: '7',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1556,
      defaultY: 849,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1556,
      mobileDefaultY: 849,
    },
    UC1: {
      name: '1',
      buildingId: 'universityCenter',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 847,
      defaultY: 526,
      mobileDefaultLevel: 3,
      mobileDefaultX: 847,
      mobileDefaultY: 526,
    },
    UCG: {
      name: 'G',
      buildingId: 'universityCenter',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 847,
      defaultY: 526,
      mobileDefaultLevel: 3,
      mobileDefaultX: 847,
      mobileDefaultY: 526,
    },
    IASG: {
      name: 'G',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    IAS1: {
      name: '1',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    IAS2: {
      name: '2',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    IAS3: {
      name: '3',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    IAS4: {
      name: '4',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    IAS5: {
      name: '5',
      buildingId: 'ias',
      meterPerPixel: 0.0455,
      mapWidth: 1200,
      mapHeight: 1200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 639,
      defaultY: 575,
      mobileDefaultLevel: 3,
      mobileDefaultX: 639,
      mobileDefaultY: 575,
    },
    NABG: {
      name: 'G',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1332,
      defaultY: 913,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1332,
      mobileDefaultY: 913,
    },
    NAB1: {
      name: '1',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    NAB2: {
      name: '2',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    NAB3: {
      name: '3',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    NAB4: {
      name: '4',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    NAB5: {
      name: '5',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 562,
      defaultY: 437,
      mobileDefaultLevel: 3,
      mobileDefaultX: 562,
      mobileDefaultY: 437,
    },
    NAB6: {
      name: '6',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    NAB7: {
      name: '7',
      buildingId: 'lsk',
      meterPerPixel: 0.0455,
      mapWidth: 2600,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1089,
      defaultY: 537,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1089,
      mobileDefaultY: 537,
    },
    CYTG: {
      name: 'G',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYTUG: {
      name: 'UG',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT1: {
      name: '1',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT2: {
      name: '2',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT3: {
      name: '3',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT4: {
      name: '4',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT5: {
      name: '5',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT6: {
      name: '6',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    CYT7: {
      name: '7',
      buildingId: 'cyt',
      meterPerPixel: 0.0455,
      mapWidth: 2000,
      mapHeight: 1400,
      ratio: 0.15,
      defaultLevel: 3,
      defaultX: 1001,
      defaultY: 593,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1001,
      mobileDefaultY: 593,
    },
    Overall: {
      name: '',
      buildingId: 'campusMap',
      meterPerPixel: 0.0455,
      mapWidth: 2200,
      mapHeight: 1800,
      ratio: 0.1,
      defaultX: 936,
      defaultY: 654,
      defaultLevel: 3,
      mobileDefaultLevel: 3,
      mobileDefaultX: 936,
      mobileDefaultY: 654,
    },
    G: {
      name: 'G',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4800,
      mapHeight: 3400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 2162,
      defaultY: 1263,
      mobileDefaultLevel: 3,
      mobileDefaultX: 2162,
      mobileDefaultY: 1263,
    },
    LG1: {
      name: 'LG1',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 4400,
      mapHeight: 3200,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 2419,
      defaultY: 962,
      mobileDefaultLevel: 3,
      mobileDefaultX: 2419,
      mobileDefaultY: 962,
    },
    LG3: {
      name: 'LG3',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 3400,
      mapHeight: 2600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 2398,
      defaultY: 486,
      mobileDefaultLevel: 3,
      mobileDefaultX: 2398,
      mobileDefaultY: 486,
    },
    LG4: {
      name: 'LG4',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 3200,
      mapHeight: 2400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 2344,
      defaultY: 577,
      mobileDefaultLevel: 3,
      mobileDefaultX: 2344,
      mobileDefaultY: 577,
    },
    LG5: {
      name: 'LG5',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 3200,
      mapHeight: 2400,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1901,
      defaultY: 590,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1901,
      mobileDefaultY: 590,
    },
    LG7: {
      name: 'LG7',
      buildingId: 'academicBuilding',
      meterPerPixel: 0.0455,
      mapWidth: 3200,
      mapHeight: 1600,
      ratio: 0.1,
      defaultLevel: 3,
      defaultX: 1833,
      defaultY: 435,
      mobileDefaultLevel: 3,
      mobileDefaultX: 1833,
      mobileDefaultY: 435,
    },
  },
  buildingIds: ['campusMap', 'universityCenter', 'academicBuilding', 'cyt', 'lsk', 'ias'],
  buildings: {
    campusMap: { name: 'Campus Map', floorIds: ['Overall'] },
    universityCenter: { name: 'University Center', floorIds: ['UC1', 'UCG'] },
    academicBuilding: {
      name: 'Academic Building',
      floorIds: ['7', '6', '5', '4', '3', '2', '1', 'G', 'LG1', 'LG3', 'LG4', 'LG5', 'LG7'],
    },
    cyt: {
      name: 'CYT',
      floorIds: ['CYT7', 'CYT6', 'CYT5', 'CYT4', 'CYT3', 'CYT2', 'CYT1', 'CYTUG', 'CYTG'],
    },
    lsk: {
      name: 'LSK',
      floorIds: ['NAB7', 'NAB6', 'NAB5', 'NAB4', 'NAB3', 'NAB2', 'NAB1', 'NABG'],
    },
    ias: {
      name: 'IAS',
      floorIds: ['IAS5', 'IAS4', 'IAS3', 'IAS2', 'IAS1', 'IASG'],
    },
  },
};

export const floorsPropTypes = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  buildingIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  floors: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      buildingId: PropTypes.string.isRequired,
      meterPerPixel: PropTypes.number.isRequired,
      mapWidth: PropTypes.number.isRequired,
      mapHeight: PropTypes.number.isRequired,
      ratio: PropTypes.number.isRequired,
      defaultX: PropTypes.number.isRequired,
      defaultY: PropTypes.number.isRequired,
      defaultLevel: PropTypes.number.isRequired,
      mobileDefaultX: PropTypes.number.isRequired,
      mobileDefaultY: PropTypes.number.isRequired,
      mobileDefaultLevel: PropTypes.number.isRequired,
    }),
  ).isRequired,
  buildings: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      floorIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
});

const floors = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FLOORS:
      return {
        ...initialState,
        loading: true,
      };
    case GET_FLOORS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        floors: payload.floors,
      };
    case GET_FLOORS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
      };
    default:
      return state;
  }
};

export default floors;
