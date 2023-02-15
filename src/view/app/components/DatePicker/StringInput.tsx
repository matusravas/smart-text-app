import { IconButton, TextField, TextFieldProps } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
// import palette from "../../theme/palette";
// import PopUp from "../popUps/PopUp";
// import PDSButton from "../buttons/PDSButton";

type StrProps = {
  [K in keyof TextFieldProps]: TextFieldProps[K]
}

type StringInputProps = {
  strInProps: StrProps
  onInputChange?: (value: string, event: React.ChangeEvent<any>, id?: string) => void;
  onInputError?: (value: string) => void;
  onInputClick?: MouseEventHandler<any>;
  onChangeDelay?: number;
  typeOfInput?: "classic" | "popup";
  defaultIcon?: (value: string) => JSX.Element;
  validate?: (value: string) => { message: string, isValid: boolean };
  anchorRef?: React.Ref<HTMLDivElement>;
  validate_onBlur?: boolean;
  forceValidate?: boolean;
  popupClose_Delay?: number;
  id?: string;

};



function StringInput({
  strInProps, anchorRef, defaultIcon, typeOfInput,
  validate, validate_onBlur, forceValidate, onInputError,
  onInputChange, onChangeDelay, onInputClick, popupClose_Delay
}: StringInputProps) {
  const [value, setValue] = useState<string>(() => {
    if (typeof strInProps.value !== 'undefined') return strInProps.value as string
    const defaultValue = strInProps.defaultValue
    delete strInProps.defaultValue
    return defaultValue as string || ''
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [autoFocus, setAutoFocus] = useState<boolean>(() => strInProps.autoFocus ?? false);
  const [forceRender, setForceRender] = useState<boolean>(() => false);
  const [errorObj, setErrorObj] = useState<{ error: boolean, errorMsg: string }>(() => {
    return {
      error: false,
      errorMsg: ''
    }

  })
  const type = useRef<"classic" | "popup">(typeOfInput || "classic");
  const componentDidMount = useRef(false);
  const valueFirstChange = useRef(false);

  useEffect(() => {
    if (componentDidMount.current) valueFirstChange.current = true;
    if (valueFirstChange.current && componentDidMount.current) {
      validatorFn(typeof strInProps.value !== "undefined" ? strInProps.value as string : value)
    }
    typeof strInProps.value !== 'undefined' && setValue(strInProps.value as string)
  }, [strInProps.value]);

  useEffect(() => {
    if (!componentDidMount.current) return;
    setErrorObj(prevObj => {
      return {
        ...prevObj,
        error: strInProps.error || false
      }
    })
  }, [strInProps.error]);

  useEffect(() => {
    if (
      !componentDidMount.current ||
      validate_onBlur === false
    ) return

    validatorFn(typeof strInProps.value !== "undefined" ? strInProps.value as string : value)
    valueFirstChange.current = true;
  }, [forceRender]);

  useEffect(() => {
    if (!componentDidMount.current || !validate) return
    if (!forceValidate) return
    validatorFn(typeof strInProps.value !== "undefined" ? strInProps.value as string : value)
  }, [forceValidate])

  useEffect(() => {
    if (componentDidMount.current) valueFirstChange.current = true;
    if (!componentDidMount.current) return
    validatorFn(value)
  }, [value]);

  const validatorFn = (value: string) => {
    const result = validate && validate(value)
    if (!result) return
    if (!result.isValid) {
      !errorObj.error && onInputError && onInputError(result.message)
    }
    setErrorObj({
      error: !result.isValid,
      errorMsg: result.message
    })
  }

  useEffect(() => {
    componentDidMount.current = true;
  }, []);

  const renderIcon = () => {
    if (typeof value === "string" && value.length > 0 && !strInProps.disabled) {
      return (
        <IconButton
          size="small"
          id={strInProps.id}
          onClick={(e) => {
            setValue("")
            handleInputChange(e, '', strInProps.id)
            e.stopPropagation()
          }}
        >
          <DeleteOutlineOutlined
            style={{ background: 'inherit' }}
            fontSize={"small"}
          />
        </IconButton>
      );
    } else {
      if (defaultIcon) return defaultIcon(value);
      return <></>;
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<any>,
    changedInput: string,
    id?: string,
  ) => {
    if (!valueFirstChange.current) valueFirstChange.current = true;

    if (timer) clearTimeout(timer);
    const timeOut = setTimeout(
      () => {
        if (changedInput === value) return
        const isValid = validate && validate(changedInput).isValid
        if (isValid === false) return
        onInputChange && onInputChange(changedInput, event, id);
      },
      onChangeDelay ? onChangeDelay : 0
    );
    setTimer(timeOut);
  }

  const mainStringInput = (stringValue: string) => {
    return (
      <TextField
        {...strInProps}
        className={"stringFilter"}
        ref={anchorRef}
        autoFocus={autoFocus}
        onBlurCapture={(e) => {
          setForceRender((prev) => !prev);
        }}
        onClick={(e) => {
          setAutoFocus(true);
          onInputClick && onInputClick(e);
        }}
        value={stringValue}
        error={errorObj.error}
        onChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ) => {
          event.persist();
          if (!onInputChange) return;
          setValue(event.target.value);
          if (!valueFirstChange.current) valueFirstChange.current = true;
          handleInputChange(event, event.target.value, strInProps.id)
        }}
        InputProps={{
          // endAdornment: renderIcon(),
          ...strInProps.InputProps
        }}
      />
    );
  };
  return mainStringInput(value)
  // return type.current === "classic" ? (
  //   mainStringInput(value)
  // ) : (
  //   <PopUp
  //     staticComponent={({ open, anchorRef }) => {
  //       // console.log(value)
  //       return (
  //         <StringInput
  //           strInProps={{
  //             ...strInProps,
  //             onClick: open,
  //             error: errorObj.error,
  //             value: value
  //           }}
  //           onInputChange={(newValue, event) => {
  //             setValue(newValue)
  //             if (validate && validate(newValue).isValid) onInputChange && onInputChange(newValue, event, strInProps.id)
  //             if (newValue !== value) onInputChange && onInputChange(newValue, event, strInProps.id)
  //           }}
  //           defaultIcon={defaultIcon}
  //           validate={validate}
  //           anchorRef={anchorRef}
  //           validate_onBlur={validate_onBlur}
  //         />
  //       );
  //     }}
  //     popUpComponent={({ close }) => {
  //       return (
  //         <div
  //           style={{ display: "flex", flexDirection: "column", padding: "5px" }}
  //         >
  //           <div style={{ margin: "5px" }}>{mainStringInput(value)}</div>
  //           <button
  //             title="Okey"
  //             //   backgroundColor={"black"}
  //             color="white"
  //             onClick={close}
  //           />
  //         </div>
  //       );
  //     }}
  //     delayOnMouseLeave={popupClose_Delay ? popupClose_Delay : 500}
  //   />
  // );
}

export default StringInput;