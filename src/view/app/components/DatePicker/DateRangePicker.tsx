import { IconButton, Tooltip } from "@material-ui/core"
import { ArrowRightAlt, CalendarTodayRounded, Restore } from "@material-ui/icons"
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
  // onChange: (props: { dateRange: DateRange }) => void
  onChange: (dateRange: DateRangeCustom) => void
  // title: string
  selectedDateRange?: DateRangeCustom
  openOnClick?: boolean
  disabled?: boolean
  id?: string
  onError?: any
  maxRange?: number
} & Partial<DayPickerRangeProps>

export type DateRangeFocusedInput = "from" | "to" | "none"


export function DateRangePicker(props: DateRangePickerProps) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>("from")
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    if (props.selectedDateRange) {
      return convertToDateRange(props.selectedDateRange)
    }
    return {
      from: new Date(),
      to: new Date(),
    }
  })

  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.selectedDateRange) return
    setDateRange(convertToDateRange(props.selectedDateRange))
  }, [props.selectedDateRange])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.calendar') && isOpen) {
      setIsOpen(false);
    }
  };

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
            newDateRange.to = isTooBig ? selectedDay : dateRange.to
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
            newDateRange.from = isTooBig ? selectedDay : dateRange.from
            newDateRange.to = selectedDay
            newFocusedInput = "none"
          }
          break
        case "none":
          const isTooBig = isRangeTooBig(selectedDay, "none", range)
          isTooBig &&
            props.onError &&
            props.onError(`Max allowed date range is ${props.maxRange} days`)
          if (isTooBig) newDateRange = { from: selectedDay, to: selectedDay }
          else newDateRange = range
          break
      }
      setDateRange(newDateRange)
      setFocusedInput(newFocusedInput)
      // props.onChange({ id: props.id, dateRange: newDateRange })
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

  const handleConfirm = useCallback(() => {
    if (
      dateRange.from?.valueOf() === props.selectedDateRange?.from?.valueOf() &&
      dateRange.to?.valueOf() === props.selectedDateRange?.to?.valueOf()
    ) return
    props.onChange(convertFromDateRange(dateRange))
    setIsOpen(false)
  }, [dateRange])

  const handleReset = useCallback(() => {
    setDateRange({ from: undefined, to: undefined })
  }, [dateRange])


  function convertToDateRange(customDateRange: DateRangeCustom) {
    return {
      from: customDateRange.from ? moment(customDateRange.from * 1000).toDate() : undefined,
      to: customDateRange.to ? moment(customDateRange.to * 1000).toDate() : undefined
    }
  }

  function convertFromDateRange(dateRange: DateRange) {
    return {
      from: dateRange.from ? moment(dateRange.from).unix() : null,
      to: dateRange.to ? moment(dateRange.to).unix() : null,
    }
  }

  return (
    <>
      <div ref={anchorRef}>
        <IconButton onClick={() => setIsOpen(true)}>
          <Tooltip title="Calendar" placement="top">
            <CalendarTodayRounded style={{ color: '#303030' }} />
          </Tooltip>
        </IconButton>
      </div>
      {isOpen &&
        <DateRangePickerWrapper className="calendar" style={{
          position: 'absolute',
          top: anchorRef.current?.getBoundingClientRect().bottom,
          left: anchorRef.current?.getBoundingClientRect().left,
          zIndex: 1,
          maxHeight: '90vh', overflow: 'auto'
        }}>
          <IconButton onClick={handleReset}>
            <Tooltip title="Reset" placement="right">
              <Restore style={{ color: '#dcdcdc' }} />
            </Tooltip>
          </IconButton>
          <DateRangePickerContentWraper>
            <DateRangePickerInputsWrapper>
              <StringInput
                strInProps={{
                  style: { maxWidth: "150px" },
                  inputProps: {
                    style: {
                      textAlign: "center",
                      color: `${focusedInput === "to" ? "gray" : "inherit"}`,
                      fontWeight: `${focusedInput === "to" ? "normal" : "bold"
                        }`,
                    },
                  },
                  value: moment(dateRange.from).format("YYYY-MM-DD"),
                }}
                onInputClick={() => setFocusedInput("from")}
                onInputChange={(value, e) => {
                  const isTooBig = isRangeTooBig(value, "from")
                  if (isTooBig) return
                  const selectedDay = new Date(moment(value).valueOf())
                  const toMillis = dateRange.to?.getTime() || 0
                  const selectedDayMillis = selectedDay.getTime()
                  setDateRange((prev) => {
                    return {
                      from: selectedDay,
                      to: selectedDayMillis > toMillis ? selectedDay : prev.to,
                    }
                  })
                }}
                onChangeDelay={1000}
                onInputError={props.onError}
                validate={(value) => {
                  let message = ""
                  let isValid = true

                  if (!moment(value).isValid()) {
                    isValid = false
                    message = "Wrong date format"
                  }
                  if (
                    isValid &&
                    dateRange.to &&
                    isRangeTooBig(value, "from")
                  ) {
                    isValid = false
                    message = `Max allowed date range is ${props.maxRange} days`
                  }
                  return {
                    message,
                    isValid,
                  }
                }}
              />
              <ArrowRightAlt style={{ margin: "0px 5px" }} />
              <StringInput
                strInProps={{
                  style: { maxWidth: "150px" },
                  value: moment(dateRange.to).format("YYYY-MM-DD"),
                  inputProps: {
                    style: {
                      textAlign: "center",
                      color: `${focusedInput === "from" ? "gray" : "inherit"}`,
                      fontWeight: `${focusedInput === "from" ? "normal" : "bold"
                        }`,
                    },
                  },
                }}
                onInputClick={() => setFocusedInput("to")}
                onInputChange={(value, e) => {
                  const isTooBig = isRangeTooBig(value, "to")
                  if (isTooBig) return
                  const selectedDay = new Date(moment(value).valueOf())
                  const fromMillis = dateRange.from?.getTime() || 0
                  const selectedDayMillis = selectedDay.getTime()
                  setDateRange((prev) => {
                    return {
                      from: selectedDayMillis < fromMillis ? selectedDay : prev.from,
                      to: selectedDay,
                    }
                  })
                }}
                onChangeDelay={1000}
                onInputError={props.onError}
                validate={(value) => {
                  let message = ""
                  let isValid = true
                  if (!moment(value).isValid()) {
                    isValid = false
                    message = "Wrong date format"
                  }
                  if (
                    isValid &&
                    dateRange.from &&
                    isRangeTooBig(value, "to")
                  ) {
                    isValid = false
                    message = `Max allowed date range is ${props.maxRange} days`
                  }
                  return {
                    message,
                    isValid,
                  }
                }}
              />
            </DateRangePickerInputsWrapper>
            <DayPicker
              {...props}
              mode="range"
              selected={dateRange}
              disabled={props.disabled === false}
              onSelect={handleDateRangeChange}
              weekStartsOn={1}
              locale={en}
              modifiersClassNames={{
                selected: classes.selectedDates,
              }}
              styles={{
                button: { border: "none" },
                months: {
                  justifyContent: "center",
                },
              }}
            />
            <DateRangePickerConfirmButton onClick={handleConfirm}>
              Confirm
            </DateRangePickerConfirmButton>
          </DateRangePickerContentWraper>
        </DateRangePickerWrapper>}
    </>
  )
}
