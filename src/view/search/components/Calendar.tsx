import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {
  DatePicker as MUIDatePicker,
  DatePickerProps, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import enLocale from "date-fns/locale/en-US";
import moment from "moment";
import styled from "styled-components";
import { Date as DateD } from "../../../model/search/types";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-around;
  width: 100%; */
  gap: 20px;
  .button {
    size: 50px;
  }
  & .MuiPickersToolbar-toolbar {
    background-color: antiquewhite;
  }
  & .MuiPickersDay-daySelected {
    background-color: antiquewhite;
    
  }
  & .MuiInputBase-input {
    text-align: center;
    /* text-align: left;
    padding-left: 10px; */
  }
  & input {
  }
  .MuiPickersToolbar-toolbar, .button {
    background-color: palegreen;
  }
`

const DatepickerWrapper = styled(MUIDatePicker)(({ theme }) => ({
  '.MuiPaper-root': {
    'background-color': '#eaea87'
  },
  '.MuiPickersToolbar-toolbar': {
    'background-color': 'antiquewhite'
  },
  '& .MuiPickersDay-daySelected': {
    'background-color': 'antiquewhite'
    
  }
}))

interface CalendarProps {
  dateRange: DateD
  lastTimestamp: number | null,
  onChange: (date: DateD) => void
}


export const Calendar = ({ dateRange, lastTimestamp, ...props }: CalendarProps) => {
  const maxDate = lastTimestamp ? lastTimestamp : moment().valueOf()

  const shouldDisableDate = (date: any) => {
    console.log(date)
    return false
    // date > maxDate ? false : true;
  }

  const handleDateFromChanged = (from: number) => {
    props.onChange({ ...dateRange, from: from })
  }
  const handleDateToChanged = (to: number) => {
    props.onChange({ ...dateRange, to: to })
  }

  return (
    <CalendarWrapper>
      <DatePicker {...props}
        maxDate={maxDate}
        // shouldDisableDate={shouldDisableDate}
        label={dateRange.from? 'From': 'Select from date'}
        value={dateRange.from}
        onChange={handleDateFromChanged}
      />
      <DatePicker {...props}
        maxDate={maxDate}
        // shouldDisableDate={shouldDisableDate}
        label='To'
        disableFuture={true}

        value={dateRange.to ? dateRange.to : lastTimestamp}
        onChange={handleDateToChanged}
      />
    </CalendarWrapper>
  )
}


const useStyles = makeStyles({
  customDatePicker: {
    '.MuiPickersToolbar-toolbar': {
      'background-color': 'palegreen'
    }
  },
});

export const DatePicker = (props: DatePickerProps) => {
  const styles = useStyles()
  return (
    <div style={{ position: 'relative', maxWidth: '165px' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale} >
        <DatepickerWrapper
          {...props}
          className={styles.customDatePicker}
          format="dd.MM. yyyy"
          style={{ minWidth: '100px' }}
          onChange={(date: any) => {
            const unixDate = moment(date).valueOf()
            props.onChange(unixDate);
          }}
          cancelLabel={'cancel'}
          okLabel={'ok'}
          clearLabel={'clear'}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}
