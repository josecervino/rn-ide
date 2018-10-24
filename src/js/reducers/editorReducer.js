import {
  SET_RANGE,
  SET_COORDS,
  SET_ITEM_RANGE,
  SET_INPUT,
} from '../actions/constants';

const initialState = {
  editor: 'Unloaded editor',
  filename: '',
  currentRange: [],
  coords: {},
  editor: "Unloaded editor",
  filenames: [],
  models: {},
  activeModel: {},
  input: [],
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDITOR":
    return {
      ...state,
      editor: action.payload
    };
    case "GET_FILE_NAMES":
    return {
      ...state,
      filenames: [...state.filenames, ...action.payload]
    };
    case "SET_ACTIVE_MODEL":
    console.log('active model set');
    let index =  state.filenames.indexOf(action.payload)
    let activeModel = state.models[index] || {}
    state.editor.setModel(activeModel)
    return {
      ...state,
      activeModel: activeModel
    };
    case SET_RANGE: {
      console.log('range in reducer', action.payload);
      const newInput = {}
      for (let item in action.payload){
        newInput[item] = action.payload[item].input;
      }
      return {
        ...state,
        // currentRange: action.payload,
        currentRange: [...state.currentRange, action.payload],
        input: [...state.input, newInput],
      };
    }

    case SET_COORDS:
    return {
      ...state,
      coords: action.payload,
    };
    case 'ADD_MODELS':
    return {
      ...state,
      models: { ...state.models, ...action.payload },
    };
    case SET_ITEM_RANGE: {
      const newState = { ...state };
      // console.log({newState});
      // console.log('current component', action.currComp);
      newState.currentRange[action.currComp][action.item].range = action.payload;
      return newState;
    }
    case SET_INPUT: {
      // debugger;
      const newState = { ...state };
      // if (action.currComp > 0 && !newState.input[action.currComp]) {
      //   newState.input.push(initialInput);
      // }
      // newState.input[action.currComp][action.item] = action.payload;
      console.log({ newState });
      console.log({ action });
      console.log('component item:', newState.currentRange[action.currComp][action.item].range);
      // debugger;
      newState.currentRange[action.currComp][action.item].input = action.payload;
      // debugger;
      console.log('input:', newState.currentRange[action.currComp][action.item].input);
      const newInput = [...newState.input];
      newInput[action.currComp][action.item] = action.payload
      newState.input = [...newState.input, newInput];

      console.log({newState});
      return newState;
    }

    default:
    return state;
  }
};

export default editorReducer;
