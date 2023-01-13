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

import { useContext, useState } from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { IconButton } from "@material-ui/core";
import { CalendarTodayRounded } from "@material-ui/icons";


export function DatePicker(props: DatePickerProps) {
  console.log(props.value)
  const [date, setDate] = useState<MaterialUiPickersDate>(() => {
    if (props.disableFuture && props.value && props.value !== null)
      return new Date(props.value + "").getTime() > new Date().getTime()
        ? new Date()
        : new Date(props.value + "");
    if (props.disablePast && props.value && props.value !== null)
      return new Date(props.value + "").getTime() < new Date().getTime()
        ? new Date()
        : new Date(props.value + "");
    else return null;
  });
  return ( 
    <div style={{position: 'relative', maxWidth: '165px'}}>
      <div style={{display: date === null ? 'block' : 'none' ,position: 'absolute', right: '0px'}} >
        <IconButton 
          size="small"
        >
          <CalendarTodayRounded style={{height: '18px'}} />
        </IconButton>
      </div>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={enLocale}
      >
        <MUIDatePicker
          {...props}
          style={{minWidth: '100px'}}
          onChange={(date: MaterialUiPickersDate) => {
            setDate(date);
            props.onChange(date);
          }}
          value={props.value}
          cancelLabel={'cancel'}
          okLabel={'ok'}
          clearLabel={'clear'}
        />
       
      </MuiPickersUtilsProvider>
    </div>
  );
}
