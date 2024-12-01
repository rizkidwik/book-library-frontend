import axios from "axios"

const handleError = (error: any): Error => {
    if(axios.isAxiosError(error)){
        return new Error(`API Error: ${error?.response?.status} -  ${error?.response?.data.message || 'Unexpected Error'}`)
    } else if (error.request){
        return new Error('No response received from server')
    } else {
        return new Error('Error setting up the request')
    }
}

export default handleError;