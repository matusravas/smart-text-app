import { IconButton, Tooltip } from "@material-ui/core"
import { ArrowRightAlt, Restore } from "@material-ui/icons"
import en from "date-fns/locale/en-US"
import moment from "moment"
import {
  useCallback, useEffect, useRef, useState
} from "react"
import {
  ActiveModifiers,
  DateRange,
  DayPicker,
  DayPickerRangeProps
} from "react-day-picker"
import "react-day-picker/dist/style.css"
import { DateRange as DateRangeCustom } from "../../../../model/search/types"
import StringInput from "./StringInput"
import {
  DateRangePickerConfirmButton, DateRangePickerContentWraper, DateRangePickerInputsWrapper, DateRangePickerWrapper
} from "./styles/DateRangePicker.style"
import { useStyles } from "./styles/MultipleDatePicker.style"


export type DateRangePickerProps = {
  onChange?: (dateRange: DateRangeCustom) => void
  onSubmit: (event: any, dateRange: DateRangeCustom) => void
  displayDateFormat?: string
  selectedDateRange?: DateRangeCustom
  openOnClick?: boolean
  disabled?: boolean
  id?: string
  onError?: any
  maxRange?: number
} & Partial<DayPickerRangeProps>

export type DateRangeFocusedInput = "from" | "to" | "none"


export function DateRangePicker(props: DateRangePickerProps) {
  const fromPlaceholder = 'Date from'
  const toPlaceholder = 'Date to'
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false);
  const [displayDateFormat, setDisplayDateFormat] = useState(() => {
    return props.displayDateFormat ? props.displayDateFormat : 'YYYY-MM-DD'
  })
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>("none")
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    if (props.selectedDateRange) {
      return props.selectedDateRange
    }
    return {
      from: undefined,
      to: undefined,
    }
  })

  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.selectedDateRange) return
    setDateRange(props.selectedDateRange)
  }, [props.selectedDateRange])

  useEffect(() => {
    props.displayDateFormat && setDisplayDateFormat(props.displayDateFormat)
  }, [props.displayDateFormat])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.calendar') && !target.closest('.date') && isOpen) {
      setIsOpen(false);
      setFocusedInput('none')
    }
  };

  function validateStringInput(value: string, datePart: 'from' | 'to') {
    let message = ""
    let isValid = true
    const date = new Date(value)
    // checking if selected date is before unix epoch || isValid
    if (![fromPlaceholder, toPlaceholder].includes(value) && (date < new Date(0) || !moment(date).isValid())) {
      isValid = false
      message = "Wrong date format"
    }
    if (
      isValid &&
      dateRange[datePart] &&
      isRangeTooBig(value, datePart)
    ) {
      isValid = false
      message = `Max allowed date range is ${props.maxRange} days`
    }
    return {
      message,
      isValid,
    }
  }

  const handleDateRangeChange = useCallback(
    (
      range: DateRange | undefined,
      selectedDay: Date,
      _activeModifiers?: ActiveModifiers,
      _e?: React.MouseEvent<Element, MouseEvent>
    ) => {
      if (!selectedDay || !range) return
      if (selectedDay.getFullYear() < 2020) return
      let newDateRange: DateRange = {
        from: undefined,
        to: undefined,
      }
      const toMillis = dateRange.to?.getTime() || 0
      const fromMillis = dateRange.from?.getTime() || 0
      const selectedDayMillis = selectedDay.getTime()
      let newFocusedInput: DateRangeFocusedInput = "none"
      switch (focusedInput) {
        case "from":
          if (selectedDayMillis > toMillis) {
            newDateRange.from = selectedDay
            newDateRange.to = selectedDay
          } else {
            const isTooBig = isRangeTooBig(selectedDay, "from")
            isTooBig &&
              props.onError &&
              props.onError(`Max allowed date range is ${props.maxRange} days`)
            newDateRange.from = selectedDay
            newDateRange.to = isTooBig ? selectedDay : dateRange.to ? dateRange.to : new Date(newDateRange.from)
          }
          newFocusedInput = "to"
          break
        case "to":
          if (selectedDayMillis < fromMillis) {
            newDateRange.from = selectedDay
            newDateRange.to = selectedDay
            newFocusedInput = "to"
          } else {
            const isTooBig = isRangeTooBig(selectedDay, "to")
            isTooBig &&
              props.onError &&
              props.onError(`Max allowed date range is ${props.maxRange} days`)
            newDateRange.to = selectedDay
            newDateRange.from = isTooBig ? selectedDay : dateRange.from ? dateRange.from : new Date(newDateRange.to)
            newFocusedInput = "none"
          }
          newFocusedInput = !dateRange.from ? "from" : "none"
          // newFocusedInput = "from"
          break
        case "none":
          // Todo decide if selected day was greater than max date in current date range if yes shift the "to" to selected
          // if not shift "from" to selected and newFocusedInput = 
          const isTooBig = isRangeTooBig(selectedDay, "none", range)
          isTooBig &&
            props.onError &&
            props.onError(`Max allowed date range is ${props.maxRange} days`)
          if (isTooBig) newDateRange = { from: selectedDay, to: selectedDay }
          else newDateRange = range
          break
      }
      onChange(newDateRange)
      setFocusedInput(newFocusedInput)
    },
    [focusedInput, dateRange]
  )

  function isRangeTooBig(
    value: string | Date,
    type: DateRangeFocusedInput,
    range?: DateRange
  ) {
    if (!props.maxRange) return false
    switch (type) {
      case "from":
        return moment(dateRange.to).subtract(100, "day").isAfter(moment(value))
      case "to":
        return moment(dateRange.from).add(100, "day").isBefore(moment(value))
      case "none":
        return moment(range?.to)
          .subtract(100, "day")
          .isAfter(moment(range?.from))
    }
  }

  function handleConfirm(event: any) {
    if (
      !props.onChange && dateRange.from?.valueOf() === props.selectedDateRange?.from?.valueOf() &&
      dateRange.to?.valueOf() === props.selectedDateRange?.to?.valueOf()
    ) return
    setIsOpen(false)
    setFocusedInput('none')
    props.onSubmit(event, dateRange)
  }

  function handleReset() {
    onChange({ from: undefined, to: undefined })
    setFocusedInput('from')
  }


  function onChange(range: DateRange) {
    const newRange = { ...range, ...(range.to && { to: new Date(range.to.setHours(23, 59)) }) }
    props.onChange
      ? props.onChange(newRange)
      : setDateRange(newRange)

  }
  return (
    <>
      <div ref={anchorRef}>
        <DateRangePickerInputsWrapper>
          <StringInput
            strInProps={{
              className: "date",
              style: { maxWidth: "150px" },
              focused: focusedInput === "from",
              inputProps: {
                style: {
                  textAlign: "center",
                  fontSize: 18,
                  color: `${focusedInput === "from" ? "inherit" : "gray"}`,
                  fontWeight: `${focusedInput === "from" ? "bold" : "normal"
                    }`,
                },
              },
              value: dateRange.from
                ? moment(dateRange.from).format(displayDateFormat)
                : focusedInput === 'from'
                  ? moment().format(displayDateFormat)
                  : fromPlaceholder,
              onBlur: () => { !isOpen && setFocusedInput('none') }
            }}
            onInputClick={() => { setFocusedInput("from"); setIsOpen(true) }}
            onInputChange={(value, e) => {
              const isTooBig = isRangeTooBig(value, "from")
              if (isTooBig) return
              const selectedDay = new Date(moment(value, displayDateFormat).valueOf())
              const toMillis = dateRange.to?.getTime() || 0
              const selectedDayMillis = selectedDay.getTime()
              onChange({
                from: selectedDay,
                to: selectedDayMillis > toMillis ? selectedDay : dateRange.to,
              })
            }}
            onChangeDelay={1000}
            onInputError={props.onError}
            validate={(value) => validateStringInput(value, 'to')}
          />
          <ArrowRightAlt style={{ margin: "0px 5px", color: '#808084' }} />
          <StringInput
            strInProps={{
              className: "date",
              focused: focusedInput === "to",
              style: { maxWidth: "150px" },
              inputProps: {
                style: {
                  fontSize: 18,
                  borderBottomColor: '#palevioletred',
                  textAlign: "center",
                  color: `${focusedInput === "to" ? "inherit" : "gray"}`,
                  fontWeight: `${focusedInput === "to" ? "bold" : "normal"
                    }`,
                }
              },
              value: dateRange.to
                ? moment(dateRange.to).format(displayDateFormat)
                : focusedInput === 'to'
                  ? moment().format(displayDateFormat)
                  : toPlaceholder,
              onBlur: () => { !isOpen && setFocusedInput('none') }
            }}

            onInputClick={() => { setFocusedInput("to"); setIsOpen(true) }}
            onInputChange={(value, e) => {
              const isTooBig = isRangeTooBig(value, "to")
              if (isTooBig) return
              const selectedDay = new Date(moment(value, displayDateFormat).valueOf())
              const fromMillis = dateRange.from?.getTime() || 0
              const selectedDayMillis = selectedDay.getTime()
              onChange({
                from: selectedDayMillis < fromMillis ? selectedDay : dateRange.from,
                to: selectedDay,
              })
            }}
            onChangeDelay={1000}
            onInputError={props.onError}
            validate={(value) => validateStringInput(value, 'to')}
          />
        </DateRangePickerInputsWrapper>
      </div>
      {isOpen 
        ?
          <DateRangePickerWrapper className="calendar" style={{
            position: 'absolute',
            top: anchorRef.current?.getBoundingClientRect().bottom,
            left: anchorRef.current?.getBoundingClientRect().left,
            width: anchorRef.current?.getBoundingClientRect().width,
            zIndex: 1,
            maxHeight: '90vh', overflow: 'auto'
          }}>
            <DateRangePickerContentWraper>
              <IconButton style={{ alignSelf: 'flex-end' }} onClick={handleReset}>
                <Tooltip title="Reset" placement="left">
                  <Restore style={{ color: '#cecece' }} />
                </Tooltip>
              </IconButton>
              <DayPicker
                {...props}
                mode="range"
                style={{ marginTop: 0 }}
                selected={dateRange}
                disabled={[{after: new Date()}]}
                onSelect={handleDateRangeChange}
                weekStartsOn={1}
                today={dateRange.to}
                locale={en}
                modifiersClassNames={{
                  selected: classes.selectedDates,
                }}
                styles={{
                  button_reset: {
                    margin: "2px 0px"
                  },
                  button: { border: "none" },
                  months: {
                    justifyContent: "center",
                  },
                }}
              />
              <DateRangePickerConfirmButton type="button" onClick={handleConfirm}>
                Confirm
              </DateRangePickerConfirmButton>
            </DateRangePickerContentWraper>
          </DateRangePickerWrapper>
        : null
      }
    </>
  )
}
