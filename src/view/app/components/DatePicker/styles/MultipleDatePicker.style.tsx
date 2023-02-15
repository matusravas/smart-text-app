import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    selectedDates: {
        '&:not([disabled])': {
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#1AB5F1'
        },
        '&:hover:not([disabled])': {
            color: 'black',
            fontWeight: 'bold',
            
        }, 
    },
    today: {
        color: 'black',
        fontWeight: 'bold'
    }
}))

