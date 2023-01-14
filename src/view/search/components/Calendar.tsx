// import DateFnsUtils from "@date-io/date-fns";
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
// import moment from "moment";
// import { Date } from "../../../model/search/types";

// interface CalendarProps {
//     date: Date
// }

// const Calendar = ({ date }: CalendarProps) => {
//     console.log(date)
//     return (
//         <div style={{'display': 'flex', 'flexDirection': 'row'}}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <DatePicker
//                     label="Date from"
//                     value={date.from}
//                     onChange={(newValue) => {
//                         //   setValue(newValue);
//                     }}
//                 />
//                 <DatePicker
//                     label="Date to"
//                     value={date.to}
//                     onChange={(newValue) => {
//                         //   setValue(newValue);
//                     }}
//                 />
//             </MuiPickersUtilsProvider>
//         </div>

//     )
// }

// export default Calendar

import DateFnsUtils from "@date-io/date-fns";
import { IconButton } from "@material-ui/core";
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
import { Date as DateType } from "../../../model/search/types";

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
  date: DateType
  value?: any
  onDateChanged: (unix: DateType) => void
}



export const Calendar = (props: CalendarProps) => {
  const [date, setDate] = useState<DateType>(props.date)
  const [interval, setInterval] = useState(
    {
      min: date.from //moment().subtract(3, 'months').valueOf()
      ,max: date.to //moment().valueOf()
    }
  )
  const recomputeIntervals = () => {

  }

  const shouldDisableDate = (date: any) => date > interval.max! || date < interval.min!;

  const handleDateFromChanged = (from: number) => {
    setDate(prev => ({ ...prev, from: from }))
  }
  const handleDateToChanged = (to: number) => {
    setDate(prev => ({ ...prev, to: to }))
  }

  useEffect(() => {
    setDate(props.date)
  }, [props.date])

  return (
    <CalendarWrapper>
      <DatePicker {...props}
        minDate={interval.min}
        maxDate={interval.max}
        shouldDisableDate={shouldDisableDate}
        value={date.from}
        onChange={handleDateFromChanged}
      />
      <DatePicker {...props}
        minDate={interval.min}
        maxDate={interval.max}
        shouldDisableDate={shouldDisableDate}
        value={date.to}
        onChange={handleDateToChanged}
      />
      <IconButton onClick={(e) => props.onDateChanged(date)}>
        {/* <IconButton> */}
        <Done />
      </IconButton>
    </CalendarWrapper>
  )
}

const DatePicker = (props: DatePickerProps) => {
  return (<div style={{ position: 'relative', maxWidth: '165px' }}>
    {/* <div style={{ display: 'block', position: 'absolute', right: '0px' }} >
        <IconButton
          size="small"
        >
          <CalendarTodayRounded style={{ height: '18px' }} />
        </IconButton>
      </div> */}
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={enLocale}
    >
      <MUIDatePicker
        {...props}
        style={{ minWidth: '100px' }}
        onChange={(date: MaterialUiPickersDate) => {
          const unixDate = moment(date).valueOf()
          // setDate(unixDate);
          props.onChange(unixDate);
        }}
        value={props.value ? props.value : undefined}
        cancelLabel={'cancel'}
        okLabel={'ok'}
        clearLabel={'clear'}
      />
    </MuiPickersUtilsProvider>
  </div>
  )
}
