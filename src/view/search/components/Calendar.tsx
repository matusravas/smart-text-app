import DateFnsUtils from "@date-io/date-fns";
import { Done } from "@material-ui/icons";
import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import enLocale from "date-fns/locale/en-US";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Date} from "../../../model/search/types";

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

interface CalendarProps {
  dateRange?: Date
  lastTimestamp?: number,
  // value?: any
  onDateChanged: (date: Date) => void
}


export const Calendar = ({dateRange, lastTimestamp, ...props}: CalendarProps) => {
  // const [interval, setInterval] = useState({min: date.from, max: lastTimestamp})

  // console.log(interval)
  const shouldDisableDate = (date: any) => lastTimestamp && date > lastTimestamp ? false: true;

  const handleDateFromChanged = (from: any) => {
    props.onDateChanged({ ...dateRange, from: from})
  }
  const handleDateToChanged = (to: any) => {
    props.onDateChanged({ ...dateRange, to: to })
  }

  return (
    // <CalendarWrapper>
    <>
      <DatePicker {...props}
        // minDate={interval.min}
        maxDate={lastTimestamp}
        shouldDisableDate={shouldDisableDate}
        label="From"
        value={dateRange?.from}
        onChange={handleDateFromChanged}
      />
      <DatePicker {...props}
        // minDate={interval.min}
        maxDate={lastTimestamp}
        shouldDisableDate={shouldDisableDate}
        label="To"
        value={dateRange?.to}
        onChange={handleDateToChanged}
      />
      </>
    // </CalendarWrapper>
  )
}

export const DatePicker = (props: DatePickerProps) => (
  <div style={{ position: 'relative', maxWidth: '165px' }}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale} >
      <MUIDatePicker
        {...props}
        // format="dd.MM. yyyy"
        format="dd/MM/yyyy"
        style={{ minWidth: '100px' }}
        onChange={(date: MaterialUiPickersDate) => {
          // const unixDate = moment(date).valueOf()
          // props.onChange(unixDate);
        }}
        // value={props.value ? props.value : undefined}
        cancelLabel={'cancel'}
        okLabel={'ok'}
        clearLabel={'clear'}
      />
    </MuiPickersUtilsProvider>
  </div>
)
