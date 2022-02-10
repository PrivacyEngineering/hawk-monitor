import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react"

export const ColInput = (props: { label?: string, mutedText?: string, value?: string, placeholder?: string, isDisabled?: boolean }) => {
  const [value, setValue] = useState(props.value);

  return (
    <FormControl>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input value={value} onChange={e => setValue(e.target.value)} isDisabled={props.isDisabled} />
      {props.mutedText && <FormHelperText>{props.mutedText}</FormHelperText>}
    </FormControl>
  )
}
