import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import {
  DatePicker as MUIDatePicker,
  DatePickerProps, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import enLocale from "date-fns/locale/en-US";
import moment from "moment";
import styled from "styled-components";
import { Date as DateD } from "../../../model/search/types";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

interface CalendarProps {
  dateRange: DateD
  lastTimestamp: number | null,
  onChange: (date: DateD) => void
}


export const Calendar = ({ dateRange, lastTimestamp, ...props }: CalendarProps) => {
  const maxDate = lastTimestamp ? lastTimestamp : moment().valueOf()

  const handleDateFromChanged = (from: number) => {
    props.onChange({ ...dateRange, from: from })
  }
  const handleDateToChanged = (to: number) => {
    props.onChange({ ...dateRange, to: to })
  }

  return (
    <CalendarWrapper>
      <ThemeProvider theme={defaultMaterialTheme}>
        <DatePicker {...props}
          maxDate={maxDate}
          // shouldDisableDate={shouldDisableDate}
          label={dateRange.from ? 'From' : 'From'}
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
      </ThemeProvider>
    </CalendarWrapper>
  )
}


export const DatePicker = (props: DatePickerProps) => {
  return (
    <div style={{ position: 'relative', maxWidth: '165px' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale} >
        <MUIDatePicker
          {...props}
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
