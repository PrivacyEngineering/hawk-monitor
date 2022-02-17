import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react"

export const ColInput = (props: { label?: string, mutedText?: string, value?: string, placeholder?: string, isDisabled?: boolean, onChange?: (e: String) => void }) => {
  const [value, setValue] = useState(props.value);

  const setValueBefore = (e: string) => {
      setValue(e);
      if(props.onChange != null) {
          props.onChange(e);
      }
  }

  return (
    <FormControl>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input value={value} onChange={e => setValueBefore(e.target.value)} isDisabled={props.isDisabled} />
      {props.mutedText && <FormHelperText>{props.mutedText}</FormHelperText>}
    </FormControl>
  )
}
