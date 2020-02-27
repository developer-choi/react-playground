export enum ColorAction {
    CHANGE = "color/CHANGE"
}

export enum Color {
    RED = "red",
    BLUE= "blue"
}

const initialState = {
    color: Color.BLUE
};

export default function color(state = initialState, action: {type: ColorAction, color: Color}) {

    console.log(state);

    switch(action.type) {
        case ColorAction.CHANGE:
            return {
                color: action.color
            };

            //헐 이거 안하면 어케되는거지 나 근대 action type항상 지정해서보냈을탠데 어디서 그런거지?
            //처음에 기본적으로 store에서 호출하는거같은대...
        default:
            return state;
    }
}
