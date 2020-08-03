import { FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZZES_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/types"

const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state, loading: true
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, loading: false, quizzes: action.quizzes
            };
        case FETCH_QUIZ_SUCCESS:
            return  {
                ...state, loading: false, quiz: action.quiz
            };
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            };
        default:
            return state
    }
}