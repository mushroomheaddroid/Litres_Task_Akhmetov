import {FETCH_DATA, SET_DATA} from "./types";

const initialState = {
    data: '',
    convertedData: []
}

const convertData = (data) => {
    if (data) {
        let normalizedData = normalizeData(data)
        let convertedData = [];

        if (!normalizedData) {
            return false
        } else {
            normalizedData.graphsArray.forEach((item, index) => {
                let graphItem = {
                    id: item.id + '_' + index,
                    data: []
                }
                if (item.data && Array.isArray(item.data)) {
                    item.data.forEach(ins => {
                        if ((!isNaN(parseInt(ins.value))) && ins.date.length > 5) {
                            graphItem.data.push({y: ins.value, x: ins.date})
                        } else {
                            return false
                        }
                    })
                }
                convertedData.push(graphItem)
            })
        }
        return JSON.stringify(convertedData)
    }
    else {
        return undefined
    }
}

const normalizeData = (data) => {
    let normalized;
    if (typeof(data) === 'string') {
        if (data.includes('graphsArray')) {
            // Если получаем что-то похожее на JSON с данными для графика – пытаемся преобразовывать битые данные в JSON
            try {
                let string = data
                    .replace(/{{/g, '[{')
                    .replace(/}}/g, '}]')
                    .replace(/graphsArray:/g, '"graphsArray":')
                    .replace(/id:/g, '"id":')
                    .replace(/data:/g, '"data":')
                string = '{' + string + '}'
                string = JSON.parse(string);
                normalized = string
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
    } else if (typeof(data) === 'object') {
        if (Array.isArray(data)) {
            return false;
        } else {
            // Если получен объект
            normalized = data;
        }
    }
    return normalized
}

export const dataReducer = (state = initialState, action) => {
    // console.log(convertData(action.payload))
    switch (action.type) {
        case FETCH_DATA:
            return {...state, data: convertData(action.payload)}
        case SET_DATA:
            return {...state, convertedData: [action.payload]}
        default: return state
    }
}